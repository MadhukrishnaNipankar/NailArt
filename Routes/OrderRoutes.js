const express = require("express");
const router = express.Router();
const orderControllers = require("../Controllers/OrderControllers/OrderController");
const userControllers = require("../Controllers/UserControllers/UserAuthController");

// Create a new order:allowedRoles:Admin
router.post("/", userControllers.protect, orderControllers.createOrder);

// Get My Order:allowedRoles:User
router.get("/orders", userControllers.protect, orderControllers.getMyOrders);

// Get all orders:allowedRoles:Admin
router.get(
  "/orders/all",
  userControllers.protect,
  orderControllers.getAllOrders
);

module.exports = router;
