export class Experience {
  constructor(
    readonly id: string,
    readonly company: string,
    readonly position: string,
    readonly startDate: Date,
    readonly endDate: Date | null,
    readonly achievements: string[],
  ) {}
}