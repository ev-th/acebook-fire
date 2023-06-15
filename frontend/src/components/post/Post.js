import React from "react";
import "./Post.css";

const Post = ({ post }) => {
  const userPageUrl = `/user/${post.userName}`;
  return (
    <div className="post" data-cy="post" key={post._id}>
      <div>
        <a href={userPageUrl} >
          <p className="name">{post.firstName + " " + post.lastName}</p>
        </a>
        <p>{post.newPost}</p>
      </div>
    </div>
  );
};

export default Post;
