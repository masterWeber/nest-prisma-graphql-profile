import { Skill } from './skill.entity.js';

export class Profile {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly links: string[],
    readonly skills: Skill[],
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}