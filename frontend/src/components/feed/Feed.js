import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import Navbar from '../navbar/Navbar'
import jwtDecode from 'jwt-decode';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [content, setContent] = useState("");
  const [userID, setUserID] = useState("");

  useEffect(() => {
    if(token) {
      setUserID(jwtDecode(token).user_id);
      fetchPosts();
    } else {
      navigate('/login')
    }
  }, [])
  
  const fetchPosts = async () => {
      const response = await fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      setToken(window.localStorage.getItem("token"));
      console.log(data)
      setPosts(data.posts);
      console.log(data.posts);
  }

  const saveNewPost = async () => {
    return await fetch( '/posts', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        content: content,
        userId: userID
      })
    })
  }
  
  //posting a new post
  const handleSubmitPost = async (event) => {
    event.preventDefault();
    
    if(token) {
      const response = await saveNewPost();
      if(response.status === 201) {
        setContent("")
        fetchPosts();
      }
    } else {
      navigate('./login')
    }
  }
  
  const handlePostChange = (event) => {
    setContent(event.target.value)
  }
  
  if(token) {
    return(
      <>
        <Navbar navigate={ navigate }/>
        <h2 id="posts-header">Posts</h2>
        
        <form id="postForm" onSubmit={handleSubmitPost}>
          <textarea rows="5" cols="40" placeholder="...add a new post here!" id="post" type='text' value={ content } onChange={handlePostChange} />
          <input id='submit' type="submit" value="Submit" />
        </form>

        <div id='feed' role="feed">
          {
            posts.slice().reverse().map((post) => {
              return <Post post={ post } showImage={true}/>
            })
          }
        </div>
      </>
    )
  }
}

export default Feed;
