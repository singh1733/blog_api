import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../userContext";

export default function EditUser() {
  const { username } = useParams();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:4000/user/${user.username}/edit`,
        formData,
        {
          withCredentials: true,
        }
      );
      setUser(res.data.user);
      //why doesnt user.username===res.data.user.username?
      navigate(`/user/${res.data.user.username}`);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  if (!user) return <p>Please log in</p>;
  if (username !== user.username)
    return <p>You are not authorized to edit this profile</p>;

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input name="email" value={formData.email} onChange={handleChange} />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
