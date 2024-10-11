import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";

export const Profilebar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <span>{user!.email}</span>
      <Dropdown align="end">
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          <i className="pi pi-cog" />
        </Dropdown.Toggle>
        <Dropdown.Menu
          style={{
            zIndex: 9000,
          }}
        >
          <Dropdown.Item as={Link} to="/profile" id="ProfileButton">
            Profile
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/user-settings" id="UserSettingsButton">
            Settings
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
