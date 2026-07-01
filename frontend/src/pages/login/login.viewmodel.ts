import type { Login } from "@/infra/types/auth-service.type";
import { LoginSchema } from "@/infra/schema/auth-service.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthService } from "@/infra/services/auth.service";
import { isAxiosError } from "axios";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLoginSubmit = async (data: Login) => {
    setIsLoading(true);
    try {
      const response = await AuthService.login(data);

      console.log(response);
    } catch (err) {
      console.log(isAxiosError(err), { err });
      if (isAxiosError(err)) {
        if (err.response?.status === 401) {
          form.setError(
            "email",
            { message: "Invalid Email" },
            { shouldFocus: true },
          );
          form.setError(
            "password",
            { message: "Invalid Password" },
            { shouldFocus: true },
          );
          toast.error("Failed to login", {
            description: "Invalid Email or Password",
            position: "top-right",
          });
          return;
        }
      }
      toast.error("Something went wrong!", {
        description: JSON.stringify(err),
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = () => navigate("/auth/register");

  return {
    isLoading,
    form,
    handleLoginSubmit,
    handleNavigate,
  };
};
