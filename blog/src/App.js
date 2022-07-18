import React,{useEffect} from 'react';
import './App.css';
import {useDispatch} from "react-redux"
import {allComments} from "./components/redux/reducer/comments/index"
import {allPosts} from "./components/redux/reducer/posts/index"
import {allUsers} from "./components/redux/reducer/users/index"
import axios from "axios"
import NavBar from './components/NavBar';
import PostsPage from './components/PostsPage';
import {Routes,Route} from "react-router-dom"
import UsersPage from './components/UsersPage';

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
axios.get("https://jsonplaceholder.typicode.com/users").then((result)=>{
  dispatch(allUsers(result.data))

}).catch((err)=>{
  console.log(err);
})

  },[])


  return (
    <div className="App">
      <NavBar/>
      <Routes>

      <Route path="/" element={<PostsPage/>}/>
      
      <Route path="/users" element={<UsersPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
