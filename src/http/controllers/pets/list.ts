import type { FastifyRequest, FastifyReply } from "fastify"
import { string, z } from "zod"
import { makeListPetsUseCase } from "@/use-cases/factories/make-list-pets-use-case.js"

export async function listPets(request: FastifyRequest , response: FastifyReply) {
    const listPetsQuerySchema = z.object({
        city: z.string().optional(),
        state: z.string().optional(),
        age: z.enum(['puppy', 'adult', 'senior']).optional(),
        size: z.enum(['small', 'medium', 'large', 'giant']).optional(),
        energy: z.enum(['low', 'medium', 'high']).optional(),
        level_independence: z.enum(['low', 'medium', 'high']).optional(),
    })

    const data = listPetsQuerySchema.parse(request.query)

    const listPetsUseCase = makeListPetsUseCase()

    const { pet } = await listPetsUseCase.execute(data)

    return response.status(200).send({ pet })

}


