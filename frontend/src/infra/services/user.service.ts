import { apiClient } from "../api/api.client";
import type { GetUserResponse } from "../types/user.type";

export class UserService {
  static async getUser() {
    const response = await apiClient.get<GetUserResponse>("user/me");
    return response;
  }
}
