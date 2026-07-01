import type { Register } from "@/infra/types/auth-service.type";
import { RegisterSchema } from "@/infra/schema/auth-service.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthService } from "@/infra/services/auth.service";
import { toast } from "sonner";
import { isAxiosError } from "axios";

export const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<Register>({
    resolver: zodResolver(RegisterSchema),
  });

  const handleRegisterSubmit = async (data: Register) => {
    setIsLoading(true);
    try {
      const response = await AuthService.register(data);

      console.log(response);
    } catch (err) {
      if (isAxiosError(err)) {
        console.log({ err });
        if (err.response?.status === 409) {
          form.setError(
            "email",
            {
              message: err.response?.data?.message,
            },
            { shouldFocus: true },
          );

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

  const handleNavigate = () => navigate("/auth/login");

  return {
    form,
    isLoading,
    handleRegisterSubmit,
    handleNavigate,
  };
};
