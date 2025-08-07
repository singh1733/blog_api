//display the user's posts and comments
//if the user is the author, allow them to edit or delete their posts

import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import UserContext from "../userContext"; // adjust path if needed

const User = () => {
  const { username } = useParams(); // get username from URL
  const { user } = useContext(UserContext); // access the user object
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (user?.username) {
      const fetchUserPosts = async () => {
        try {
          const PostResp = await axios.get(
            "http://localhost:3000/posts/user/" + user.username,
            {
              withCredentials: true,
            }
          );
          [...PostResp.data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setUserPosts(PostResp.data);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      };

      fetchUserPosts();
    }
  }, [user]); //do i need to use useEffect?

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      {user?.username === username && (
        <>
          <Link to={`/user/${user.username}/update`}>Edit</Link>
          <Link to={`/user/${user.username}/delete`}>Delete</Link>
        </>
      )}
      <h2>Your Posts</h2>
      <ul>
        {userPosts.map((post) => (
          <li key={post.id}>
            <div>
              <h3>{post.author}</h3>
              <h2>{post.title}</h2>
            </div>
            <p>{post.content}</p>
            <Link to={`/posts/${post.id}`}>View Post</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
