import { Injectable } from '@nestjs/common';
import {
  Experience as PrismaExperience,
  Profile as PrismaProfile,
  Project as PrismaProject,
  Skill as PrismaSkill,
} from '@prisma/client';
import { PrismaService } from '../../../../infrastructure/prisma/prisma.service.js';
import { Profile } from '../../domain/profile.entity.js';
import { ProfileRepository } from '../../domain/profile.repository.js';
import { Skill } from '../../domain/skill.entity.js';
import { Experience } from '../../domain/experience.entity.js';
import { Project } from '../../domain/project.entity.js';

@Injectable()
export class PrismaProfileRepository implements ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(): Promise<Profile | null> {
    const profile = await this.prisma.profile.findFirst({
      include: { skills: true, experience: true, projects: true },
    });
    return profile ? this.toDomain(profile) : null;
  }

  private toDomain(
    profile: PrismaProfile & {
      skills: PrismaSkill[];
      experience: PrismaExperience[];
      projects: PrismaProject[];
    },
  ): Profile {
    return new Profile(
      profile.id,
      profile.name,
      profile.description,
      profile.links,
      profile.skills.map((skill) => new Skill(skill.id, skill.name)),
      profile.experience.map(
        (item) =>
          new Experience(
            item.id,
            item.company,
            item.position,
            item.startDate,
            item.endDate,
            item.achievements,
          ),
      ),
      profile.projects.map(
        (project) => new Project(project.id, project.name, project.url),
      ),
      profile.createdAt,
      profile.updatedAt,
    );
  }
}