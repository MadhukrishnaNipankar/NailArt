const Customisation = require("../../Models/CustomisationSchema");
const path = require("path");
const fs = require("fs");

exports.submitCustomisationRequest = async (req, res) => {
  try {
    const { color, shape, length, description } = req.body; // Ensure 'user' is coming from the authenticated user session
    const { file } = req; // Multer handles the uploaded image file
    const user = req.user.id;

    // Ensure all required fields are provided
    const requiredFields = { color, shape, length, description, user };
    const missingFields = Object.keys(requiredFields).filter(
      (key) => !requiredFields[key]
    );

    if (missingFields.length) {
      return res.status(400).json({
        error: true,
        errorMessage: `Missing fields: ${missingFields.join(", ")}`,
      });
    }

    // Check if the file exists and generate the image URL
    if (!file) {
      return res.status(400).json({
        error: true,
        errorMessage: "Image file is required.",
      });
    }

    // Generate the image URL (relative path)
    const imageUrl = `/uploads/images/${file.filename}`;

    // Create the new customisation document
    const newCustomisation = new Customisation({
      user,
      color,
      shape,
      length,
      description,
      imageUrl,
    });

    // Save to the database and validate
    try {
      await newCustomisation.validate(); // This triggers Mongoose validation before saving
    } catch (validationError) {
      const validationMessages = validationError.errors;
      const errorMessages = [];

      // Loop through the validation errors and extract relevant error messages
      for (const field in validationMessages) {
        const fieldError = validationMessages[field];
        errorMessages.push(`${field}: ${fieldError.message}`);
      }

      return res.status(400).json({
        error: true,
        errorMessage: errorMessages.join(", "),
      });
    }

    // Save to the database after validation passes
    await newCustomisation.save();

    return res.status(201).json({
      error: false,
      message: "Customisation request submitted successfully.",
      data: newCustomisation,
    });
  } catch (err) {
    console.error("Error while submitting customisation request:", err.message);
    res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred. Please try again later.",
    });
  }
};

exports.getAllCustomisationRequests = async (req, res) => {
  try {
    // Find all customisation requests and populate the 'user' field
    const customisationRequests = await Customisation.find()
      .populate("user", "-password -createdAt -updatedAt")
      .sort({ createdAt: -1 })
      .exec();

    if (customisationRequests.length === 0) {
      return res.status(404).json({
        error: true,
        errorMessage: "No customisation requests found.",
      });
    }

    // Return all the customisation requests with populated user data
    return res.status(200).json({
      error: false,
      message: "Customisation requests retrieved successfully.",
      data: customisationRequests,
    });
  } catch (err) {
    console.error("Error while fetching customisation requests:", err.message);
    res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred. Please try again later.",
    });
  }
};

exports.getMyCustomisationRequests = async (req, res) => {
  try {
    const userId = req.user.id; // Get the authenticated user's ID from the session

    // Find customisation requests for the current user, populate 'user' field excluding password and timestamps, and sort by createdAt in descending order
    const customisationRequests = await Customisation.find({ user: userId })
      .populate("user", "-password -createdAt -updatedAt") // Exclude password and timestamps from user data
      .sort({ createdAt: -1 }) // Sort by createdAt, latest first
      .exec();

    if (customisationRequests.length === 0) {
      return res.status(404).json({
        error: true,
        errorMessage: "No customisation requests found for your account.",
      });
    }

    // Return customisation requests for the authenticated user with populated user data (excluding password and timestamps)
    return res.status(200).json({
      error: false,
      message: "Your customisation requests retrieved successfully.",
      data: customisationRequests,
    });
  } catch (err) {
    console.error(
      "Error while fetching your customisation requests:",
      err.message
    );
    res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred. Please try again later.",
    });
  }
};
