import { Outlet, Navigate } from "react-router";
import { useMainLayout } from "./main.layout.viewmodel";

const MainLayout = () => {
  const { isAuthenticated } = useMainLayout();

  if (!isAuthenticated) return <Navigate to="/auth/login" />;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
