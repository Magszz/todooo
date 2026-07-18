import { z } from "zod";
import { TodoSchema } from "../schema/todo-service.schema";
import { TodoStatus as TodoStatusEnum } from "./todo.enum";

export type Todo = z.infer<typeof TodoSchema>;

export interface TodoStatus {
  value: TodoStatusEnum | null;
  label: string;
}

export interface TodoStatusResponse {
  data: TodoStatus[];
  message: string;
}
