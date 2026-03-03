import { OrgAlreadyExistisError } from "@/use-cases/errors/org-already-exists-error.js"
import type { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case.js"

export async function createPet(request: FastifyRequest , response: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        about: z.string(),
        age: z.enum(['puppy', 'adult', 'senior']),
        size: z.enum(['small', 'medium', 'large', 'giant']),
        energy: z.enum(['low', 'medium', 'high']),
        level_independence: z.enum(['low', 'medium', 'high']),
        environment: z.enum(['small', 'medium', 'large', 'giant']),
        photo: z.string(),
        org_id: z.string().uuid(),
        adoptionRequirements: z.array(z.string())
    })

    const { name, about, age, size, energy, level_independence, environment, photo, org_id, adoptionRequirements } = registerBodySchema.parse(request.body)

    try {
        const createPetUseCase = makeCreatePetUseCase()

        await createPetUseCase.execute({
            name,
            about,
            age,
            size,
            energy,
            level_independence,
            environment,
            photo,
            org_id,
            adoptionRequirements 
        })
    } catch(err) {
        if(err instanceof OrgAlreadyExistisError) {
            return response.status(409).send({ message: err.message })
        }

        throw err
    }

    return response.status(201).send()

}


