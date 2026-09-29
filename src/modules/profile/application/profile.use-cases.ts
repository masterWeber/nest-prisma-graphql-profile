import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '../domain/profile.entity.js';
import { ProfileRepository } from '../domain/profile.repository.js';

@Injectable()
export class ProfileUseCases {
  constructor(private readonly profiles: ProfileRepository) {}

  async find(): Promise<Profile> {
    const profile = await this.profiles.find();

    if (!profile) {
      throw new NotFoundException('Profile was not found');
    }

    return profile;
  }
}