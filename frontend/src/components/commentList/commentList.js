import React from "react";
import './commentList.css';


  const CommentList = ({comment}) => {
    return(
      <div className="comment" data-cy="comment" key={ comment._id }>
  
        <div>
          {/* <p className="name">{comment.firstName +" "+ comment.lastName}</p> 
          <p>{ comment.content }</p> */}
        </div>
        </div>
    )
  }

export default CommentList;