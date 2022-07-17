import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux/es/exports";

const PostsPage = () => {
  const state = useSelector((state) => {
    return {
      posts: state.posts.posts,
      users:state.users.users,
    };
  });

  return (
    <div className="postsPage">
      {state.posts&&state.users.length!==0&&state.posts.map((element) => {
        let user =state.users.find((elementUsers)=>{
return elementUsers.id===element.userId
        })
        // console.log("user",user);
        return (
          <Card>
            <Card.Header as="h5">{user.name}</Card.Header>
            <Card.Body>
              <Card.Title>{element.title}</Card.Title>
              <Card.Text>{element.body}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default PostsPage;
