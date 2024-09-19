import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FaCog } from "react-icons/fa";

export const Profilebar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative"
      onClick={() => setShowDropdown((prev) => !prev)}
      tabIndex={0}
      onBlur={(e) => {
        if (!dropdownRef.current?.contains(e.nativeEvent.relatedTarget as Node))
          setShowDropdown(false);
      }}
    >
      <div className="flex gap-3 items-center bg-black/10 px-3 py-2 rounded-md cursor-pointer hover:bg-black/20 active:bg-black/30 transition-all duration-150 ease-in-out">
        <span>{user!.email}</span>
        <FaCog />
      </div>
      <div
        className={twMerge(
          "absolute top-11 right-0 bg-white border border-gray-200 rounded-md p-2 text-primary-500 shadow-md",
          showDropdown ? "block" : "hidden",
        )}
        ref={dropdownRef}
      >
        <ul className="flex flex-col gap-2 w-[100px]">
          <li className="px-2 py-1 hover:bg-caos-gray-100 rounded-md flex justify-stretch items-stretch">
            <Link to="/profile" className="w-full h-full">
              Profile
            </Link>
          </li>
          <li className="px-2 py-1 hover:bg-caos-gray-100 rounded-md flex justify-stretch items-stretch">
            <Link to="/user-settings" className="w-full h-full">
              Settings
            </Link>
          </li>
          <li className="px-2 py-1 hover:bg-caos-gray-100 rounded-md flex justify-stretch items-stretch">
            <button onClick={() => handleLogout()} className="w-full py-1">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
