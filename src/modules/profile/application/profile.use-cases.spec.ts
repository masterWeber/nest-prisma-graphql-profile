import { NotFoundException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';
import { Profile } from '../domain/profile.entity.js';
import { ProfileRepository } from '../domain/profile.repository.js';
import { ProfileUseCases } from './profile.use-cases.js';

describe('ProfileUseCases', () => {
  it('returns the profile from the repository', async () => {
    const profile = new Profile(
      'profile-id',
      'Stanislav Tkach',
      'Fullstack developer',
      [],
      [],
      [],
      [],
      new Date(),
      new Date(),
    );
    const repository = new StubProfileRepository(profile);

    await expect(new ProfileUseCases(repository).find()).resolves.toBe(profile);
  });

  it('throws when the profile is missing', async () => {
    const repository = new StubProfileRepository(null);

    await expect(new ProfileUseCases(repository).find()).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});

class StubProfileRepository extends ProfileRepository {
  constructor(private readonly profile: Profile | null) {
    super();
  }

  find(): Promise<Profile | null> {
    return Promise.resolve(this.profile);
  }
}