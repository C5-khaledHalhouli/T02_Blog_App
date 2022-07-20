import { useSelector } from "react-redux"
import Table from 'react-bootstrap/Table';
import "./style.css"
import "bootstrap/dist/css/bootstrap.min.css";
import React,{useState,useEffect} from "react"
import axios from "axios";

const UsersPage=()=>{
  const [albums, setAlbums] = useState([])
useEffect(()=>{
  axios.get("https://jsonplaceholder.typicode.com/albums").then((result)=>{
setAlbums(result.data)
console.log(result.data);
  }).catch((err)=>{
    console.log(err);
  })
},[])
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
    <th>Number of Albums</th>
  </tr>
</thead>
<tbody>
    {albums.length&&state.users.length&&state.posts.length&&state.users.map((element,index)=>{
        let numberOfPosts=state.posts.filter((elementPost)=>{
    return element.id===elementPost.userId
}).length
let numberOfAlbumts=albums.filter((elementAlbums)=>{
  return element.id===elementAlbums.userId
}).length
        return  <tr key={index + "user"}>
        <td>{element.id}</td>
        <td>{element.name}</td>
        <td>{numberOfPosts}</td>
        <td>{numberOfAlbumts}</td>
        
      </tr>

    })}
 
  
</tbody>
</Table>
</div>

}
export default UsersPage