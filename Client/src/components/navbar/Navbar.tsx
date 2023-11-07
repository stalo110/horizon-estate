import React, { useEffect, useState } from "react";
import "./navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar1 = () => {
  const [token, setToken] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(true);
    }
  }, [token]);
  const Logout = () => {
    localStorage.setItem("token", "");
    Navigate("/");
    location.reload();
  };

  console.log(token);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="Container">
        <Navbar.Brand className="logo">Horizon-Estate</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {!token && (
              <>
                {" "}
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>{" "}
              </>
            )}
            {token && <Nav.Link onClick={Logout}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar1;
