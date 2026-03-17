import  type { OrgsRepository } from '@/repositories/orgs-repository.js'
import type { Org } from '@prisma/client'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.js'

interface GetOrgProfileUseCaseRequest {
  orgId: string
}

interface GetOrgProfileUseCaseResponse {
  org: Org
}

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgProfileUseCaseRequest): Promise<GetOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return {
      org
    }
  }
}
