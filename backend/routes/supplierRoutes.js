const express = require("express");
const router = express.Router();
const suppliersController = require("../controllers/supplierController");

router.post("/createsupplier", suppliersController.createSupplier);
router.get("/Allsuppliers", suppliersController.getAllSuppliers);
router.get("/supplier/:id", suppliersController.getSupplierById);
router.put("/update/:id", suppliersController.updateSupplier);
router.delete("/delete/:id", suppliersController.deleteSupplier);

module.exports = router;
