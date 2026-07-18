import { z } from "zod";
import { TodoSchema } from "../schema/todo-service.schema";

export type Todo = z.infer<typeof TodoSchema>;
