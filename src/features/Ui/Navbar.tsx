import { Image } from "react-bootstrap";
import dvault_navbar from "../../assets/logo_deployvault.png";
import { Profilebar } from "./Profilebar";
import { Authbar } from "./Authbar";
import useAuth from "../../auth/useAuth";
import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

function NavLink({ to, children }: { to: string; children: ReactNode }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      className={twMerge(
        "hover:text-white hover:bg-accent-hover px-3 py-2 rounded-md transition-all duration-150 ease-in-out",
        isActive
          ? "text-white bg-accent-hover"
          : "text-caos-gray-200 bg-transparent",
      )}
    >
      {children}
    </Link>
  );
}

export function NavBar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="w-screen fixed top-0 bg-accent py-4 flex items-center px-10 justify-between">
      <Link to="/">
        <Image src={dvault_navbar} alt="Logo" className="h-6" />
      </Link>
      <nav>
        {isAuthenticated ? (
          <ul className="flex gap-1 items-center text-caos-gray-200">
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/packages-distribution">
                Package Distribution
              </NavLink>
            </li>
            <li>
              <NavLink to="/packages-retrieval">Package Retrieval</NavLink>
            </li>
            <Profilebar />
          </ul>
        ) : (
          <Authbar />
        )}
      </nav>
    </header>
  );
}
