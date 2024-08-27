const db = require("../config/db");

const PurchaseOrder = {
  create: (data, callback) => {
    const query =
      "INSERT INTO PurchaseOrders (product_id, quantity, order_date, status) VALUES (?, ?, ?, ?);";
    
    // Validate data before querying if needed
    const { product_id, quantity, order_date, status } = data;
    if (!product_id || !quantity || !order_date || !status) {
      return callback(new Error("Missing required fields"), null);
    }

    db.query(
      query,
      [product_id, quantity, order_date, status],
      (err, results) => {
        if (err) {
          console.error("Database query error:", err);
          return callback(err, null);
        }
        callback(null, results); // Pass results to callback
      }
    );
  },
};

module.exports = PurchaseOrder;
