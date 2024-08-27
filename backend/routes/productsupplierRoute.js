const express = require("express");
const router = express.Router();
const supplierproductController = require("../controllers/productsupplierController");

// Route to associate a supplier with a product
router.post(
  "/products/suppliers",
  supplierproductController.addSupplierToProduct
);
router.get( "/products/suppliers",
  supplierproductController.getAllProductSuppliers)

// Route to remove a supplier from a product
router.delete(
  "/products/suppliers",
  supplierproductController.removeSupplierFromProduct
);

module.exports = router;
