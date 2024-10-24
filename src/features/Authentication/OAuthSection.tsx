import { FaGoogle, FaGithub } from "react-icons/fa";
import { googleLogin } from "../../auth/googleAuth";

export function OAuthSection({ authMethod }: { authMethod: "login" | "register"; }) {
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
