import { Routes, Route } from "react-router";
import { lazy } from "react";
import { Navigate } from "react-router";

// * AUTHS + AUTH LAYOUT
import Login from "@/pages/login/login.page";
import Register from "@/pages/register/register.page";
import AuthLayout from "@/components/layouts/auth/auth.layout";

// * MAIN LAYOUT
import MainLayout from "@/components/layouts/main/main.layout";

// * MAIN PAGES
const Dashboard = lazy(() => import("@/pages/dashboard/dashboard.page"));
const Todos = lazy(() => import("@/pages/todos/todos.page"));

const App = () => {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="todos" element={<Todos />} />
      </Route>
    </Routes>
  );
};

export default App;
