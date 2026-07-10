import { Outlet } from "react-router";
import "./auth.style.css";
import Logo from "@/assets/todooo.webp";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <div className="auth-container">
      <nav className="auth-container__nav">
        <img src={Logo} alt="Todooo Logo" />
      </nav>

      <div className="auth-container__form-container">
        <div className="auth-containter__form">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
