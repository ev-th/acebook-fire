import React, { useEffect, useState } from 'react';
import CommentList from '../commentList/commentList';
import './Post.css';


const Post = ({post}) => {
  
  return(
    <div className="post" data-cy="post" key={ post._id }>

      <div>
        <p className="name">{post.firstName +" "+ post.lastName}</p> 
        <p>{ post.content }</p>
      </div>
      <div id='feed' role="feed">
          {
            post.commentArray.slice().reverse().map((comment) => {
              return <commentList comment={ comment }/>
            })
          }
        </div>
      
      </div>
  )
}

export default Post;
