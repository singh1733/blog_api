import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../userContext";
import axios from "axios";

export default function Delete({ username }) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) return <p>Please log in</p>;
  if (username !== user.username)
    return <p>You are not authorized to delete this profile</p>;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this account?"))
      return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete your account.");
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/user/${username}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("User deleted successfully");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  return <button onClick={handleDelete}>Delete Account</button>;
}
