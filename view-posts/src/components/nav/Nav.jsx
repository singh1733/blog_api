import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import UserContext from "../userContext"; // adjust path if needed

const Nav = () => {
  const { user } = useContext(UserContext); // access the user object

  return (
    <>
      <nav>
        <h1>Navigation</h1>
        <ul>
          <li>
            <Link to="/posts">PLOG</Link>
          </li>
          <li>
            {user ? (
              <Link to={`/user/${user.username}`}>{user.username}</Link>
            ) : (
              <Link to="/user/login">Log In</Link>
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;
