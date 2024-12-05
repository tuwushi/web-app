const path = require('path');
const db = new sqlite3.Database(path.join(__dirname, 'db', 'mydatabase.db'));
const fs = require('fs');
const dbPath = path.join(__dirname, 'db', 'mydatabase.db');

if (!fs.existsSync(dbPath)) {
    console.error('Database file not found!');
    // Optionally create the database or handle the error
} else {
    const db = new sqlite3.Database(dbPath);
}
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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