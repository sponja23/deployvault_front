import deployVault_logo from "../../assets/logo_deployvault_inverted.png";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import { FormEvent } from "react";
import { AuthForm, Input } from "./AuthForm";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    // TODO: Add validation here

    await login({ email, password });

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
      <AuthForm handleSubmit={handleSubmit} authMethod="login" title="Log in">
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
