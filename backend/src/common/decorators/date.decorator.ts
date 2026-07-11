// src/common/validators/is-custom-date.decorator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DATE_FORMAT } from "../../constants/date.constant";

dayjs.extend(customParseFormat);

console.log(
  "dayjs test:",
  dayjs("01-07-2026 09:00:00", "DD-MM-YYYY HH:mm:ss", true).isValid(),
);

@ValidatorConstraint({ name: "isCustomDate", async: false })
export class IsCustomDateConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: any) {
    const format = args.constraints[0] || DATE_FORMAT;
    console.log({
      format,
      value,
      validation: dayjs(value, format, true).isValid(),
    });

    if (value instanceof Date) {
      return !isNaN(value.getTime());
    }

    return typeof value === "string" && dayjs(value, format, true).isValid();
  }

  defaultMessage(args: any) {
    const format = args.constraints[0] || DATE_FORMAT;
    return `${args.property} must be a valid date in format ${format}`;
  }
}

export function IsCustomDate(
  format: string = DATE_FORMAT,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [format],
      validator: IsCustomDateConstraint,
    });
  };
}
