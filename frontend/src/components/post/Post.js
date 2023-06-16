import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const userPageUrl = `/user/${post.userName}`;
  return (
    <div className="post" data-cy="post" key={post._id}>
      <div>
        <Link to={userPageUrl}>
          <p className="name">{post.firstName + " " + post.lastName}</p>
        </Link>
        <p>{post.newPost}</p>
      </div>
    </div>
  );
};

export default Post;
