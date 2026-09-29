import { Module } from '@nestjs/common';
import { ProfileUseCases } from './application/profile.use-cases.js';
import { ProfileResolver } from './adapters/inbound/graphql/profile.resolver.js';
import { PrismaProfileRepository } from './adapters/outbound/prisma-profile.repository.js';
import { ProfileRepository } from './domain/profile.repository.js';

@Module({
  providers: [
    ProfileResolver,
    ProfileUseCases,
    PrismaProfileRepository,
    {
      provide: ProfileRepository,
      useExisting: PrismaProfileRepository,
    },
  ],
})
export class ProfileModule {}