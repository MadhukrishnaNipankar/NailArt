const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../Models/UserSchema");
const { promisify } = require("util");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        error: true,
        errorMessage: "Please provide both username and password.",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(401).json({
        error: true,
        errorMessage: "Invalid credentials",
      });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: true,
        errorMessage: "Invalid credentials",
      });
    }

    // Generate JWT token with role included
    const token = jwt.sign(
      { id: user._id, role: user.role }, // payload with role
      process.env.JWT_SECRET, // secret key
      { expiresIn: process.env.JWT_EXPIRES_IN } // options
    );

    // Remove password from output
    user.password = undefined;

    return res.status(200).json({
      error: false,
      token: token,
    });
  } catch (exception) {
    console.log("Error during login:", exception.message);
    return res.status(500).json({
      error: true,
      errorMessage: "Something went wrong at our side!",
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { fullName, age, address, email, phoneNumber, username, password } =
      req.body;

    // Required fields check
    const missingFields = [];
    if (!fullName) missingFields.push("Full name");
    if (!age) missingFields.push("Age");
    if (!address) missingFields.push("Address");
    if (!email) missingFields.push("Email");
    if (!phoneNumber) missingFields.push("Phone number");
    if (!username) missingFields.push("Username");
    if (!password) missingFields.push("Password");

    if (missingFields.length) {
      return res.status(400).json({
        error: true,
        errorMessage: `${missingFields.join(", ")} ${
          missingFields.length === 1 ? "is" : "are"
        } required.`,
      });
    }

    // Check if username, email, or phone number is already taken
    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { phoneNumber }],
    });

    if (existingUser) {
      return res.status(400).json({
        error: true,
        errorMessage: `${
          existingUser.username === username
            ? "Username"
            : existingUser.email === email
            ? "Email"
            : "Phone number"
        } is already in use.`,
      });
    }

    // Create and save the user
    await new User({
      fullName,
      age,
      address,
      email,
      phoneNumber,
      username,
      password,
    }).save();

    return res.status(201).json({
      error: false,
      message: "Registration successful! You can now log in.",
    });
  } catch (exception) {
    console.log("Error during registration:", exception.message);
    // Handle Mongoose validation errors
    if (exception.name === "ValidationError") {
      const errorMessages = Object.values(exception.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        error: true,
        errorMessage: errorMessages.join(" "),
      });
    }

    return res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred. Please try again later.",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    // Validate input
    if (!username || !oldPassword || !newPassword) {
      return res.status(400).json({
        error: true,
        errorMessage: "username, oldPassword, and newPassword are required.",
      });
    }

    // Check if the new password meets strength requirements (optional)
    if (newPassword.length < 4) {
      return res.status(400).json({
        error: true,
        errorMessage: "New password must be at least 4 characters long.",
      });
    }

    // Fetch the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        error: true,
        errorMessage: "User not found.",
      });
    }

    // Check if the old password matches
    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user.password
    );
    if (!isOldPasswordCorrect) {
      return res.status(400).json({
        error: true,
        errorMessage: "Incorrect old password.",
      });
    }

    // Update the password in the database
    user.password = newPassword; // The pre-save hook will hash the password
    await user.save();

    // Respond with success message
    return res.status(200).json({
      error: false,
      message: "Password changed successfully.",
    });
  } catch (exception) {
    console.log("Error changing password:", exception.message);
    return res.status(500).json({
      error: true,
      errorMessage: "Something went wrong while changing the password.",
      exception: exception.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // Get token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return res.status(401).json({
        error: true,
        message: "You are not logged in! Please Login to get access",
      });
    }

    if (!token) {
      return res.status(401).json({
        error: true,
        errorMessage: "You are not logged in! Please Login to get access",
      });
    }

    // Validate the token
    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (exception) {
      return res.status(401).json({
        error: true,
        errorMessage: "The user belonging to the token does no longer exist",
      });
    }

    // Check if user still exists
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return res.status(401).json({
        error: true,
        errorMessage: "User Authentication Failed!",
      });
    }

    req.user = { id: decoded.id, role: decoded.role }; // Attaching the user id and role to the request object

    // All the above cases have passed!
    // Therefore it is an authenticated request! Hence calling next()
    next();
  } catch (exception) {
    console.log(exception);

    return res.status(500).json({
      error: true,
      errorMessage: "Something went wrong at our side !",
      exception: exception.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user's ID
    const updates = req.body; // Data to update

    // Prevent updating password
    if (updates.password) {
      return res.status(400).json({
        error: true,
        errorMessage: "Password update is not allowed through this route.",
      });
    }

    // Fetch the user
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: true,
        errorMessage: "User not found.",
      });
    }

    // Apply updates
    Object.keys(updates).forEach((key) => {
      user[key] = updates[key]; // Only update provided fields
    });

    // Validate updated user data against schema
    await user.validate();

    // Save updated user data
    await user.save();

    return res.status(200).json({
      error: false,
      message: "Your profile has been updated successfully.",
    });
  } catch (exception) {
    console.log("Error during user update:", exception.message);

    // Handle Mongoose validation errors
    if (exception.name === "ValidationError") {
      const errorMessages = Object.values(exception.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        error: true,
        errorMessage: errorMessages.join(" "),
      });
    }

    return res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred. Please try again later.",
    });
  }
};

exports.getUserAccount = async (req, res) => {
  try {
    const userId = req.user.id; // Get logged-in user's ID

    // Fetch user details, excluding password
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        error: true,
        errorMessage: "User not found.",
      });
    }

    return res.status(200).json({
      error: false,
      user,
    });
  } catch (exception) {
    console.log("Error fetching user details:", exception.message);

    return res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred. Please try again later.",
    });
  }
};
