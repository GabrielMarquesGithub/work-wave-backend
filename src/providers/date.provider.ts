import dayjs from "dayjs";

import { IDateProvider } from "../interfaces/dateProvider.interface";

class DateProvide implements IDateProvider {
  getDate(formattedDate: string): Date {
    return new Date(formattedDate);
  }

  addDays(days: number): Date {
    const formattedDate = dayjs().add(days, "days").toISOString();
    return this.getDate(formattedDate);
  }

  addMinutes(minutes: number): Date {
    const formattedDate = dayjs().add(minutes, "minutes").toISOString();
    return this.getDate(formattedDate);
  }

  isValidDate(date: Date): boolean {
    const currentDate = dayjs();
    const providedDate = dayjs(date);

    return providedDate.isAfter(currentDate);
  }
}

export { DateProvide };
