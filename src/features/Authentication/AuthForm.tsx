import { FormEventHandler, ReactNode } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { googleLogin } from "../../auth/googleAuth";
import { Link } from "react-router-dom";


function ChangeAuthMethodMessage({
  authMethod,
}: {
  authMethod: "login" | "register";
}) {
  return (
    <div className="text-center">
      <div className="text-center mt-3">
        <p className="flex gap-2 justify-center">
          {authMethod === "login" ? "New to CaOS?" : "Already have an account?"}
          <Link
            to={authMethod === "login" ? "/register" : "/login"}
            className="text-accent"
          >
            {authMethod === "login" ? "Create an account" : "Log in"}
          </Link>
        </p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex gap-3 items-center px-2">
      <div className="border-b border-b-caos-gray-200 flex-grow" />
      <span className="text-lg font-medium">or</span>
      <div className="border-b border-b-caos-gray-200 flex-grow" />
    </div>
  );
}

function OAuthSection({ authMethod }: { authMethod: "login" | "register" }) {
  return (
    <div className="flex flex-col gap-2">
      <button className="w-full bg-zinc-100 text-black hover:bg-zinc-300 active:bg-zinc-400" onClick={() => googleLogin("/")}>
        <FaGoogle />
        {authMethod === "login" ? "Sign in" : "Register"} with Google
      </button>
      <button className="w-full bg-black hover:bg-zinc-900 active:bg-zinc-800">
        <FaGithub />
        {authMethod === "login" ? "Sign in" : "Register"} with GitHub
      </button>
    </div>
  );
}

export function Input({
  type = "text",
  name,
  placeholder,
  autoComplete,
}: {
  type?: string;
  name: string;
  placeholder: string;
  autoComplete: string;
}) {
  return (
    <div className="form-group mb-3">
      <input
        className="bg-transparent border"
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    </div>
  );
}

export function AuthForm({
  handleSubmit,
  title,
  authMethod,
  children,
}: {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  title: string;
  authMethod: "login" | "register";
  children: ReactNode;
}) {
  const showOAuth = true;

  return (
    <div className="p-10 w-[400px] gap-3 flex flex-col bg-primary text-white">
      <h2>{title}</h2>
      <form className="w-full" onSubmit={handleSubmit}>
        {children}
        <button type="submit" className="w-full dark-accent-button">
          {title}
        </button>
      </form>
      {showOAuth && (
        <>
          <Divider />
          <OAuthSection authMethod={authMethod} />
          <ChangeAuthMethodMessage authMethod={authMethod} />
        </>
      )}
    </div>
  );
}
