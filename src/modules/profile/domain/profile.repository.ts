import { Profile } from './profile.entity.js';

export abstract class ProfileRepository {
  abstract findById(id: string): Promise<Profile | null>;
}