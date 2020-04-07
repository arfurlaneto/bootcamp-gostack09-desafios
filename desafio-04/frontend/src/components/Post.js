import React from 'react';

import Comment from './Comment';

function Post({ post }) {
  return (
    <div className="post">
      <div className="postHeader">
        <img src={post.author.avatar} alt={post.author.name} />
        <div>
          {post.author.name}
          <br />
          <span>{post.date}</span>
        </div>
      </div>
      <p className="postContent">
        {post.content}
      </p>
      <hr className="divider" />
      {post.comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
    </div>
  );
}

export default Post;
