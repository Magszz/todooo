import { House, NotebookPen, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { LocalStorage } from "@/utils/localstorage.utils";
import { useNavigate } from "react-router";

export const useSidebar = () => {
  const navigate = useNavigate();
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const options = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <House />,
    },
    {
      name: "Todos",
      path: "/todos",
      icon: <NotebookPen />,
    },
  ];

  const options2 = [
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings />,
    },
    {
      name: "Logout",
      action: () => setIsLogout(true),
      icon: <LogOut />,
    },
  ];

  const confirmLogout = () => {
    setIsLogout(false);
    LocalStorage.removeItem("token");
    LocalStorage.removeItem("userInfo");
    navigate("/auth/login");
  };

  const cancelLogout = () => {
    setIsLogout(false);
  };

  return {
    options,
    options2,
    isLogout,
    confirmLogout,
    cancelLogout,
  };
};
