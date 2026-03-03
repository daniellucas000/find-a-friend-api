import type { OrgsRepository } from "@/repositories/orgs-repository.js";
import type { PetsRepository } from "@/repositories/pets-repository.js";
import type { Pet } from "@prisma/client";

interface CreatePetUseCaseRequest {
    name: string
    about: string
    age: string
    size: string
    energy: string
    level_independence: string
    environment: string
    photo: string
    adoptionRequirements: string[]
    org_id: string
}

interface CreatePetUseCaseResponse {
    pet: Pet
}

export class CreatePetsUseCase {
    constructor(private petsRepository: PetsRepository, private orgsRepository: OrgsRepository) {}

    async execute({ name, about, age, size, energy, level_independence, environment, photo, adoptionRequirements, org_id }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
        const org = await this.orgsRepository.findById(org_id)

        if(!org) {
            throw new Error('num tem organização')
        }

        const pet = await this.petsRepository.create({
            name,
            about,
            age,
            size,
            energy,
            level_independence,
            environment,
            photo,
            adoptionRequirements: {
                create: adoptionRequirements.map(title => ({ title }))
            },            org: {
                connect: { id: org_id }
            }
        })

        return { pet }
    }
}