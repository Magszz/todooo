import { z } from "zod";
import { LoginSchema, RegisterSchema } from "../schema/auth-service.schema";

export type Login = z.infer<typeof LoginSchema>;
export type Register = z.infer<typeof RegisterSchema>;

export interface LoginResponse {
  message: string;
  accessToken: string;
}

export interface RegisterResponse {
  message: string;
}
