import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Delete from "./Delete";
import Logout from "./Logout";

import UserContext from "../userContext";
const User = () => {
  const { username } = useParams(); // get username from URL
  const { user } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user?.username === username) {
        try {
          const PostResp = await axios.get(
            "http://localhost:4000/posts/user/" + username,
          );
          setUserPosts(PostResp.data);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      } else {
        try {
          const PostResp = await axios.get(
            "http://localhost:4000/posts/user/" + username,
            {
              params: {
                published: true,
              },
            }
          );
          setUserPosts(PostResp.data);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      }
    };

    fetchUserPosts();
  }, [username]); //do i need to use useEffect?

  return (
    <div>
      <h1>{username}'s Profile</h1>
      {user?.username === username && (
        <>
          <Logout username={user.username} />
          <Link to={`/user/${user.username}/edit`}>Edit</Link>
          <Delete username={user.username} />
        </>
      )}
      <h2>{username}'s Posts</h2>
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
