const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/movies.db');

// Create table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS movies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      release_date DATE NOT NULL,
      date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM movies', [], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },

  create: (movie) => {
    return new Promise((resolve, reject) => {
      const { title, description, release_date } = movie;
      db.run(
        `INSERT INTO movies (title, description, release_date) VALUES (?, ?, ?)`,
        [title, description, release_date],
        function (err) {
          if (err) reject(err);
          resolve(this.lastID);
        }
      );
    });
  },

  update: (id, movie) => {
    return new Promise((resolve, reject) => {
      const { title, description, release_date } = movie;
      db.run(
        `UPDATE movies SET title = ?, description = ?, release_date = ? WHERE id = ?`,
        [title, description, release_date, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  },

  partialUpdate: (id, updates) => {
    return new Promise((resolve, reject) => {
      const fields = Object.keys(updates)
        .map((key) => `${key} = ?`)
        .join(', ');
      const values = Object.values(updates);
      db.run(
        `UPDATE movies SET ${fields} WHERE id = ?`,
        [...values, id],
        (err) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM movies WHERE id = ?`, [id], (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  },
};
