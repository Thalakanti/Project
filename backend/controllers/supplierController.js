const Supplier = require("../models/supplierModel");
const redis = require("../config/redisClient");

// Create a new supplier
exports.createSupplier = async (req, res) => {
  const { product_id, supplier_name, supplier_contact_email, supplier_phone, supplier_address } = req.body;
  try {
    Supplier.create(
      { product_id, supplier_name, supplier_contact_email, supplier_phone, supplier_address },
      async (err, supplier) => {
        if (err) {
          return res.status(500).json({ success: false, message: err.message });
        }

        // Invalidate cache for all suppliers
        redis.del('all_suppliers');

        res.status(201).json({
          success: true,
          message: "Supplier created successfully",
          data: supplier,
        });
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  const cacheKey = 'all_suppliers';

  try {
    // Check Redis cache first
    redis.get(cacheKey, async (cacheErr, cachedSuppliers) => {
      if (cacheErr) {
        console.error('Cache read error:', cacheErr);
        return res.status(500).json({ message: "Server error" });
      }

      if (cachedSuppliers) {
        // If cache hit, return cached data
        return res.status(200).json({
          success: true,
          message: "All suppliers retrieved from cache",
          data: JSON.parse(cachedSuppliers),
        });
      }

      // If cache miss, fetch from database
      Supplier.readAll((err, suppliers) => {
        if (err) {
          return res.status(500).json({ success: false, message: err.message });
        }

        // Store result in Redis cache
        redis.set(cacheKey, JSON.stringify(suppliers), 'EX', 3600, (cacheSetErr) => {
          if (cacheSetErr) {
            console.error('Failed to update cache:', cacheSetErr);
          }
        });

        res.status(200).json({
          success: true,
          message: "All suppliers retrieved successfully",
          data: suppliers,
        });
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSupplierById = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `supplier:${id}`;

  try {
    // Check Redis cache first
    redis.get(cacheKey, async (cacheErr, cachedSupplier) => {
      if (cacheErr) {
        console.error('Cache read error:', cacheErr);
        return res.status(500).json({ message: "Server error" });
      }

      if (cachedSupplier) {
        // If cache hit, return cached data
        return res.status(200).json({
          success: true,
          message: "Supplier retrieved from cache",
          data: JSON.parse(cachedSupplier),
        });
      }

      // If cache miss, fetch from database
      Supplier.readById(id, (err, supplier) => {
        if (err) {
          return res.status(500).json({ success: false, message: err.message });
        }

        // Store result in Redis cache
        redis.set(cacheKey, JSON.stringify(supplier), 'EX', 3600, (cacheSetErr) => {
          if (cacheSetErr) {
            console.error('Failed to update cache:', cacheSetErr);
          }
        });

        res.status(200).json({
          success: true,
          message: "Supplier retrieved successfully",
          data: supplier,
        });
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateSupplier = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const cacheKey = `supplier:${id}`;

  try {
    Supplier.update(id, body, async (err, supplier) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message });
      }

      // Invalidate the cache for this supplier
      redis.del(cacheKey);

      // Invalidate cache for all suppliers
      redis.del('all_suppliers');

      res.status(200).json({
        success: true,
        data: supplier,
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.deleteSupplier = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `supplier:${id}`;

  try {
    Supplier.delete(id, async (err, supplier) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      // Invalidate the cache for this supplier
      redis.del(cacheKey);

      // Invalidate cache for all suppliers
      redis.del('all_suppliers');

      res.status(200).json({
        success: true,
        data: supplier,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// Get supplier by name
exports.getSupplierByName = async (req, res) => {
  const { supplier_name } = req.body;
  const cacheKey = `supplier_by_name:${supplier_name}`;

  try {
    // Check Redis cache first
    redis.get(cacheKey, async (cacheErr, cachedSupplier) => {
      if (cacheErr) {
        console.error('Cache read error:', cacheErr);
        return res.status(500).json({ message: "Server error" });
      }

      if (cachedSupplier) {
        // If cache hit, return cached data
        return res.status(200).json({
          success: true,
          message: "Supplier retrieved from cache",
          data: JSON.parse(cachedSupplier),
        });
      }

      // If cache miss, fetch from database
      Supplier.readByName(supplier_name, (err, supplier) => {
        if (err) {
          return res.status(500).json({ success: false, message: err.message });
        }

        // Store result in Redis cache
        redis.set(cacheKey, JSON.stringify(supplier), 'EX', 3600, (cacheSetErr) => {
          if (cacheSetErr) {
            console.error('Failed to update cache:', cacheSetErr);
          }
        });

        res.status(200).json({
          success: true,
          message: "Supplier retrieved successfully",
          data: supplier,
        });
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};