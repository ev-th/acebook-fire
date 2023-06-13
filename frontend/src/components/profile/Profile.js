import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import Post from '../post/Post';
import jwtDecode from 'jwt-decode';

const Profile = ({ navigate, params }) => {
  const { username }  = params()

  const [userName, setUserName] = useState("")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userID, setUserID] = useState("");
  
  useEffect(() => {
    if(token) {
      setUserID(jwtDecode(token).user_id);
      fetch(`/user?username=${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(response => response.json())
      .then( data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        
        setFirstName(data.user.firstName)
        setLastName(data.user.lastName)
        setUserName(data.user.userName)
        });
        fetchPosts().then(() => {
          let filteredPosts = posts.filter(post => post.userId === userID);
          setUserPosts(filteredPosts);
        })
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
      setPosts(data.posts);
    }
    
    const logout = () => {
      window.localStorage.removeItem("token")
      navigate('/login')
    }

   
  //  setUserPosts(filteredPosts);

  // console.log(filteredPosts)
  console.log(userID)
  // setPosts(filteredPosts);

    if(token) {
      return (
        <>
      <Navbar />
      <div data-cy="profile">
        <button onClick={logout}>
          Logout
        </button>
        <h2>Profile Page</h2>
        <h3>Name: {`${firstName} ${lastName}`}</h3>
        <h3>username: {userName}</h3>
      </div>

      <div id='feed' role="feed">
          {
            userPosts.slice().reverse().map((post) => {
              return <Post post={ post }/>
            })
          }
      </div>
      </>
    )
  } else {
    navigate('/login')
  }
}

export default Profile;