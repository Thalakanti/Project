const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/Allusers", userController.getAllUsers);
router.get("/user/:id", userController.getUserById);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/role/:role", userController.getUserByRole);

module.exports = router;
