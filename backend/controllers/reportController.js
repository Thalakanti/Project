const Report = require("../models/reportModel");
const redis = require("../config/redisClient");
// Get total stock value
// Get total stock value
exports.getTotalStockValue = async (req, res) => {
  const cacheKey = 'total_stock_value';

  try {
    // Check Redis cache first
    redis.get(cacheKey, async (cacheErr, cachedValue) => {
      if (cacheErr) {
        console.error('Cache read error:', cacheErr);
        return res.status(500).json({ message: "Server error" });
      }

      if (cachedValue) {
        // If cache hit, return cached data
        return res.status(200).json({
          success: true,
          data: JSON.parse(cachedValue),
          message: "Total stock value retrieved from cache",
        });
      }

      // If cache miss, fetch from database
      Report.getTotalStockValue((err, stockValue) => {
        if (err) {
          return res.status(500).json({ message: "Error fetching stock value" });
        }

        // Store result in Redis cache
        redis.set(cacheKey, JSON.stringify(stockValue), 'EX', 3600, (cacheSetErr) => {
          if (cacheSetErr) {
            console.error('Failed to update cache:', cacheSetErr);
          }
        });

        res.status(200).json({
          success: true,
          data: stockValue,
          message: "Total stock value retrieved",
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get most sold products
exports.getMostSoldProducts = async (req, res) => {
  const cacheKey = 'most_sold_products';

  try {
    // Check Redis cache first
    redis.get(cacheKey, async (cacheErr, cachedProducts) => {
      if (cacheErr) {
        console.error('Cache read error:', cacheErr);
        return res.status(500).json({ message: "Server error" });
      }

      if (cachedProducts) {
        // If cache hit, return cached data
        return res.status(200).json({
          success: true,
          data: JSON.parse(cachedProducts),
          message: "Most sold products retrieved from cache",
        });
      }

      // If cache miss, fetch from database
      Report.getMostSoldProducts((err, mostSoldProducts) => {
        if (err) {
          return res.status(500).json({ message: "Error fetching most sold products" });
        }

        // Store result in Redis cache
        redis.set(cacheKey, JSON.stringify(mostSoldProducts), 'EX', 3600, (cacheSetErr) => {
          if (cacheSetErr) {
            console.error('Failed to update cache:', cacheSetErr);
          }
        });

        res.status(200).json({
          success: true,
          data: mostSoldProducts,
          message: "Most sold products retrieved",
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Get least sold products
exports.getLeastSoldProducts = async (req, res) => {
  const cacheKey = 'least_sold_products';

  try {
    // Check Redis cache first
    redis.get(cacheKey, async (cacheErr, cachedProducts) => {
      if (cacheErr) {
        console.error('Cache read error:', cacheErr);
        return res.status(500).json({ message: "Server error" });
      }

      if (cachedProducts) {
        // If cache hit, return cached data
        return res.status(200).json({
          success: true,
          data: JSON.parse(cachedProducts),
          message: "Least sold products retrieved from cache",
        });
      }

      // If cache miss, fetch from database
      Report.getLeastSoldProducts((err, leastSoldProducts) => {
        if (err) {
          return res.status(500).json({ message: "Error fetching least sold products" });
        }

        // Store result in Redis cache
        redis.set(cacheKey, JSON.stringify(leastSoldProducts), 'EX', 3600, (cacheSetErr) => {
          if (cacheSetErr) {
            console.error('Failed to update cache:', cacheSetErr);
          }
        });

        res.status(200).json({
          success: true,
          data: leastSoldProducts,
          message: "Least sold products retrieved",
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
