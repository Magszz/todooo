import { House, NotebookPen, Settings, LogOut } from "lucide-react";

export const useSidebar = () => {
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
      path: "/todos",
      icon: <LogOut />,
    },
  ];

  return {
    options,
    options2,
  };
};
