const db = require("../config/db");

const Supplier = {
  create: (data, callback) => {
    const query =
      "INSERT INTO suppliers (product_id, supplier_name, supplier_contact_email, supplier_phone, supplier_address) VALUES (?, ?, ?, ?, ?);";
    db.query(
      query,
      [
        data.product_id, // Ensure product_id is a valid column in the suppliers table
        data.supplier_name,
        data.supplier_contact_email,
        data.supplier_phone,
        data.supplier_address,
      ],
      callback
    );
  },

  readAll: (callback) => {
    const query = "SELECT * FROM suppliers";
    db.query(query, callback);
  },

  readById: (id, callback) => {
    const query = "SELECT * FROM suppliers WHERE id = ?";
    db.query(query, [id], callback);
  },

  update: (id, data, callback) => {
    const query =
      "UPDATE suppliers SET product_id = ?, supplier_name = ?, supplier_contact_email = ?, supplier_phone = ?, supplier_address = ? WHERE id = ?;";
    db.query(
      query,
      [
        data.product_id,
        data.supplier_name,
        data.supplier_contact_email,
        data.supplier_phone,
        data.supplier_address,
        id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    const query = "DELETE FROM suppliers WHERE id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = Supplier;
