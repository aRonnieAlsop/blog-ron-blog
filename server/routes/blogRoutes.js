const express = require("express");
const Blog = require("../models/Blog");
// const { validateId } = require('../middleware'); 
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

// Get a single blog by customId
router.get('/:customId', async (req, res) => {
  try {
    const blog = await Blog.findOne({ customId: req.params.customId });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
