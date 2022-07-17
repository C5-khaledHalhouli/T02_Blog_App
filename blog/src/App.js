import React,{useEffect} from 'react';
import './App.css';
import {useDispatch} from "react-redux"
import {allComments} from "./components/redux/reducer/comments/index"
import {allPosts} from "./components/redux/reducer/posts/index"
import {allUsers} from "./components/redux/reducer/users/index"
import axios from "axios"
import NavBar from './components/NavBar';

function App() {
const dispatch =useDispatch()
  useEffect(()=>{
axios.get("https://jsonplaceholder.typicode.com/users").then((result)=>{
  dispatch(allComments(result.data))
}).catch((err)=>{
  console.log(err);
})
axios.get("https://jsonplaceholder.typicode.com/posts").then((result)=>{
  dispatch(allPosts(result.data))

}).catch((err)=>{
  console.log(err);
})
axios.get("https://jsonplaceholder.typicode.com/comments").then((result)=>{
  dispatch(allUsers(result.data))

}).catch((err)=>{
  console.log(err);
})

  },[])


  return (
    <div className="App">
      <NavBar/>
      
    </div>
  );
}

export default App;
