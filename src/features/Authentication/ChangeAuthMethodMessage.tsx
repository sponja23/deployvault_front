import { Link } from "react-router-dom";

export function ChangeAuthMethodMessage({
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
            {authMethod === "login" ? "Create an account" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
}
