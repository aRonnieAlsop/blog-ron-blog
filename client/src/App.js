import React, { useEffect, useState } from "react";
import API from "./api";

const App = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.get("/posts"); 
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>My Blog</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>No blog posts available.</p>
      )}
    </div>
  );
};

export default App;
