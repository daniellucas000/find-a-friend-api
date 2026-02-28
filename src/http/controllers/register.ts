import { OrgAlreadyExistisError } from "@/use-cases/errors/org-already-exists-error.js"
import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case.js"

export async function register(request: FastifyRequest , response: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string().min(6),
        cep: z.string(),
        address: z.string(),
        whatsapp_number: z.string(),
    })

    const { name, email, password, cep, address, whatsapp_number } = registerBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
            name,
            email,
            password,
            cep,
            address,
            whatsapp_number
        })
    } catch(err) {
        if(err instanceof OrgAlreadyExistisError) {
            return response.status(409).send({ message: err.message })
        }

        throw err
    }

    return response.status(201).send()

}
