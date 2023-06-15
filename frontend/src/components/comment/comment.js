import React from "react";
import './comment.css';


const Comment = ({comment}) => {
  return (
    <div className="comment" data-cy="comment" key={ comment._id }>
      <div>
        <p className="comment"> {comment.content}</p>
      </div>
    </div>
  )
}

export default Comment;