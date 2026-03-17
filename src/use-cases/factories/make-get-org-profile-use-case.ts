import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-org-repository.js'
import { GetOrgProfileUseCase } from '../get-org-profile.js'

export function makeGetOrgProfileUseCase() {
  const usersRepository = new PrismaOrgsRepository()
  const useCase = new GetOrgProfileUseCase(usersRepository)

  return useCase
}
