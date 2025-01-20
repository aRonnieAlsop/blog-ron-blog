const express = require("express");
const Blog = require("../models/Blog");
const { validateId } = require('../middleware'); 
const router = express.Router();

// Fetch all blog posts
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

// API route to fetch a single blog post by ID
router.get('/blogs/:id', validateId, (req, res) => {  
  const { id } = req.params;
  const query = 'SELECT * FROM blog_posts WHERE id = ?';
  db.get(query, [id], (err, row) => {
      if (err) {
          console.error('Error fetching the blog post:', err.message);
          res.status(500).send('Error fetching the blog post');
      } else if (!row) {
          res.status(404).send('Blog post not found');
      } else {
          res.json(row); // Send the blog post
      }
  });
});

module.exports = router;
