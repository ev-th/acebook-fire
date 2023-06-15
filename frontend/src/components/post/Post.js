import React, { useState } from 'react';
import CommentList from '../commentList/commentList';
import './Post.css';


const Post = ({post}) => {
const [showComments, setShowComments] = useState(false);
const [commentsArr, setCommentsArr] = useState([{comment: "1st Comment"}, {comment: "2nd Comment"}, {comment: "3rd Comment"}])
const [likes, setLikes] =useState(0);
const [isLiked, setIsLiked] = useState(false);

const handleLike = () => {
  if (!isLiked) {
    setLikes((prevLikes) => prevLikes + 1);
    setIsLiked(true);
  } else {
    setLikes((prevLikes) => prevLikes - 1);
    setIsLiked(false);
  }
};

const toggleComments = () => {
  setShowComments(!showComments);
}


const addComment = (event) => {
  event.preventDefault();
    const comment = event.target.elements.comment.value;
    setCommentsArr((prevComments) => [...prevComments, { comment }]);
    event.target.reset();
}
return (
  <div className="post" data-cy="post" key={post._id}>
    
    <div>
      <p className="name">{post.firstName + " " + post.lastName}</p>
      <p>{post.content}</p>
    </div>

    <div className="likes-toggle">
    <button onClick={handleLike} >
        {isLiked ? 'Liked' : 'Like'}
      </button>
      <p>Likes: {likes}</p>
    </div>

    <div className="comments-toggle">
      <button onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
    </div>

    <form className="comment-form" onSubmit={(event) =>{ addComment(event)}}>
      <input placeholder="comment" id="comment" name="comment" type="text" />
      
      <button id="submit" type="submit" >Submit</button>
      {console.log(commentsArr)}
    </form>

  {showComments && (
    <div className="comments" data-cy="comments" key={post._id}>

        <div className="comment-list">
          {commentsArr.slice().reverse().map((comment) => {
            return <CommentList comment={comment} />;
          })}
        </div>
    </div>
  )}
  </div>
)};

export default Post;
