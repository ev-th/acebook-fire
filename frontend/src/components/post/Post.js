import React from 'react';
import './Post.css';


const Post = ({post}) => {
  return(
    <div className="post" data-cy="post" key={ post._id }>

      <div>
        <p>{post.firstName +" "+ post.lastName}</p> 
        <p>{ post.newPost }</p>
      </div>
      </div>
  )
}

export default Post;
