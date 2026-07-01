import { Outlet } from "react-router";
import "./auth.style.css";
import Logo from "@/assets/todooo.webp";

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <nav className="auth-container__nav">
        <img src={Logo} alt="" />
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
