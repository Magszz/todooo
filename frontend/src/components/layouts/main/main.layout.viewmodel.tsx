import { useUser } from "@/stores/user.store";
import { LocalStorage } from "@/utils/localstorage.utils";

export const useMainLayout = () => {
  const authToken = LocalStorage.getItem("token");
  const user = useUser((state) => state.user);

  return {
    isAuthenticated: authToken && user,
  };
};
