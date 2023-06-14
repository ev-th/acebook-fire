import React, { useEffect, useState } from 'react';
import CommentList from '../commentList/commentList';
import './Post.css';


const Post = ({post}) => {

const commentsArr = [{comment: "1st Comment"}, {comment: "2nd Comment"}, {comment: "3rd Comment"}]

  return(
    <div className="post" data-cy="post" key={ post._id }>

      <div>
        <p className="name">{post.firstName +" "+ post.lastName}</p> 
        <p>{ post.content }</p>
      </div>
      <div id='feed' role="feed">
         { console.log(commentsArr)}
          {
            commentsArr.slice().reverse().map((comment) => {
              return <CommentList comment={ comment }/>
            })
          }
        </div>
        <form> 
          <input placeholder="comment" id="comment" type='text' />
          <input id='submit' type="submit" value="Submit" />
        </form>
      </div>
  )
}

export default Post;
