const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Define routes for CRUD operations
router.get('/', movieController.getAllMovies);      // Fetch all movies
router.post('/', movieController.createMovie);      // Add a new movie
router.put('/:id', movieController.updateMovie);    // Update an existing movie
router.patch('/:id', movieController.partialUpdateMovie); // Partially update a movie
router.delete('/:id', movieController.deleteMovie); // Delete a movie

module.exports = router;
