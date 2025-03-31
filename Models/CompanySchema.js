const mongoose = require("mongoose");
const validator = require("validator");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    logo: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => validator.isURL(value),
        message: "Invalid logo URL format",
      },
      default:
        "https://png.pngtree.com/png-clipart/20200727/original/pngtree-real-estate-logo-design-template-building-logo-png-image_5137696.jpg",
    },
    type: {
      type: String,
      required: true,
      enum: {
        values: ["Product Based", "Service Based", "Core Company", "Other"],
        message:
          "Type must be one of the following: 'Product Based', 'Service Based', 'Core Company', or 'Other'",
      },
      default: "Other",
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
