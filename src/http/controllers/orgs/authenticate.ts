import { InvalidCredentialsError } from "@/repositories/errors/invalid-credentials-error.js"
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case.js"
import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function authenticate(request: FastifyRequest, response: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateBodySchema.parse(request.body) 

    try {
        const AuthenticateUseCase = makeAuthenticateUseCase()

        const { org } = await AuthenticateUseCase.execute({
            email,
            password
        })

        const token = await response.jwtSign(
            {}, {
            sign: {
                sub: org.id
            }
        })

        return response.status(200).send({ token })


    } catch (err) {
        if(err instanceof InvalidCredentialsError) {
            return response.status(400).send({ message: err.message })
        }

        throw err
    }    
}