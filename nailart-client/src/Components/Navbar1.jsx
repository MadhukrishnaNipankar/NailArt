import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css"; // Custom styling (optional)

function MyNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        {/* Left-aligned logo */}
        <Navbar.Brand href="#home" className="navbar-logo">
          MyBrand
        </Navbar.Brand>
        
        {/* Navbar Toggle Button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* Collapsible Menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
