import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-org-repository.js"
import { AuthenticateUseCase } from "../authenticate.js"

export function makeAuthenticateUseCase() {
    const orgsRepository = new PrismaOrgsRepository()
    const authenticateUseCase = new AuthenticateUseCase(orgsRepository)

    return authenticateUseCase
}