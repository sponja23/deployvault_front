import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../features/Ui/Navbar";
import { Footer } from "../features/Ui/bottombar";
import { Container } from "react-bootstrap";
import { Menu } from "../features/Ui/Menu";
import useAuth from "../auth/useAuth";

export const Layout = () => {
    const [navHeight, setNavHeight] = useState(0);
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    // Determine whether to show the Menu
    const showMenu = isAuthenticated && location.pathname !== "/";

    return (
        <div className="layout-wrapper">
            <NavBar onHeightChange={setNavHeight} />
            <main
                className="main-content"
                style={{ paddingTop: navHeight, width: "100%" }}
            >
            <Container className="h-100 d-flex flex-column">
                {showMenu && <Menu />}
                <Outlet />
            </Container>
            </main>
            <Footer />
        </div>
    );
};
