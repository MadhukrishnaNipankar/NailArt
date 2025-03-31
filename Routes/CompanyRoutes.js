const express = require("express");
const router = express.Router();
const companyController = require("../Controllers/CompanyControllers/CompanyController");
const userControllers = require("../Controllers/UserControllers/UserAuthController");

// Create a new company:allowedRoles:Admin
router.post("/", userControllers.protect, companyController.createCompany);

// Retrieve all companies
router.get("/", userControllers.protect, companyController.getAllCompanies);

// Retrieve a specific company by ID
router.get("/:id", userControllers.protect, companyController.getCompanyById);

// Update a company by ID
router.patch("/:id", companyController.updateCompany);

// Delete a company by ID
router.delete("/:id", userControllers.protect, companyController.deleteCompany);

module.exports = router;
