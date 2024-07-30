import React, { useEffect, useRef } from "react";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { Navbar, Container, Image } from "react-bootstrap";
import CaOS_orangeBG from "../../assets/CaOS_white_transparent.png";
import { Profilebar } from "./Profilebar";
import { Authbar } from "./Authbar";

export const NavBar: React.FC<{ onHeightChange: (height: number) => void }> = ({ onHeightChange }) => {
  const { email } = useAppSelector((state: RootState) => state.global.user);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navRef.current) {
      onHeightChange(navRef.current.clientHeight);
    }
  }, [navRef.current?.clientHeight]);

  return (
    <Navbar ref={navRef} style={{ backgroundColor: "#047698" }} expand="lg" className="w-100 fixed-top">
      <Container fluid className="px-0">
        <Navbar.Brand href="/" className="ml-8">
          <Image src={CaOS_orangeBG} alt="Logo" style={{ height: "120px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end mr-8">
          {email ? <Profilebar email={email} /> : <Authbar />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
