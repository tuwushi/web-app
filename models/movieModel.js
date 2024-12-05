const Database = require('better-sqlite3');
const db = new Database('./db/movies.db', { verbose: console.log });

// Create table if not exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).run();

module.exports = {
  getAll: () => {
    return db.prepare('SELECT * FROM movies').all();
  },

  create: (movie) => {
    const { title, description, release_date } = movie;
    const stmt = db.prepare('INSERT INTO movies (title, description, release_date) VALUES (?, ?, ?)');
    const info = stmt.run(title, description, release_date);
    return info.lastInsertRowid;
  },

  update: (id, movie) => {
    const { title, description, release_date } = movie;
    const stmt = db.prepare('UPDATE movies SET title = ?, description = ?, release_date = ? WHERE id = ?');
    stmt.run(title, description, release_date, id);
  },

  partialUpdate: (id, updates) => {
    const fields = Object.keys(updates).map((key) => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    const stmt = db.prepare(`UPDATE movies SET ${fields} WHERE id = ?`);
    stmt.run(...values, id);
  },

  delete: (id) => {
    const stmt = db.prepare('DELETE FROM movies WHERE id = ?');
    stmt.run(id);
  },
};