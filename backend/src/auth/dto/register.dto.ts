import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { Match } from "../../common/decorators/match.decorator";

export class RegisterDto {
  @IsString()
  @MinLength(2, { message: "First name must be at least 2 characters" })
  @MaxLength(80)
  firstName: string;

  @IsString()
  @MinLength(2, { message: "Last name must be at least 2 characters" })
  @MaxLength(80)
  lastName: string;

  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters" })
  @MaxLength(64)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number or symbol",
  })
  password: string;

  @IsString()
  @Match("password", { message: "Passwords do not match" })
  confirmPassword: string;
}
