const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/createOrder", orderController.createOrder);
router.get("/Allorders", orderController.getAllOrders);
router.get("/order/:id", orderController.getOrderById);
router.put("/update-status/:id", orderController.updateOrderStatus);
router.delete("/delete/:id", orderController.deleteOrder);

module.exports = router;
