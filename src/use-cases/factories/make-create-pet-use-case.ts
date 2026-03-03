import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-org-repository.js";
import { CreatePetsUseCase } from "../create-pets.js";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pet-repository.js";

export function makeCreatePetUseCase() {
    const petsRepository = new PrismaPetsRepository()
    const orgsRepository = new PrismaOrgsRepository()
    const createPetUseCase = new CreatePetsUseCase(petsRepository, orgsRepository)

    return createPetUseCase
}