const express = require("express");
const router = express.Router();

const userAuthController = require("../Controllers/UserControllers/UserAuthController");
const productController = require("../Controllers/ProductControllers/ProductController");

// Get Category Wise Products List
router.get(
  "/:category",
  userAuthController.protect,
  productController.getProductsByCategory
);

// Add New Product
router.post("/", userAuthController.protect, productController.addProduct);

module.exports = router;
