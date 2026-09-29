import { Profile } from './profile.entity.js';

export abstract class ProfileRepository {
  abstract find(): Promise<Profile | null>;
}