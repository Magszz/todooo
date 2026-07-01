import { Routes, Route } from "react-router";

// * AUTHS + AUTH LAYOUT
import Login from "@/pages/login/login.page";
import Register from "@/pages/register/register.page";
import AuthLayout from "@/components/layouts/auth/auth.layout";

const App = () => {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
