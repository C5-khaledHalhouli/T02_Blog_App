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
import { addPostsAction } from "../redux/reducer/posts";

const PostsPage = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      posts: state.posts.posts,
      users: state.users.users,
      commentsOfPost: state.comments.commentsOfPost,
    };
  });

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
  const addPostClick=()=>{
    // ! change userId
dispatch(addPostsAction({userId:1,id:state.posts.length+1,title:postTitle,body:postBody}))
    setShow(false)
  }

  return (
    <div className="postsPage">
      <>
        <Button variant="primary" onClick={handleShow}>
          Add post
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add post</Modal.Title>
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
            <Button variant="primary" onClick={addPostClick}>
              Add post
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      {state.posts &&
        state.users.length !== 0 &&
        state.posts.map((element, index) => {
          let user = state.users.find((elementUsers) => {
            return elementUsers.id === element.userId;
          });
          // console.log("user",user);
          return (
            <Card key={index + "post"} className="cardsPost">
              <Card.Header as="h5">{user.name}</Card.Header>
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
    </div>
  );
};

export default PostsPage;
