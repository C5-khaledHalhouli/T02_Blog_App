import { useSelector } from "react-redux"
import Table from 'react-bootstrap/Table';
import "./style.css"
import "bootstrap/dist/css/bootstrap.min.css";


const UsersPage=()=>{

    const state=useSelector((state)=>{
return({
    users:state.users.users,
    posts:state.posts.posts

}
)
    })

return  <div className="usersPage">

<Table striped="columns">
<thead>
  <tr>
    <th>#</th>
    <th>Name</th>
    <th> Number of Posts</th>
  </tr>
</thead>
<tbody>
    {state.users.length&&state.posts.length&&state.users.map((element)=>{
        let numberOfPosts=state.posts.filter((elementPost)=>{
    return element.id===elementPost.userId
}).length
        return  <tr>
        <td>{element.id}</td>
        <td>{element.name}</td>
        <td>{numberOfPosts}</td>
        
      </tr>

    })}
 
  
</tbody>
</Table>
</div>

}
export default UsersPage