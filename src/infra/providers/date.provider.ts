import dayjs from "dayjs";

import { IDateProvider } from "../../core/interfaces/dateProvider.interface";

class DateProvide implements IDateProvider {
  getDate(formattedDate: string): Date {
    return new Date(formattedDate);
  }

  addDays(days: number): Date {
    const formattedDate = dayjs().add(days, "days").toISOString();
    return this.getDate(formattedDate);
  }
}

export { DateProvide };
