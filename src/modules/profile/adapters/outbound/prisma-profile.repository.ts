import { Injectable } from '@nestjs/common';
import { Profile as PrismaProfile, Skill as PrismaSkill } from '@prisma/client';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service.js';
import { Profile } from '../../domain/profile.entity.js';
import { ProfileRepository } from '../../domain/profile.repository.js';
import { Skill } from '../../domain/skill.entity.js';

@Injectable()
export class PrismaProfileRepository implements ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(): Promise<Profile | null> {
    const profile = await this.prisma.profile.findFirst({
      include: { skills: true },
    });
    return profile ? this.toDomain(profile) : null;
  }

  private toDomain(
    profile: PrismaProfile & { skills: PrismaSkill[] },
  ): Profile {
    return new Profile(
      profile.id,
      profile.name,
      profile.description,
      profile.links,
      profile.skills.map((skill) => new Skill(skill.id, skill.name)),
      profile.createdAt,
      profile.updatedAt,
    );
  }
}