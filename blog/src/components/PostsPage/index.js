import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux/es/exports";
import "./style.css";
import axios from "axios";
import { commentsOfPost } from "../redux/reducer/comments";
import {
  addPostsAction,
  deletePostsAction,
  editeAction,showPostsAction
} from "../redux/reducer/posts";
import Dropdown from "react-bootstrap/Dropdown";
let numPage=1

const PostsPage = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const [editeShow, setEditeShow] = useState(false);
  const [postId, setPostId] = useState("");
  const handleClose = () => {
    setDeleteShow(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleShowDelete = () => setDeleteShow(true);

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      posts: state.posts.posts,
      users: state.users.users,
      commentsOfPost: state.comments.commentsOfPost,
      loginUser: state.users.loginUser,
      showPost:state.posts.showPost
    };
  });
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  const commentClick = (postId) => {
    if (
      state.commentsOfPost.length === 0 ||
      state.commentsOfPost[0].postId !== postId
    ) {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then((result) => {
          dispatch(commentsOfPost(result.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(commentsOfPost([]));
    }
  };
  const addPostClick = () => {
    dispatch(
      addPostsAction({
        userId: state.loginUser[0].id,
        id: state.posts.length + 1,
        title: postTitle,
        body: postBody,
      })
    );
    setShow(false);
    setPostBody("");
    setPostTitle("");
  };
  const deleteClick = (id) => {
    dispatch(deletePostsAction(id));
  };
  const editeClick = () => {
    let editePost = {};
    if (postBody) {
      editePost.body = postBody;
    }
    if (postTitle) {
      editePost.title = postTitle;
    }
    dispatch(editeAction([postId, editePost]));
    setShow(false);
  };
  const seeMoreClick=()=>{
    numPage =numPage+1
    dispatch(showPostsAction(numPage))
  }

  return (
    <div className="postsPage">
      <>
        <Button variant="primary" onClick={handleShow}>
          Add post
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {editeShow ? (
              <Modal.Title>Edite post</Modal.Title>
            ) : (
              <Modal.Title>Add post</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                console.log(e);
              }}
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Post title</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  name="fPostTitle"
                  onChange={(e) => {
                    setPostTitle(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label
                  onChange={(e) => {
                    console.log(1);
                  }}
                >
                  Post body
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => {
                    setPostBody(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {editeShow ? (
              <Button variant="primary" onClick={editeClick}>
                Edite post
              </Button>
            ) : (
              <Button variant="primary" onClick={addPostClick}>
                Add post
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </>
      {state.showPost &&
        state.users.length !== 0 &&
        state.showPost.map((element, index) => {
          let user = state.users.find((elementUsers) => {
            return elementUsers.id === element.userId;
          });
          // console.log("user",user);
          return (
            <Card key={index + "post"} className="cardsPost">
              <Card.Header as="h5">
                <h5>{user.name}</h5>{" "}
                {state.loginUser.length !== 0 &&
                state.loginUser[0].name === user.name ? (
                  <>
                    <Modal show={deleteShow} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Post</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Are you sure you want to delete this post?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            deleteClick(element.id);
                            handleClose();
                          }}
                        >
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <Dropdown className="dropdownList">
                      <Dropdown.Toggle
                        as={CustomToggle}
                        id="dropdown-custom-components"
                      >
                        
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            setEditeShow(true);
                            setPostId(element.id);
                            handleShow();
                          }}
                        >
                          Edite
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            handleShowDelete();
                          }}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ) : (
                  <></>
                )}
              </Card.Header>
              <Card.Body>
                <Card.Title>{element.title}</Card.Title>
                <Card.Text>{element.body}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    commentClick(element.id);
                  }}
                >
                  Comments
                </Button>
                {state.users.length !== 0 &&
                  state.commentsOfPost.map((elementpost, index) => {
                    if (element.id === elementpost.postId) {
                      let user = state.users.find((elementUsers) => {
                        return elementUsers.email === elementpost.email;
                      });
                      return (
                        <Card key={index + "comment"}>
                          <Card.Header>{elementpost.name}</Card.Header>
                          <Card.Body>
                            <blockquote className="blockquote mb-0">
                              <p>{elementpost.body}</p>
                              <footer className="blockquote-footer">
                                comment by{" "}
                                <cite title="Source Title">
                                  {elementpost.email}
                                </cite>
                              </footer>
                            </blockquote>
                          </Card.Body>
                        </Card>
                      );
                    }
                  })}
              </Card.Body>
            </Card>
          );
        })}
        <Button variant="secondary" onClick={seeMoreClick}>See more</Button>
    </div>
  );
};

export default PostsPage;
