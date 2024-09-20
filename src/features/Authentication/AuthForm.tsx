import deployVault_logo from "../../assets/logo_deployvault_inverted.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import useAuth from "../../auth/useAuth";
import { FormEvent } from "react";

// TODO: Divide the form into register and login forms
export const AuthForm = () => {
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
      <div className="p-10 w-[400px] gap-3 flex flex-col bg-primary text-white">
        <h2 className="">{pathname === "/auth" ? "Sign in" : "Register"}</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          {pathname === "/register" && (
            <div className="form-group mb-3">
              <input
                className="bg-transparent border"
                type="text"
                name="username"
                placeholder="Username"
                autoComplete="username"
              />
            </div>
          )}
          <div className="form-group mb-3">
            <input
              className="bg-transparent border"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
            />
          </div>
          <div className="form-group mb-3">
            <input
              className="bg-transparent border"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full dark-accent-button"
            // disabled={isSubmitting}
          >
            {pathname === "/auth" ? "Sign in" : "Register"}
          </button>
        </form>
        <div className="flex gap-3 items-center px-2">
          <div className="border-b border-b-caos-gray-200 flex-grow" />
          <span className="text-lg font-medium">or</span>
          <div className="border-b border-b-caos-gray-200 flex-grow" />
        </div>
        <div className="flex flex-col gap-2">
          <button className="w-full bg-zinc-100 text-black hover:bg-zinc-300 active:bg-zinc-400">
            <FaGoogle />
            {pathname === "/auth"
              ? "Sign in with Google"
              : "Register in with Google"}
          </button>
          <button className="w-full bg-black hover:bg-zinc-900 active:bg-zinc-800">
            <FaGithub />
            {pathname === "/auth"
              ? "Sign in with GitHub"
              : "Register in with GitHub"}
          </button>
        </div>
        <div className="text-center">
          <div className="text-center mt-3">
            {pathname === "/auth" ? (
              <p className="flex gap-2 justify-center">
                New to CaOS?
                <Link to="/register" className="text-accent">
                  Create an account
                </Link>
              </p>
            ) : pathname === "/register" ? (
              <p className="flex gap-2 justify-center">
                Already have an account?
                <Link to="/auth" className="text-accent">
                  Sign in
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
