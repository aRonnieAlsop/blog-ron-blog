const mongoose = require("mongoose");
const Blog = require("../models/Blog");
const dotenv = require("dotenv");

dotenv.config();

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace spaces and special characters with hyphens
    .replace(/(^-|-$)/g, '');   // Remove leading/trailing hyphens
};

const updateSlugs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const blogs = await Blog.find();

    for (const blog of blogs) {
      if (!blog.slug) {
        blog.slug = generateSlug(blog.title);
        await blog.save();
        console.log(`Updated slug for blog: ${blog.title}`);
      }
    }

    console.log("Slugs updated successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error updating slugs:", err);
    mongoose.disconnect();
  }
};

updateSlugs();
