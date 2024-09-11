import React, { useEffect, useRef } from "react";
import { Navbar, Container, Image } from "react-bootstrap";
import dvault_navbar from "../../assets/logo_deployvault.png";
import { Profilebar } from "./Profilebar";
import { Authbar } from "./Authbar";
import useAuth from "../../auth/useAuth";

export const NavBar: React.FC<{ onHeightChange: (height: number) => void }> = ({
    onHeightChange,
}) => {
    const { isAuthenticated } = useAuth();
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (navRef.current) {
            onHeightChange(navRef.current.clientHeight);
        }
    }, [navRef.current?.clientHeight]);

    return (
        <Navbar
            ref={navRef}
            style={{ backgroundColor: "#9047C9" }}
            expand="lg"
            className="w-100 fixed-top"
        >
            <Container fluid className="px-0">
                <Navbar.Brand href="/" className="ml-8">
                    <Image
                        src={dvault_navbar}
                        alt="Logo"
                        style={{ height: "20px" }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-end mr-8"
                >
                    {isAuthenticated ? <Profilebar /> : <Authbar />}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
