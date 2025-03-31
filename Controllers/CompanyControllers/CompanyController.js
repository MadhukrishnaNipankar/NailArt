const Company = require("../../Models/CompanySchema");
const mongoose = require("mongoose");

// Create a new company
exports.createCompany = async (req, res) => {
  try {
    const { name, description, type } = req.body;

    // Check for uniqueness of name
    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
      return res.status(400).json({
        error: true,
        errorMessage: `A company with the name '${name}' already exists.`,
      });
    }

    // Create the company document
    const companyDocument = new Company({
      name,
      description,
      type,
    });

    // Save the document
    await companyDocument.save();

    // Return success response
    return res.status(201).json({
      error: false,
      data: {
        id: companyDocument._id,
        name: companyDocument.name,
        description: companyDocument.description,
        logo: companyDocument.logo,
        type: companyDocument.type,
      },
    });
  } catch (err) {
    console.error(err); // Log the error for debugging

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
      return res.status(400).json({
        error: true,
        errorMessage: errors,
      });
    }

    // Handle general errors
    return res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred.",
      details: err.message,
    });
  }
};

// Get All the Companies
exports.getAllCompanies = async (req, res) => {
  try {
    // Fetch all companies from the database
    const companies = await Company.find({});

    // Check if no companies are found
    if (companies.length === 0) {
      return res.status(404).json({
        error: true,
        errorMessage: "No companies found.",
      });
    }

    // Return success response
    return res.status(200).json({
      error: false,
      data: companies.map((company) => ({
        id: company._id,
        name: company.name,
        description: company.description,
        logo: company.logo,
        type: company.type,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
      })),
    });
  } catch (err) {
    console.error(err); // Log the error for debugging

    // Handle general errors
    return res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred.",
      details: err.message,
    });
  }
};

// Get company by id
exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Convert the string to an ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Fetch the company by `object id` field from the database
    const company = await Company.findById(objectId);

    // Check if the company is not found
    if (!company) {
      return res.status(404).json({
        error: true,
        errorMessage: `Company with ID '${id}' not found.`,
      });
    }

    // Return success response
    return res.status(200).json({
      error: false,
      data: {
        id: company._id,
        name: company.name,
        description: company.description,
        logo: company.logo,
        type: company.type,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
      },
    });
  } catch (err) {
    console.error(err); // Log the error for debugging

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
      return res.status(400).json({
        error: true,
        errorMessage: errors,
      });
    }

    // Handle general errors
    return res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred.",
      details: err.message,
    });
  }
};

//Update company by id
exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const objectId = new mongoose.Types.ObjectId(id);

    if (updateFields.logo) {
      return res.status(400).json({
        error: true,
        errorMessage: `logo cannot be updated from this endpoint`,
      });
    }

    // Fetch the company by objectId
    const company = await Company.findById(objectId);

    // Check if the company is not found
    if (!company) {
      return res.status(404).json({
        error: true,
        errorMessage: `Company with ID '${id}' not found.`,
      });
    }

    // Update the company details
    Object.keys(updateFields).forEach((key) => {
      company[key] = updateFields[key];
    });

    // Re-run validation on the updated document
    const validationErrors = company.validateSync();
    if (validationErrors) {
      const errors = Object.values(validationErrors.errors)
        .map((e) => e.message)
        .join(", ");
      return res.status(400).json({
        error: true,
        errorMessage: errors,
      });
    }

    // Save the updated company document
    await company.save();

    // Return success response
    return res.status(200).json({
      error: false,
      data: {
        id: company._id,
        name: company.name,
        description: company.description,
        logo: company.logo,
        type: company.type,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
      },
    });
  } catch (err) {
    console.error(err); // Log the error for debugging

    // Handle invalid ObjectId format
    if (err.kind === "ObjectId") {
      return res.status(400).json({
        error: true,
        errorMessage: "Invalid ID format provided.",
      });
    }

    // Handle general errors
    return res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred.",
      details: err.message,
    });
  }
};

// Delete company by id
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    // Convert the string to an ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Fetch the company by object `id` field from the database
    const company = await Company.findByIdAndDelete(objectId);

    // Check if the company is not found
    if (!company) {
      return res.status(404).json({
        error: true,
        errorMessage: `Company with ID '${id}' not found.`,
      });
    }
    // Delete all jobs related to this company
    await Job.deleteMany({ companyId: objectId });

    // Return success response
    return res.status(200).json({
      error: false,
      errorMessage: `Company with ID '${id}' successfully deleted.`,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging

    // Handle general errors
    return res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred.",
      details: err.message,
    });
  }
};
