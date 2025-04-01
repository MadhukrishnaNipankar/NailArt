const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: [true, "User ID is required"],
    },
    dateOfAppointment: {
      type: Date,
      required: [true, "Date of appointment is required"],
    },
    timeSlot: {
      type: Number,
      required: [true, "Time slot is required"],
      enum: {
        values: [12, 2, 4, 6],
        message: "Time slot must be one of 12, 2, 4, or 6",
      },
    },
  },
  { timestamps: true }
);

// Modular Export of the Appointment Model
const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
