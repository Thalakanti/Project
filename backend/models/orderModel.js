const db = require("../config/db");

const Order = {
  create: (data, callback) => {
    const query =
      "INSERT INTO orders (product_id, quantity, order_date, status) VALUES (?, ?, ?, ?);";
    db.query(
      query,
      [
        data.product_id,
        data.quantity,
        data.order_date,
        data.status, // Corrected to match the number of placeholders
      ],
      callback
    );
  },

  readAll: (callback) => {
    const query = "SELECT * FROM orders";
    db.query(query, callback);
  },

  readById: (id, callback) => {
    const query = "SELECT * FROM orders WHERE id=?";
    db.query(query, [id], callback);
  },

  update: (id, data, callback) => {
    const query =
      "UPDATE orders SET product_id=?, quantity=?, order_date=?, status=? WHERE id=?;";
    db.query(
      query,
      [
        data.product_id,
        data.quantity,
        data.order_date,
        data.status, // Corrected to match the number of placeholders
        id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    const query = "DELETE FROM orders WHERE id=?";
    db.query(query, [id], callback);
  },
};

module.exports = Order;
