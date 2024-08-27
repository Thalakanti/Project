const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/create", productController.create);
router.get("/Allproducts", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.get("/name/:name", productController.getProductByName);
module.exports = router;
