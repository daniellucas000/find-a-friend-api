import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-org-repository.js";
import { RegisterUseCase } from "../register.js";

export function makeRegisterUseCase() {
    const orgsRepository = new PrismaOrgsRepository()
    const registerUseCase = new RegisterUseCase(orgsRepository)

    return registerUseCase
}