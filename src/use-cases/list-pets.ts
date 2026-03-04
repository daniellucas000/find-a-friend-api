import type { ListPets } from "@/@types/list-pets.js";
import type { PetsRepository } from "@/repositories/pets-repository.js";
import type { Pet } from "@prisma/client";

interface ListPetsUseCaseResponse {
    pet: Pet[]
}

export class ListPetsUseCase {
    constructor(private petsRepository: PetsRepository) {}

    async execute(data: ListPets ): Promise<ListPetsUseCaseResponse> {
        const pet = await this.petsRepository.list(data)

        return { pet }
    }
}