const db = require("../config/db"); // Assuming you have a db configuration file
const PS = require("../models/productsupplierModel");
const redis = require("../config/redisClient");
// Associate a supplier with a product
exports.addSupplierToProduct = async (req, res) => {
  const { productId, supplierId } = req.body;

  try {
    const cacheKey = `product_supplier_${productId}_${supplierId}`;
    // Invalidate the cache entry for this association
    await redis.del(cacheKey);

    // Check if the product exists
    const product = await db.query("SELECT * FROM Product WHERE id = ?", [productId]);
    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the supplier exists
    const supplier = await db.query("SELECT * FROM Suppliers WHERE id = ?", [supplierId]);
    if (supplier.length === 0) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    // Check if the association already exists
    PS.readAll({ productId, supplierId }, async (err, existingAssociation) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      if (existingAssociation.length > 0) {
        return res.status(400).json({ message: "Supplier is already associated with this product" });
      }

      // Insert into ProductSuppliers
      PS.create({ productId, supplierId }, async (err, newAssociation) => {
        if (err) {
          return res.status(500).json({ success: false, message: err.message });
        }

        // Optionally, update the cache with the new association data if needed

        res.status(201).json({
          success: true,
          message: "Supplier associated with product successfully",
          data: newAssociation,
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Remove a supplier from a product
exports.removeSupplierFromProduct = async (req, res) => {
  const { productId, supplierId } = req.body;

  try {
    const cacheKey = `product_supplier_${productId}_${supplierId}`;
    // Invalidate the cache entry for this association
    await redis.del(cacheKey);

    // Delete the association
    PS.delete([productId, supplierId], async (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Association not found" });
      }

      res.status(200).json({
        success: true,
        message: "Supplier removed from product successfully",
        data: result,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all product-supplier associations
exports.getAllProductSuppliers = async (req, res) => {
  const { productId, supplierId } = req.body;
  const cacheKey = `product_supplier_all_${productId}_${supplierId}`;

  try {
    // Check Redis cache first
    redis.get(cacheKey, (cacheErr, cachedData) => {
      if (cacheErr) {
        console.error('Cache read error:', cacheErr);
        return res.status(500).json({ success: false, message: cacheErr.message });
      }

      if (cachedData) {
        // If data is found in cache
        return res.status(200).json({
          success: true,
          message: "Product-supplier associations retrieved successfully from cache",
          data: JSON.parse(cachedData),
        });
      }

      // If data is not found in cache, fetch from database
      PS.readAll({ productId, supplierId }, (dbErr, products_suppliers) => {
        if (dbErr) {
          return res.status(500).json({ success: false, message: dbErr.message });
        }

        // Update Redis cache with the fetched data
        redis.set(cacheKey, JSON.stringify(products_suppliers), (cacheSetErr) => {
          if (cacheSetErr) {
            console.error('Failed to update cache:', cacheSetErr);
          }
        });

        res.status(200).json({
          success: true,
          message: "Product-supplier associations retrieved successfully",
          data: products_suppliers,
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
