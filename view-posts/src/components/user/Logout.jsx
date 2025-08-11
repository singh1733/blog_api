import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../userContext";
import axios from "axios";

export default function Delete({ username }) {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`http://localhost:4000/user/${username}/logout`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to log out");
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
}
