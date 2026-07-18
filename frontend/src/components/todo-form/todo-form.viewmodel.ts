import { TodoSchema } from "@/infra/schema/todo-service.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Todo } from "@/infra/types/todo-service.type";

export const useTodoForm = () => {
  const form = useForm<Todo>({
    resolver: zodResolver(TodoSchema),
  });

  return {
    form,
  };
};
