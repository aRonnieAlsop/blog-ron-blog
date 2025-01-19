const express = require("express");
const mongoose = require("mongoose");
if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({ error: "Invalid blog post ID" });
}

const dotenv = require("dotenv");
const postRoutes = require("./routes/postRoutes");
const blogRoutes = require("./routes/blogRoutes");

dotenv.config();

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

// Middleware 
app.use(cors()); //CORS enable
app.use(express.json()); // Parse JSON payloads

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/blogs", blogRoutes);

// Fallback route for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
