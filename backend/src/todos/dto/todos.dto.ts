import { IsString, IsNotEmpty, IsEnum, MinLength } from "class-validator";
import { TodoStatus } from "../enums/todos.enum";
import { IsCustomDate } from "../../common/decorators/date.decorator";
import { ToCustomDate } from "../../common/transformers/date.transformer";

export class TodosDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: "Todo Name must be at least 2 characters long" })
  name: string;

  @IsString()
  description?: string;

  @IsEnum(TodoStatus, {
    message: `Status value must one of: ${Object.values(TodoStatus).join(", ")}`,
  })
  status: TodoStatus;

  @IsCustomDate()
  @ToCustomDate()
  startDate: string;

  @IsCustomDate()
  @ToCustomDate()
  endDate: string;
}
