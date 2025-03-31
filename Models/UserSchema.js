const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Centralized regex patterns for validation
const REGEX = {
  USERNAME: /^[a-zA-Z0-9_.-]+$/, // Allow letters, numbers, underscores, dots, and hyphens
  PASSWORD: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
  EMAIL: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, // Basic email validation
  PHONE: /^\d{10}$/, // 10-digit phone number validation
};

// User schema definition
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Full name must be at least 3 characters long"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      minlength: [10, "Address must be at least 10 characters long"],
      maxlength: [200, "Address cannot exceed 200 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [REGEX.EMAIL, "Please enter a valid email address"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      match: [REGEX.PHONE, "Phone number must be a 10-digit number"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [5, "Username must be at least 5 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      index: true, // Optimized for querying
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [4, "Password must be at least 4 characters long"],
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["User", "Admin"],
        message: "Role must be either 'User' or 'Admin'",
      },
      default: "User", // Default role
    },
  },
  { timestamps: true }
);

// Middleware: Hash password before saving
userSchema.pre("save", async function (next) {
  try {
    // If password is not modified, skip hashing
    if (!this.isModified("password")) return next();

    // Hash password with bcrypt
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (err) {
    next(err); // Propagate error to caller
  }
});

// Method: Compare passwords
userSchema.methods.correctPassword = async function (
  candidatePassword,
  actualPassword
) {
  return await bcrypt.compare(candidatePassword, actualPassword);
};

// Modular Export of the User Model
const User = mongoose.model("User", userSchema);

module.exports = User;
