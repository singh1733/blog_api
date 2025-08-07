import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Create() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    published: false,
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
      const data = await res.json();
      if (res.ok) {
        setMessage("Post created successfully!");
        navigate("/posts");
        setFormData({ title: "", content: "", published: false }); // Reset form
      } else {
        setMessage(`${data.error || "Registration failed. Please try again."}`);
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
