import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Nav from "./components/nav/Nav";
import Posts from "./components/posts/Posts";
import User from "./components/user/User";
import Register from "./components/user/Register";
import Login from "./components/user/Login";

import UserContext from "./components/userContext";


export default function Main() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       setUser(decoded);
  //     } catch (err) {
  //       console.error("Invalid token");
  //       localStorage.removeItem("token");
  //     }
  //   }
  // }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav />,
      children: [
        { path: "/", element: <Navigate to="/posts" /> },
        { path: "/posts", element: <Posts /> },
        { path: "/user", element: <User /> },
        { path: "/user/login", element: <Login /> },
        { path: "/user/register", element: <Register /> },
        

      ],
    },
  ]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
