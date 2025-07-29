import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext"; // adjust path if needed

const Nav = () => {
  const { user } = useContext(UserContext); // access the user object

  return (
    <nav>
      <h1>Navigation</h1>
      <ul>
        <li>
          <Link to="/posts">PLOG</Link>
        </li>
        <li>
          {user ? (
            <Link to={`/account/${user.id}`}>{user.username}</Link>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
