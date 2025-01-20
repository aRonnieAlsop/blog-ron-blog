const express = require('express');
const router = express.Router();


// Middleware to check if ID is an integer
const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).send('Invalid ID format. ID must be a positive integer.');
  }
  next();
};

module.exports = { validateId };