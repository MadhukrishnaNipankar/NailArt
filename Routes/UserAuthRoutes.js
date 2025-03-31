const express = require("express");
const router = express.Router();
const userAuthController = require("../Controllers/UserControllers/UserAuthController");

// User registration
router.post("/register", userAuthController.register);

// User login
router.post("/login", userAuthController.login);

// Change password
router.post(
  "/change-password",
  userAuthController.protect,
  userAuthController.changePassword
);

// Update User
router.patch("/", userAuthController.protect, userAuthController.updateUser);

// Get User Account
router.get("/", userAuthController.protect, userAuthController.getUserAccount);

module.exports = router;
