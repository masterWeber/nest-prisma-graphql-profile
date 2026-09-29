export class Profile {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly description: string,
    readonly links: string[],
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}