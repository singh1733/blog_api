import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../userContext";
import { useParams } from "react-router-dom";

const CreateComment = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    content: "",
    username: user.username,
    postId,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to create a post.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:4000/posts/${postId}/comments/create`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(" Comment created successfully!");
      navigate(`/posts/${postId}`);
      setFormData({ content: "", username: "", postId: "" }); // Reset form
    } catch (err) {
      console.error(err);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Comment</h2>
      <label>Content:</label>
      <input
        type="text"
        name="content"
        value={formData.content}
        onChange={handleChange}
        required
      />
      <button type="submit">Comment</button>
      <p>{message}</p>
    </form>
  );
};

export default CreateComment;
