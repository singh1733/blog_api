import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


const Post = () => {
  const { postId } = useParams(); // get postId from URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // Fetch single post data
        const postRes = await axios.get(
          `http://localhost:3000/posts/${postId}`,
          {
            withCredentials: true,
          }
        );
        setPost(postRes.data);

        // Fetch comments for that post
        const commentsRes = await axios.get(
          `http://localhost:3001/posts/${postId}/comments`,
          {
            withCredentials: true,
          }
        );
        setComments(commentsRes.data);
      } catch (error) {
        console.error("Error fetching post or comments:", error);
      }
    };

    fetchPostAndComments();
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
      <Link to={`/posts/${post.id}/comments/create`}>Leave a Comment</Link>
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
