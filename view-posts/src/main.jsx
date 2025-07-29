import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
import Nav from "./components/Nav";
import Posts from "./pages/Posts";
import User from "./pages/User";
import UserContext from "./userContext";


export default function Main() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        { path: "/", element: <Navigate to="/posts" /> },
        { path: "/posts", element: <Posts /> },
        { path: "/user", element: <User /> },
      ],
    },
  ]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
