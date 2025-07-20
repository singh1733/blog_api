import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { postId } = useParams(); // get postId from URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch single post data
    fetch(`http://localhost:3000/posts/${postId}`)
      .then((res) => res.json())
      .then(setPost)
      .catch(console.error);

    // Fetch comments for that post
    fetch(`http://localhost:3001/posts/${postId}/comments`)
      .then((res) => res.json())
      .then(setComments)
      .catch(console.error);
  }, [postId]);

  //add an edit and delete feature for admins

  return (
    <div>
      <div>
        <h3>{post.author}</h3>
        <h2>{post.title}</h2>
      </div>
      <p>{post.content}</p>

      <hr />
      <h3>Comments</h3>
      {comments.length === 0 && <p>No comments yet.</p>}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <h4>{comment.author}</h4>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
