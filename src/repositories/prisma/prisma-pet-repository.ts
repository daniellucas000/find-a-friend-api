import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma.js";
import type { PetsRepository } from "../pets-repository.js";

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetCreateInput) {
        const pet = await prisma.pet.create({
            data
        })

        return pet
    }
}