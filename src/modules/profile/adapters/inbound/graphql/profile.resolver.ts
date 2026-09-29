import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Profile } from '../../../domain/profile.entity.js';
import { ProfileUseCases } from '../../../application/profile.use-cases.js';
import { ProfileModel } from './profile.graphql.js';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly profileUseCases: ProfileUseCases) {}

  @Query(() => ProfileModel)
  profile(@Args('id', { type: () => ID }) id: string): Promise<Profile> {
    return this.profileUseCases.findById(id);
  }
}