import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { login } from "../redux/reducer/users";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./style.css"
const NavBar = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const state = useSelector((state) => {
    return {
      loginUser: state.users.loginUser,
    };
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const signInButton = () => {
    dispatch(login({ username: username, email: email }));
    setShow(false);
  };
  const signoutClick=()=>{
    dispatch(login([]))
    localStorage.removeItem("login")
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="name123"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={signInButton}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar key={"sm"} bg="light" expand={"sm"} className="mb-3">
        <Container fluid>
          <Nav.Link className="navTitle">Task Blog</Nav.Link>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"sm"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"sm"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"sm"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"sm"}`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link>
                  <Link to={"/"}className="navLink">Posts</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={"/users"} className="navLink">Users</Link>
                </Nav.Link>
                
              </Nav>
              <Navbar.Collapse className="justify-content-end">
                {state.loginUser.length !== 0 ? (
                  <Navbar.Text>
                    <Nav>
                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title={`${state.loginUser[0].name}`}
                        menuVariant="dark"
                      >
                        <NavDropdown.Item href="/userinfo">
                          Profile
                        </NavDropdown.Item>

                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={signoutClick}>
                          SignOut
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Text>
                ) : (
                  <Navbar.Text onClick={handleShow} className="link">SignIn</Navbar.Text>
                )}
              </Navbar.Collapse>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
