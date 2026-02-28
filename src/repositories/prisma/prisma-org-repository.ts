import { Prisma } from "@prisma/client";
import type { OrgsRepository } from "../orgs-repository.js";
import { prisma } from "@/lib/prisma.js";

export class PrismaOrgsRepository implements OrgsRepository {
    async create(data: Prisma.OrgCreateInput) {
        const org = await prisma.org.create({
            data
        })

        return org
    }
}