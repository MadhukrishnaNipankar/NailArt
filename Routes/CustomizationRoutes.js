// backend/routes/uploadRoutes.js
const express = require("express");
const router = express.Router();
const createImageUpload = require("../Utilities/FileUpload");
const userControllers = require("../Controllers/UserControllers/UserAuthController");

const {
  submitCustomisationRequest,
  getAllCustomisationRequests,
  getMyCustomisationRequests,
} = require("../Controllers/CustomisationControllers/CustomisationController");

const upload = createImageUpload("uploads/images"); // custom folder for images

// Route to handle customisation submission with image upload
router.post(
  "/",
  userControllers.protect,
  upload.single("image"),
  submitCustomisationRequest
);
// admin
router.get("/all", userControllers.protect, getAllCustomisationRequests);

// user
router.get("/", userControllers.protect, getMyCustomisationRequests);

module.exports = router;
