import { TodoService } from "@/infra/services/todo.service";
import type { TodoStatus } from "@/infra/types/todo-service.type";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const useSelectTodo = () => {
  const [statuses, setStatuses] = useState<TodoStatus[]>([]);

  useEffect(() => {
    const getTodoStatus = async () => {
      try {
        const response = await TodoService.getStatus();

        setStatuses([
          {
            label: "Select todo status",
            value: null,
          },
          ...response.data,
        ]);
      } catch (err) {
        toast.error("Something went wrong!", {
          description: JSON.stringify(err),
          position: "top-right",
        });
      }
    };

    getTodoStatus();
  }, []);

  return {
    statuses,
  };
};
