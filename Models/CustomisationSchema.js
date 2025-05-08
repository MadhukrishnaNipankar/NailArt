// models/Customisation.js
const mongoose = require("mongoose");

const customisationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // make sure you have a User model already
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  shape: {
    type: String,
    required: true,
    enum: ["Square", "Almond", "Round", "Coffin"],
  },
  length: {
    type: String,
    required: true,
    enum: ["Short", "Medium", "Long"],
  },
  imageUrl: {
    type: String,
    required: true, // path like /uploads/images/xxx.png
  },
  description: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Customisation = mongoose.model("Customisation", customisationSchema);

module.exports = Customisation; // Change from 'export default' to 'module.exports'
