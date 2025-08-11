import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../userContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/user/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      const loggedInUser = res.data.user;
      setUser(loggedInUser);
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid credentials");
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
      <p>
        Don't have an account? <Link to="/user/register">Register</Link>
      </p>
    </div>
  );
}
