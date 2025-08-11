import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../userContext"; // adjust path if needed

const Post = () => {
  const { postId } = useParams(); // get postId from URL
  const { user } = useContext(UserContext); // access the user object
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // Fetch single post data
        const postRes = await axios.get(
          `http://localhost:4000/posts/${postId}`,
          {
            withCredentials: true,
          }
        );
        setPost(postRes.data.post);

        // Fetch comments for that post
      } catch (error) {
        console.error("Error fetching post:", error);
      }

      try {
        // Fetch comments for that post
        const commentsRes = await axios.get(
          `http://localhost:4000/posts/${postId}/comments`,
          {
            withCredentials: true,
          }
        );
        setComments(commentsRes.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  //add an edit and delete feature for admins

  return (
    <div>
      {!post ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            {post.username == user?.username && (
              <>
                <Link to={`/posts/${post.id}/edit`}>Edit</Link>
                <Link to={`/posts/${post.id}/delete`}>Delete</Link>
              </>
            )}
            <h3>{post.username}</h3>
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
                <h4>{comment.username}</h4>
                <p>{comment.content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Post;
