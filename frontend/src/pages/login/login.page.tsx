import "./login.style.css";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "./login.viewmodel";
import { Controller } from "react-hook-form";

const Login = () => {
  const { form, handleLoginSubmit, isLoading, handleNavigate } = useLogin();

  return (
    <div className="login-container">
      <div className="login-container__header">
        <h3>Login</h3>
        <span>Hi, Welcome back 👋</span>
      </div>

      <div className="login-container__form-container">
        <form id="loginForm" onSubmit={form.handleSubmit(handleLoginSubmit)}>
          <FieldGroup className="pb-5">
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="E.g. email@test.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup className="pb-5">
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <div className="login-container__form-footer">
          <Button type="submit" form="loginForm" disabled={isLoading}>
            Login
          </Button>
          <p>
            Not registered yet?{" "}
            <span onClick={handleNavigate}>Create an Account</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
