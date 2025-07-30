//display the user's posts and comments
//if the user is the author, allow them to edit or delete their posts

import React, { useContext } from "react";
import UserContext from "../userContext"; // adjust path if needed


const User = () => {
  const { user } = useContext(UserContext); // access the user object

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      <p>Email: {user.email}</p>
      <h2>Your Posts</h2>
      {/* Display user's posts here */}
      {/* Add edit and delete functionality for user's posts */}
    </div>
  );
}

export default User;