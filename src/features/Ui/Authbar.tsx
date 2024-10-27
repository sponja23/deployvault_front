import { Link } from "react-router-dom";

export function Authbar() {
  return (
    <div className="flex gap-2">
      <Link to="/register" id="SingUpButton">
        <button>Register</button>
      </Link>
      <Link to="/login" id="SignInButton">
        <button>Log in</button>
      </Link>
    </div>
  );
}
