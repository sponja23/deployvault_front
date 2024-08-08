import React from "react";
import { Dropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/services/authService";
import { clearAuth } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../redux/hooks";

export const Profilebar = ({ email }: { email: string }) => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    //TODO(Mariano): Implement logout
    // await logout();

    dispatch(clearAuth());
    dispatch(setUser({ email: "", username: "" }));
    navigate("/");
  };

  return (
    <>
      <Navbar.Text className="mr-5">Signed in as: {email}</Navbar.Text>
      <Dropdown align="end">
        <Dropdown.Toggle variant="light" id="dropdown-basic" style={{ borderRadius: "50%", padding: "0.5rem", backgroundColor: "#f8f9fa" }}>
          <i className="pi pi-cog" style={{ fontSize: "1.5rem", color: "#333" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/profile" id="ProfileButton">
            Profile
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/user-settings" id="UserSettingsButton">
            Settings
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleLogout()}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
