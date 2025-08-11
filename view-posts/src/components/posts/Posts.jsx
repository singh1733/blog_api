import React from "react";
import { useEffect, useContext, useState } from "react";
import UserContext from "../userContext";
import axios from "axios";
import { Link } from "react-router-dom";



const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch single post data
        const postRes = await axios.get(
          `http://localhost:4000/posts`,
          {
            withCredentials: true,
            params: {
              published: true,       
            }

          }
        );
        setPosts(postRes.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {user?.role === "ADMIN" && (
        <Link to="/posts/create">Create New Post</Link>
      )}
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
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

export default Posts;
