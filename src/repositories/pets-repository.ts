import type { ListPets } from "@/@types/list-pets.js";
import type { Prisma, Pet } from "@prisma/client";

export interface PetsRepository {
    create(data: Prisma.PetCreateInput): Promise<Pet>
    list(data: ListPets): Promise<Pet[]>
}