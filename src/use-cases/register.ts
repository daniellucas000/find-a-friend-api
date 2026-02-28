import type { OrgsRepository } from "@/repositories/orgs-repository.js";
import type { Org } from "@prisma/client";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
    cep: string
    address: string
    whatsapp_number: string
}

interface RegisterUseCaseResponse {
    org: Org
}

export class RegisterUseCase {
    constructor(private orgsRepository: OrgsRepository) {}

    async execute({ name, email, password, cep, address, whatsapp_number }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.orgsRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new Error('todo, já arrumo')
        }

        const org = await this.orgsRepository.create({
            name,
            email,
            password: password_hash,
            cep,
            address,
            whatsapp_number
        })

        return { org }
    }
}