import React from "react";
import './commentList.css';


  const CommentList = ({comment}) => {
    return(
      <div className="comment" data-cy="comment" key={ comment._id }>
        <div>
          { <p className="comment"> {comment.comment}</p> }
        </div>
        </div>
    )
  }

export default CommentList;