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
      <div className="p-10 w-[400px] border border-caos-gray-300 gap-3 flex flex-col">
        <h2 className="">{pathname === "/auth" ? "Sign in" : "Register"}</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          {pathname === "/register" && (
            <div className="form-group mb-3">
              <input
                type="text"
                name="username"
                placeholder="Username"
                autoComplete="username"
              />
            </div>
          )}
          <div className="form-group mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full"
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
          <button className="w-full bg-zinc-200 text-black">
            <FaGoogle />
            {pathname === "/auth"
              ? "Sign in with Google"
              : "Register in with Google"}
          </button>
          <button className="w-full bg-black">
            <FaGithub />
            {pathname === "/auth"
              ? "Sign in with GitHub"
              : "Register in with GitHub"}
          </button>
        </div>
        <div className="border-b border-b-caos-gray-200" />
        <div className="text-center">
          <div className="text-center">
            {pathname === "/auth" ? (
              <p>
                New to CaOS?{" "}
                <Link to="/register" className="text-accent font-medium">
                  Create an account
                </Link>
              </p>
            ) : pathname === "/register" ? (
              <p>
                Already have an account?{" "}
                <Link to="/auth" className="text-accent font-medium">
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
