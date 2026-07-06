import type { Login } from "@/infra/types/auth-service.type";
import { LoginSchema } from "@/infra/schema/auth-service.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router";
import { AuthService } from "@/infra/services/auth.service";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { LocalStorage } from "@/utils/localstorage.utils";
import { UserService } from "@/infra/services/user.service";
import { useUser } from "@/stores/user.store";

export const useLogin = () => {
  const setUser = useUser((state) => state.setUser);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<Login>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLoginSubmit = async (data: Login) => {
    setIsLoading(true);
    try {
      const response = await AuthService.login(data);
      console.log({ response });
      LocalStorage.setItem("token", response.accessToken);

      getUserProfile();
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
      setIsLoading(false);
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await UserService.getUser();
      setUser(response.data);
      console.log({ response });
    } catch (err) {
      console.error(err);
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
    getUserProfile,
  };
};
