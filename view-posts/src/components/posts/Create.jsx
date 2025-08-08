import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../userContext";


export default function Create() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // access the user object
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    published: false,
    username: user.username
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
    try {  
      const res = await axios.post(
        "http://localhost:4000/posts/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );
      if (res.ok) {
        setMessage("Post created successfully!");
        navigate("/posts");
        setFormData({ title: "", content: "", published: false, username: "" }); // Reset form
      } else {
        setMessage(`${res.data.error || "Posting failed. Please try again."}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <label>Content:</label>
      <input
        type="text"
        name="content"
        value={formData.content}
        onChange={handleChange}
        required
      />
      <label>Draft:</label>
      <input
        type="checkbox"
        name="published"
        value={formData.published}
        onChange={handleChange}
        required
      />

      <button type="submit">Create</button>
      <p>{message}</p>
    </form>
  );
}
