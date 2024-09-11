import { Dropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";

export const Profilebar = () => {
    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = async () => {
        logout();
        navigate("/");
    };

    return (
        <>
            <Navbar.Text className="mr-5">
                Signed in as: {user!.email}
            </Navbar.Text>
            <Dropdown align="end">
                <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                    style={{
                        borderRadius: "50%",
                        padding: "0.5rem",
                        backgroundColor: "#f8f9fa",
                    }}
                >
                    <i
                        className="pi pi-cog"
                        style={{ fontSize: "1.5rem", color: "#333" }}
                    ></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile" id="ProfileButton">
                        Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                        as={Link}
                        to="/user-settings"
                        id="UserSettingsButton"
                    >
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleLogout()}>
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};
