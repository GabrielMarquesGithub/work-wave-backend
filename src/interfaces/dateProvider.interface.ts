export interface IDateProvider {
  addDays(days: number): Date;
  addMinutes(minutes: number): Date;
  isValidDate(date: Date): boolean;
}
