import { z } from "zod";
import { TodoStatus } from "../types/todo.enum";

export const TodoSchema = z.object({
  title: z.string().min(2, "Name must be at least 2 characters long"),
  description: z.string().optional(),
  startDate: z.date({ error: "Date is required field" }),
  endDate: z.date({ error: "Date is required field" }),
  createdAt: z.date({ error: "Date is required field" }),
  status: z.enum(TodoStatus, { error: "Todo Status must be a valid status" }),
});
