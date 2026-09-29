import { Injectable } from '@nestjs/common';
import { Profile as PrismaProfile } from '@prisma/client';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service.js';
import { Profile } from '../../domain/profile.entity.js';
import { ProfileRepository } from '../../domain/profile.repository.js';

@Injectable()
export class PrismaProfileRepository implements ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Profile | null> {
    const profile = await this.prisma.profile.findUnique({ where: { id } });
    return profile ? this.toDomain(profile) : null;
  }
  private toDomain(profile: PrismaProfile): Profile {
    return new Profile(
      profile.id,
      profile.name,
      profile.description,
      profile.links,
      profile.createdAt,
      profile.updatedAt,
    );
  }
}