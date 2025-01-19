const express = require("express");
const Blog = require("../models/Blog");

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

// Create a new blog post
router.post("/", async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog post" });
  }
});

module.exports = router;
