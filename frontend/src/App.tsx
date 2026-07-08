import { Routes, Route } from "react-router";
import { lazy } from "react";

// * AUTHS + AUTH LAYOUT
import Login from "@/pages/login/login.page";
import Register from "@/pages/register/register.page";
import AuthLayout from "@/components/layouts/auth/auth.layout";

// * MAIN LAYOUT
import MainLayout from "@/components/layouts/main/main.layout";

// * MAIN PAGES
const Home = lazy(() => import("@/pages/home/home.page"));

const App = () => {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
