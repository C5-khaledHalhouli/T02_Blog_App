import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { login } from "../redux/reducer/users";
import NavDropdown from "react-bootstrap/NavDropdown";
import { searchAction, showPostsAction } from "../redux/reducer/posts";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
const NavBar = () => {
  const [showOverLays, setShowOverLays] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [search, setSearch] = useState("");
  const state = useSelector((state) => {
    return {
      loginUser: state.users.loginUser,
      users: state.users.users,
    };
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const signInButton = () => {
    dispatch(login({ username: username, email: email }));
    setShow(false);
  };
  const signoutClick = () => {
    dispatch(login([]));
    localStorage.removeItem("login");
  };
  const searchClick = () => {
    let user = state.users.filter((element) => {
      return element.name.toLowerCase().includes(search.toLowerCase());
    });
    dispatch(searchAction(user));
    navigate("/");
    const resultArr = [];
    if (!user.length) {
      let counter = 0;
      state.users.forEach((element) => {
        for (let i = 0; i < search.length; i++) {
          if (search.toLowerCase()[i] === element.name.toLowerCase()[i]) {
            counter += 1;
          } else if (
            search.toLowerCase()[i] === element.name.toLowerCase()[i + 1]
          ) {
            counter += 1;
          }
        }
        if (counter / search.length >= 0.66) {
          resultArr.push(element);
        }
        counter = 0;
      });
      dispatch(searchAction(resultArr));
    }
    if (!resultArr.length && !user.length) {
      dispatch(searchAction(state.users));
      setShowOverLays(true);
      setTimeout(() => {
        setShowOverLays(false);
      }, 2000);
    }
  };

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
      <Navbar key={"sm"} expand={"sm"} className="mb-3 navbar" sticky="top">
        <Container fluid sticky="top">
          <Nav.Link
            className="navTitle"
            href="/"
            onClick={() => dispatch(showPostsAction(1))}
          >
            Task Blog
          </Nav.Link>
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
                <Nav.Link
                  className="navlist navLink"
                  href={"#"}
                  onClick={() => {
                    navigate("/");
                    dispatch(showPostsAction(1));
                  }}
                >
                  Posts
                </Nav.Link>
                <Nav.Link
                  className="navlist navLink"
                  onClick={() => {
                    navigate("/users");
                  }}
                >
                  Users
                </Nav.Link>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search by name"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        searchClick();
                      }
                    }}
                  />
                  <Button
                    variant="outline-primary"
                    onClick={searchClick}
                    ref={target}
                  >
                    Search
                  </Button>
                </Form>
                <Overlay
                  target={target.current}
                  show={showOverLays}
                  placement="right"
                >
                  {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                      No result of {search}
                    </Tooltip>
                  )}
                </Overlay>
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
                  <Navbar.Text onClick={handleShow} className="link">
                    SignIn
                  </Navbar.Text>
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
