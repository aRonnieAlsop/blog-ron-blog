const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const blogRoutes = require("./routes/blogRoutes");
const path = require('path');  // This is correct, no need to install.

dotenv.config();  // Load environment variables

const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;  // Ensure default port if not provided by Heroku

// Middleware 
app.use(cors({ origin: ''})); // CORS enable
app.use(express.json()); // Parse JSON payloads

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/blogs", blogRoutes);


// Fallback route for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
