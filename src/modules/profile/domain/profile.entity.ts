import { Skill } from './skill.entity.js';
import { Experience } from './experience.entity.js';
import { Project } from './project.entity.js';

export class Profile {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly links: string[],
    readonly skills: Skill[],
    readonly experience: Experience[],
    readonly projects: Project[],
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}