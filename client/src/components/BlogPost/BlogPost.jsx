import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams(); // Extract the ID from the route
  const [blogPost, setBlogPost] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blogs/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found.');
          }
          throw new Error('Failed to fetch the blog post');
        }
        const data = await response.json();
        setBlogPost(data); // Store the entire blog post
      } catch (err) {
        console.error('Error fetching the blog post:', err);
        setError("It's not you, it's me. Please try again later.");
      }
    };

    fetchBlogPost();
  }, [API_URL, id]);

  // Update page title dynamically
  useEffect(() => {
    if (blogPost) {
      document.title = blogPost.title;
    }
  }, [blogPost]);

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops!</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!blogPost) {
    return <div className="loading">Loading blog post...</div>;
  }

  return (
    <div className="blog-post-container">
      <h1 className="blog-title">{blogPost.title}</h1>
      <div className="blog-meta">
        <p className="blog-date">{new Date(blogPost.createdAt).toLocaleDateString()}</p>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: blogPost.blog_content }}
        className="blog-post-content"
      />
    </div>
  );
};

export default BlogPost;
