import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SkillModel {
  @Field()
  name!: string;
}

@ObjectType()
export class ProfileModel {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => [String])
  links!: string[];

  @Field(() => [SkillModel])
  skills!: SkillModel[];
}
