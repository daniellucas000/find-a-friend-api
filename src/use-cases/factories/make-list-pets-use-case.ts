import { ListPetsUseCase } from "../list-pets.js";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pet-repository.js";

export function makeListPetsUseCase() {
    const petsRepository = new PrismaPetsRepository()
    const useCase = new ListPetsUseCase(petsRepository)

    return useCase
}