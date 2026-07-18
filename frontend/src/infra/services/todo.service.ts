import { apiClient } from "../api/api.client";
import type { TodoStatusResponse } from "../types/todo-service.type";

export class TodoService {
  static async getStatus() {
    const response = await apiClient.get<TodoStatusResponse>("todos/status");
    return response;
  }
}
