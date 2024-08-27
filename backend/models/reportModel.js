const db = require("../config/db");

const Report = {
  getTotalStockValue: (callback) => {
    const query = `
      SELECT SUM(p.current_stock * p.price) AS total_stock_value 
      FROM Product p;
    `;
    db.query(query, callback);
  },

  getMostSoldProducts: (callback) => {
    const query = `
      SELECT p.name, SUM(o.quantity) AS total_sold 
      FROM Orders o 
      JOIN Product p ON o.product_id = p.id 
      GROUP BY p.id 
      ORDER BY total_sold DESC 
      LIMIT 10;
    `;
    db.query(query, callback);
  },

  getLeastSoldProducts: (callback) => {
    const query = `
      SELECT p.name, SUM(o.quantity) AS total_sold 
      FROM Orders o 
      JOIN Product p ON o.product_id = p.id 
      GROUP BY p.id 
      ORDER BY total_sold ASC 
      LIMIT 10;
    `;
    db.query(query, callback);
  },
};

module.exports = Report;
