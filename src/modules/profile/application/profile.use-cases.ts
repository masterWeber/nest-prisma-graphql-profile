import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '../domain/profile.entity.js';
import { ProfileRepository } from '../domain/profile.repository.js';

@Injectable()
export class ProfileUseCases {
  constructor(private readonly profiles: ProfileRepository) {}

  async findById(id: string): Promise<Profile> {
    const profile = await this.profiles.findById(id);

    if (!profile) {
      throw new NotFoundException(`Profile ${id} was not found`);
    }

    return profile;
  }
}