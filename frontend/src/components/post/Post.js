import React, { useState } from 'react';
import CommentList from '../commentList/commentList';
import './Post.css';


const Post = ({post}) => {
const [showComments, setShowComments] = useState(false);

const toggleComments = () => {
  setShowComments(!showComments);
}

let commentsArr = [{comment: "1st Comment"}, {comment: "2nd Comment"}, {comment: "3rd Comment"}]
const addComment = (event, str) => {
  event.preventDefault();
  commentsArr.push({comment: str})
}
return (
  <div className="post" data-cy="post" key={post._id}>
    
    <div>
      <p className="name">{post.firstName + " " + post.lastName}</p>
      <p>{post.content}</p>
    </div>

    <div className="comments-toggle">
      <button onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
    </div>

    <form className="comment-form" onSubmit={(event) =>{ addComment(event, event.target.elements.comment.value)}}>
      <input placeholder="comment" id="comment" name="comment" type="text" />
      {console.log(commentsArr)}
      <button id="submit" type="submit" >Submit</button>
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
