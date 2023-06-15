import React, { useEffect, useState } from 'react';
import Comment from '../comment/comment';
import jwtDecode from 'jwt-decode';
import './Post.css';


const Post = ({post, navigate}) => {
  const userPageUrl = `/user/${post.userName}`;
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userId, setUserId] = useState(jwtDecode(token).user_id);

  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.likes.includes(userId))
  
  const [comments, setComments] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if(!token) {
      navigate('/login')
    }
  }, [])

  const handleLike = async () => {

    const response = await fetch( '/posts', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        postId: post._id,
        like: userId
      })
    })

    const data = await response.json()

    window.localStorage.setItem("token", data.token);
    setToken(window.localStorage.getItem("token"));

    setLikes(data.post.likes)
    setLiked(!liked)
  }

  const toggleComments = () => {
    setShowComments(!showComments);
  }

  const addComment = async (event) => {
    event.preventDefault();

    const commentContent = event.target.elements.comment.value;

    const response = await fetch( '/posts', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        postId: post._id,
        comment: {
          userId: userId,
          content: commentContent
        }
      })
    })

    const data = await response.json()

    window.localStorage.setItem("token", data.token);
    setToken(window.localStorage.getItem("token"));

    setComments(data.post.comments)
    event.target.reset()
    setShowComments(true);
  }

  return (
    <div className="post" data-cy="post" key={post._id}>
    
    <div>
      <a href={userPageUrl} >
        <p className="name">{post.firstName + " " + post.lastName}</p>
      </a>
      <p>{post.content}</p>
    </div>

    <div className="likes-toggle">
      <button onClick={handleLike}>
        {liked ? "Unlike" : "Like"}
      </button>
      <p>Likes: {likes.length}</p>
    </div>

    <div className="comments-toggle">
      <button onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
    </div>

    <form className="comment-form" onSubmit={(event) => { addComment(event)}}>
      <input placeholder="comment" id="comment" name="comment" type="text" />
      
      <button id="submit" type="submit" >Submit</button>
    </form>

  {showComments && (
    <div className="comments" data-cy="comments" key={post._id}>

      <div className="comment-list">
        {
          comments.slice().reverse().map((comment) => {
            return <Comment comment={comment} />
          })
        }
      </div>
    </div>
  )}

  </div>
)};

export default Post;