const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Middleware to check if ID is a valid MongoDB ObjectId
const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid ID format. ID must be a valid MongoDB ObjectId.');
  }
  next();
};

module.exports = { validateId };
