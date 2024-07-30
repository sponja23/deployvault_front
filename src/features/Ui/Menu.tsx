import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Menu: React.FC = () => {
  return (
    <Navbar bg="light" style={{ marginBottom: "20px" }}>
      {/* <Container> */}
      {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link id="MenuLink">
            <Link to="/home" style={{ color: "inherit", textDecoration: "none" }} id="HomeButton">
              Home
            </Link>
          </Nav.Link>

          <NavDropdown title="Packages" id="basic-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/packages-distribution" style={{ color: "inherit", textDecoration: "none" }} id="PackagesDistributionButton">
                Package Distribution
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/packages-retrieval" style={{ color: "inherit", textDecoration: "none" }} id="PackageRetrievalButton">
                Package Retrieval
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
};
