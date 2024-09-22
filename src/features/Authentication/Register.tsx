import deployVault_logo from "../../assets/logo_deployvault_inverted.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import { FormEvent } from "react";
import { AuthForm, Input } from "./AuthForm";

export default function Register() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { login, register } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    const username = form.username?.value;

    // TODO: Add validation here

    if (pathname === "/auth") {
      await login(email, password);
    } else {
      await register(username, email, password);
    }

    navigate("/home");
  };

  return (
    <div className="flex flex-col justify-center items-center pt-5 gap-4">
      <Link to="/">
        <img
          src={deployVault_logo}
          alt="CaOS Logo"
          className="mb-4"
          style={{ maxWidth: "500px" }}
        />
      </Link>
      <AuthForm
        handleSubmit={handleSubmit}
        authMethod="register"
        title="Register"
      >
        <Input name="username" placeholder="Username" autoComplete="username" />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
        />
      </AuthForm>
    </div>
  );
}
