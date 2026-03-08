import type { OrgsRepository } from "@/repositories/orgs-repository.js";
import type { Org } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrgAlreadyExistisError } from "./errors/org-already-exists-error.js";

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
    cep: string
    address: string
    city: string
    state: string
    whatsapp_number: string
}

interface RegisterUseCaseResponse {
    org: Org
}

export class RegisterUseCase {
    constructor(private orgsRepository: OrgsRepository) {}

    async execute({ name, email, password, cep, address, city, state, whatsapp_number }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.orgsRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new OrgAlreadyExistisError
        }

        const org = await this.orgsRepository.create({
            name,
            email,
            password: password_hash,
            cep,
            address,
            city,
            state,
            whatsapp_number
        })

        return { org }
    }
}