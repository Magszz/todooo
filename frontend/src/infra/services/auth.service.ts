import { apiClient } from "../api/api.client";
import type {
  Login,
  Register,
  LoginResponse,
  RegisterResponse,
} from "../types/auth-service.type";
import { LoginSchema, RegisterSchema } from "../schema/auth-service.schema";

export class AuthService {
  static async login(data: Login) {
    LoginSchema.parse(data);
    const response = await apiClient.post<LoginResponse>("auth/login", data);
    return response;
  }

  static async register(data: Register) {
    RegisterSchema.parse(data);
    const response = await apiClient.post<RegisterResponse>(
      "auth/register",
      data,
    );
    return response;
  }
}
