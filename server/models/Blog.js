const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  customId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  title: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String, // A short summary of the blog post
    required: false,
  },
  blog_content: {
    type: String,
    required: true, // Full content of the blog post
  },
  image_url: {
    type: String,
    required: false, // URL of the blog post's image
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
