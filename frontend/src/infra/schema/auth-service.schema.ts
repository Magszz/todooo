import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email({ error: "Please provide a valid email address" }),
  password: z
    .string({ error: "Password must be at least 8 characters" })
    .min(8),
});

const BaseRegisterSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(80, "First name has maximum of 80 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(80, "Last name has maximum of 80 characters"),
  email: z.email({ error: "Please provide a valid email address" }),
  password: z.string().refine(
    (value) => {
      const passwordRegex =
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

      return passwordRegex.test(value);
    },
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number or symbol",
    },
  ),
  confirmPassword: z.string(),
});

export const RegisterSchema = BaseRegisterSchema.refine(
  (data) => data.confirmPassword === data.password,
  {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  },
);
