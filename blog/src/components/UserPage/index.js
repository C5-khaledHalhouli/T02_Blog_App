import { useSelector } from "react-redux/es/exports"


const userPage=()=>{
const state=useSelector((state)=>{

    return({
        loginUser:state.users.loginUser
    })
})

    return  <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>User Info</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Name</Card.Subtitle>
      <Card.Text>
        {state.loginUser.length&&state.loginUser[0].name}
      </Card.Text>
      <Card.Subtitle className="mb-2 text-muted">Username</Card.Subtitle>
      <Card.Text>
        {state.loginUser.length&&state.loginUser[0].username}
      </Card.Text>
      <Card.Subtitle className="mb-2 text-muted">Email</Card.Subtitle>
      <Card.Text>
        {state.loginUser.length&&state.loginUser[0].Email}
      </Card.Text>
      <Card.Link href="#">Card Link</Card.Link>
      <Card.Link href="#">Another Link</Card.Link>
    </Card.Body>
  </Card>
}