import React from "react";
import  { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  //add an edit and delete feature for admins

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>
              <h3>{post.author}</h3>
              <h2>{post.title}</h2>
            </div>
            <p>{post.content}</p>
            <Link to={`/posts/${post.id}`}>View Comments</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
