import React, { useEffect, useState } from 'react';
import CommentList from '../commentList/commentList';
import jwtDecode from 'jwt-decode';
import './Post.css';


const Post = ({post, navigate}) => {
const userPageUrl = `/user/${post.userName}`;
const [showComments, setShowComments] = useState(false);
const [token, setToken] = useState(window.localStorage.getItem("token"));
// const [userID, setUserID] = useState("");
// const [commentsArr, setCommentsArr] = useState(post.comments)
// const [likes, setLikes] =useState(post.likes);
// const [isLiked, setIsLiked] = useState(false);


  useEffect(() => {
    if(token) {
      // setUserID(jwtDecode(token).user_id);
    } else {
     navigate('/login')
    }
  }, [])


// const handleLike = () => {

const handleLike = async () => {
 const token1 = jwtDecode(token).user_id
  console.log(post)

  const response = await fetch( '/posts', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      postId: post._id,
      like: token1
    })
  })
  const data = await response.json()
  window.localStorage.setItem("token", data.token);
  setToken(window.localStorage.getItem("token"));
  post.likes = data.post.likes
  console.log(data);

}

const toggleComments = () => {
  setShowComments(!showComments);
}


const addComment = async (event) => {
  event.preventDefault();
    const comment = event.target.elements.comment.value;
    const token1 = jwtDecode(token).user_id
  console.log(token1)
  console.log(post)

  const response = await fetch( '/posts', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      postId: post._id,
      comment: comment
    })
  })
  const data = await response.json()
  window.localStorage.setItem("token", data.token);
  setToken(window.localStorage.getItem("token"));
  post.comments = data.post.comments
  event.target.reset()
  
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
    <button onClick={handleLike} >
      Like
      </button>
      <p>Likes: {post.likes.length}</p>
    </div>

    <div className="comments-toggle">
      <button onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
    </div>

    <form className="comment-form" onSubmit={(event) =>{ addComment(event)}}>
      <input placeholder="comment" id="comment" name="comment" type="text" />
      
      <button id="submit" type="submit" >Submit</button>
    </form>

  {showComments && (
    <div className="comments" data-cy="comments" key={post._id}>

        <div className="comment-list">
          {post.comments.slice().reverse().map((comment) => {
            return <CommentList comment={comment} />;
          })}
        </div>
    </div>
  )}
  </div>
)};

export default Post;


// const template = async () => {
//   return await fetch( '/posts', {
//     method: 'patch',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ 
//       postId: "",
//       like: "",
//       comment: {
//         userId: "",
//         content: ""
//       }
//     })
//   })
// }