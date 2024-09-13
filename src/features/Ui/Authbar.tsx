import { Link } from "react-router-dom";

export function Authbar() {
  return (
    <div className="flex gap-2">
      <Link to="/auth" id="SignInButton">
        <button>Sign In</button>
      </Link>
      <Link to="/register" id="SingUpButton">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}
