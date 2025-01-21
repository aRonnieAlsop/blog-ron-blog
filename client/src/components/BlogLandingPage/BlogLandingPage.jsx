import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BlogLandingPage.css';

const BlogLandingPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // Fetch blog posts from the backend
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`)
      .then(response => {
        setBlogPosts(response.data);  // Set blog data in state
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
      });
  }, []);

  // Open modal with the selected post
  const openModal = (postId) => {
    const post = blogPosts.find(post => post._id === postId);
    setSelectedPost(post);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  return (
    <div className="blog-container">
      <div className="title-wrapper">
        <h1 className="blog-page-title">A Blog</h1>
      </div>
      <div className="blog-posts">
        {blogPosts.map((post) => (
          <div key={post._id} className="blog-post">
            <img src={post.image_url} alt={post.title} className="blog-image" />
            <p className="blog-post-date">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
            <h2>{post.title}</h2>
            <p className="blog-post-content">
              {post.synopsis || `${post.blog_content.slice(0, 100)}...`}
            </p>
            {/* Button to open the modal */}
            <button 
              className="read-more-button"
              onClick={() => openModal(post._id)}
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* Modal for full blog content */}
      {showModal && selectedPost && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={closeModal}>
              X
            </button>
            <h1 className="post-title">{selectedPost.title}</h1>
            <p className="post-date">{new Date(selectedPost.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</p>
            <div dangerouslySetInnerHTML={{ __html: selectedPost.blog_content }} />
            <div class="article-footer">
  <p className="post-author">Written by Arron Alsop</p>
</div>

          </div>
        </div>
      )}
    </div>
  );
};

export default BlogLandingPage;
