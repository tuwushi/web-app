const Movie = require('../models/movieModel'); // Import the movie model

// Fetch all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.getAll();
    res.json(movies);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create a new movie
exports.createMovie = async (req, res) => {
  try {
    const { title, description, release_date } = req.body;
    await Movie.create({ title, description, release_date });
    res.status(201).send('Movie created successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, release_date } = req.body;
    await Movie.update(id, { title, description, release_date });
    res.send('Movie updated successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Partially update a movie
exports.partialUpdateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    await Movie.partialUpdate(id, updates);
    res.send('Movie partially updated successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.delete(id);
    res.send('Movie deleted successfully.');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
