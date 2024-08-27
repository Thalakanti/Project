const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => {
  console.log("Redis Client Error", err);
});
client.connect();

exports.getAllUsers = async (req, res) => {
  try {
    const cachedUsers = await client.get("allUsers");
    if (cachedUsers) {
      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully from cache",
        data: JSON.parse(cachedUsers),
      });
    }

    User.findAll(async (err, users) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
      } else {
        await client.set("allUsers", JSON.stringify(users), "EX", 3600); // Cache for 1 hour
        res.status(200).json({
          success: true,
          message: "Users retrieved successfully",
          data: users,
        });
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `user_${id}`;

  try {
    const cachedUser = await client.get(cacheKey);
    if (cachedUser) {
      return res.status(200).json({ success: true, data: JSON.parse(cachedUser) });
    }

    User.findById(id, async (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
      }
      await client.set(cacheKey, JSON.stringify(user), "EX", 3600); // Cache for 1 hour
      res.status(200).json({ success: true, data: user });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const cacheKey = `user_${id}`;

  try {
    User.update(id, body, async (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
      }

      // Invalidate the cache for this user
      await client.del(cacheKey);
      // Optionally invalidate cache for all users
      await client.del("allUsers");

      res.status(200).json({
        success: true,
        data: user,
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const cacheKey = `user_${id}`;

  try {
    User.delete(id, async (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      // Invalidate the cache for this user
      await client.del(cacheKey);
      // Optionally invalidate cache for all users
      await client.del("allUsers");

      res.status(200).json({
        success: true,
        data: user,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.getUserByRole = async (req, res) => {
  const { role } = req.body;
  const cacheKey = `users_by_role_${role}`;

  try {
    const cachedUsers = await client.get(cacheKey);
    if (cachedUsers) {
      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully from cache",
        data: JSON.parse(cachedUsers),
      });
    }

    User.findByRole(role, async (err, users) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      await client.set(cacheKey, JSON.stringify(users), "EX", 3600); // Cache for 1 hour
      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: users,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
