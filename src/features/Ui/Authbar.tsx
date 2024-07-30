import React from "react";
import { Link } from "react-router-dom";
import { CaOSButton } from "../../components/CaOSButton/CaOSButton";

export const Authbar: React.FC = () => {
  return (
    <>
      <Link to="/auth" id="SignInButton">
        <CaOSButton label="Sign In" variant="outline-light" className="me-2" size="medium" />
      </Link>
      <Link to="/register" id="SingUpButton">
        <CaOSButton label="Sign Up" variant="outline-light" className="mr-8" size="medium" />
      </Link>
    </>
  );
};
