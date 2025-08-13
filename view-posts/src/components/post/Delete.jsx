import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../userContext";
import axios from "axios";

export default function Delete({ username }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { postId } = useParams();

  if (!user) return <p>Please log in</p>;
  if (username !== user.username)
    return <p>You are not authorized to delete this profile</p>;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete a post.");
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/posts/${postId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Post deleted successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  };

  return <button onClick={handleDelete}>Delete Post</button>;
}
