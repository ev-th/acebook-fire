import React, { useState } from 'react';
import CommentList from '../commentList/commentList';
import './Post.css';


const Post = ({post}) => {
const [showComments, setShowComments] = useState(false);

const toggleComments = () => {
  setShowComments(!showComments);
}

const commentsArr = [{comment: "1st Comment"}, {comment: "2nd Comment"}, {comment: "3rd Comment"}]

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
  
  {showComments && (
    <div className="comments" data-cy="comments" key={post._id}>

        <div className="comment-list">
          {commentsArr.slice().reverse().map((comment) => {
            return <CommentList comment={comment} />;
          })}
        </div>

        <form className="comment-form">
        <input placeholder="comment" id="comment" type="text" />
        <input id="submit" type="submit" value="Submit" />
      </form>
    </div>
  )}
  </div>
)};

export default Post;
