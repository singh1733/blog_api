import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../userContext";

export default function EditUser() {
  const { postId } = useParams();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    title: "",
    content: "",
    published: false,
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch single post data
        const postRes = await axios.get(
          `http://localhost:4000/posts/${postId}`,
          {
            withCredentials: true,
          }
        );
        setFormData({
          username: postRes.data.post.username,
          title: postRes.data.post.title,
          content: postRes.data.post.content,
          published: postRes.data.post.published,
        });

        // Fetch comments for that post
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "published") {
      setFormData((prev) => ({
        ...prev,
        published: e.target.checked
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/posts/${postId}/edit`, formData, {
        withCredentials: true,
      });
      navigate(`/`);
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  if (!user) return <p>Please log in</p>;
  if (formData.username !== user.username)
    return <p>You are not authorized to edit this post</p>;

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Content:
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </label>

        <label>
          Published:
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
