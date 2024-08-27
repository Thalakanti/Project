// All the queries and operations live here

const db = require("../config/db");

// My user object would be a collection of SQL operations that can be utilized by the controller
const User = {
  create: (data, callback) => {
    const query =
      "INSERT INTO users (username, email, role, password_hash) VALUES (?, ?, ?, ?);";
    db.query(
      query,
      [data.username, data.email, data.role, data.password_hash],
      callback
    );
  },

  findAll: (callback) => {
    const query = "SELECT * FROM users;";
    db.query(query, callback);
  },

  findById: (id, callback) => {
    const query = "SELECT * FROM users WHERE id = ?;";
    db.query(query, [id], callback);
  },

  findByRole: (role, callback) => {
    const query = "SELECT * FROM users WHERE role = ?;";
    db.query(query, [role], (err, results) => {
      if (err) {
        return callback(err, null); // Fixed 'nul' to 'null'
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      callback(null, results);
    });
  },

  findByUsername: (username, callback) => {
    const query = "SELECT * FROM users WHERE username = ?;";
    db.query(query, [username], (err, results) => {
      if (err) {
        return callback(err, null); // Fixed 'nul' to 'null'
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      callback(null, results[0]);
    });
  },

  update: (id, data, callback) => {
    const query =
      "UPDATE users SET username = ?, email = ?, role = ?, password_hash = ? WHERE id = ?;";
    db.query(
      query,
      [data.username, data.email, data.role, data.password_hash, id],
      callback
    );
  },

  delete: (id, callback) => {
    const query = "DELETE FROM users WHERE id = ?;";
    db.query(query, [id], callback);
  },
};

module.exports = User;
