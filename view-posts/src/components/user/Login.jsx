import { useState, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        username,
        password,
      });

      const token = res.data.token;

      // 1. Save token in localStorage
      localStorage.setItem("token", token);

      // 2. Decode it to get user info
      const decodedUser = jwtDecode(token);

      // 3. Save user info to context
      setUser(decodedUser);

      // 4. Navigate to homepage or dashboard
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
      alert("Invalid credentials");
    }
  }

  return (
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
  );
}
