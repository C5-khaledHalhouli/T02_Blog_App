import { useSelector,useDispatch } from "react-redux/es/exports";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./style.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { editeUserAction } from "../redux/reducer/users";


const UserPage = () => {
    const dispatch=useDispatch()
  const [show, setShow] = useState(false);
const [email, setEmail] = useState("")
const [name, setName] = useState("")
const [username, setUsername] = useState("")
  const state = useSelector((state) => {
    return {
      loginUser: state.users.loginUser,
    };
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const saveChangesButton=()=>{
 
    const infoObj={}
    if (name) {
        infoObj.name=name
    }
    if(username){
        infoObj.username=username
    }
    if(email){
        infoObj.email=email
    }
    dispatch(editeUserAction([state.loginUser[0].id,infoObj]))
    handleClose()
  }

  return (
    <div className="userPage">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edite Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={state.loginUser.length && state.loginUser[0].name}
                autoFocus
                onChange={(e)=>{
                    setName(e.target.value)
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
                defaultValue={state.loginUser.length && state.loginUser[0].username}
                onChange={(e)=>{
                    setUsername(e.target.value)
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                defaultValue={state.loginUser.length && state.loginUser[0].email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            
            saveChangesButton()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Card style={{ width: "18rem", height: "25rem" }} className="cardUser">
        <Card.Body>
          <Card.Title className="cardTitleUser">User Info</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Name</Card.Subtitle>
          <Card.Text>
            {state.loginUser.length && state.loginUser[0].name}
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Username</Card.Subtitle>
          <Card.Text>
            {state.loginUser.length && state.loginUser[0].username}
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">Email</Card.Subtitle>
          <Card.Text>
            {state.loginUser.length && state.loginUser[0].email}
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Edite
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default UserPage;
