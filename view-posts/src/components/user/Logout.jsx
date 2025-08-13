import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../userContext";

export default function LogOut() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return <button onClick={handleLogout}>Log Out</button>;
}
