import { makeGetOrgProfileUseCase } from "@/use-cases/factories/make-get-org-profile-use-case.js"
import type { FastifyRequest, FastifyReply } from "fastify"

export async function profile(request: FastifyRequest, response: FastifyReply) {
    const getOrgProfile = makeGetOrgProfileUseCase()

    const { org } = await getOrgProfile.execute({
        orgId: request.user.sub
    })

    return response.status(200).send({ org: {
        ...org,
        password: undefined
    } })
}
