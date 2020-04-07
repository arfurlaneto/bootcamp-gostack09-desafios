import React from 'react';

function Comment({ comment }) {
  return (
    <div className="comment">
      <img src={comment.author.avatar} alt={comment.author.name} />
      <div>
        <span>{comment.author.name}</span>
        {comment.content}
      </div>
    </div>
  );
}

export default Comment;
