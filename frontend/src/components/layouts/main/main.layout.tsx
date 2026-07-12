import "./main.style.css";
import { Outlet, Navigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/auth/login" />;

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-layout__content-container">
        <Navbar />
        <div className="main-layout__outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
