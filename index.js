const fs = require('fs');
const path = require('path'); // Make sure this is declared before using path
const sqlite3 = require('sqlite3');

// Define dbPath with the correct path to your SQLite database
const dbPath = path.join(__dirname, 'db', 'movie-database.sqlite'); // Adjust the path and filename as needed

// Check if the database file exists
if (!fs.existsSync(dbPath)) {
    console.error('Database file not found!');
    // Optionally create the database or handle the error
} else {
    const db = new sqlite3.Database(dbPath);
    // Additional code to interact with the database...
}

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'views')));

// API routes
const movieRoutes = require('./routes/movies');
app.use('/api/movies', movieRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});