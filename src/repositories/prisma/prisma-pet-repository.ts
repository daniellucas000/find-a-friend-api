import { Prisma, type Pet } from "@prisma/client";
import { prisma } from "@/lib/prisma.js";
import type { PetsRepository } from "../pets-repository.js";
import type { ListPets } from "@/@types/list-pets.js";

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetCreateInput) {
        const pet = await prisma.pet.create({
            data
        })

        return pet
    }

    async list(data: ListPets): Promise<Pet[]> {
        const { city, state, ...filters } = data

        const pets = await prisma.pet.findMany({
            where: {
                ...filters,
                org: {
                    city: city ? { contains: city, mode: 'insensitive' } : undefined,
                    state: state ? { contains: state, mode: 'insensitive' } : undefined,
                }
            }
        })

        return pets
    }
}