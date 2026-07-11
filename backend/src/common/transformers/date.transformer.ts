import { Transform } from "class-transformer";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DATE_FORMAT } from "../../constants/date.constant";

dayjs.extend(customParseFormat);

export function ToCustomDate(format: string = DATE_FORMAT) {
  return Transform(({ value }) => {
    const parsed = dayjs(value, format, true);
    return parsed.isValid() ? parsed.toDate() : value;
  });
}
