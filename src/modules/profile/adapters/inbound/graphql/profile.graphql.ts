import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SkillModel {
  @Field()
  name!: string;
}

@ObjectType()
export class ExperienceModel {
  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field(() => GraphQLISODateTime)
  startDate!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate!: Date | null;

  @Field(() => [String])
  achievements!: string[];
}

@ObjectType()
export class ProjectModel {
  @Field()
  name!: string;

  @Field()
  url!: string;
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

  @Field(() => [ExperienceModel])
  experience!: ExperienceModel[];

  @Field(() => [ProjectModel])
  projects!: ProjectModel[];
}
