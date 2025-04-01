const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const Appointment = require("../../Models/AppointmentSchema"); // Import the model
const sendmail = require("../../Utilities/SendMail"); //send mail to users

const User = require("../../Models/UserSchema");
exports.bookAppointment = async (req, res) => {
  try {
    const { dateOfAppointment, timeSlot } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!dateOfAppointment || !timeSlot) {
      return res.status(400).json({
        error: true,
        errorMessage: "Both date and time slot are required.",
      });
    }

    // Check if the selected time slot is valid
    const allowedSlots = [12, 2, 4, 6];
    if (!allowedSlots.includes(timeSlot)) {
      return res.status(400).json({
        error: true,
        errorMessage: "Invalid time slot. Allowed values are 12, 2, 4, or 6.",
      });
    }

    // Check if an appointment already exists for the same date and time slot
    const existingAppointment = await Appointment.findOne({
      dateOfAppointment,
      timeSlot,
    });

    if (existingAppointment) {
      return res.status(400).json({
        error: true,
        errorMessage: `This time slot (${timeSlot}:00) on ${dateOfAppointment} is already booked.`,
      });
    }

    // Fetch the user details from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: true,
        errorMessage: "User not found.",
      });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      dateOfAppointment,
      timeSlot,
      user: userId,
    });

    // Prepare email content
    const adminEmail = "nipankarmadhu@gmail.com"; // Admin Email from .env
    const subject = `New Appointment Booked by ${user.username}`;
    const text = `Dear Admin,\n\nA new appointment has been booked by ${
      user.username
    }.\n\n📅 Date: ${new Date(
      dateOfAppointment
    ).toDateString()}\n⏰ Time Slot: ${timeSlot}:00\n\nThank you,\nYour System`;
    const html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f7fc;
          color: #333;
          padding: 20px;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          padding: 30px;
          max-width: 600px;
          margin: 0 auto;
        }
        h2 {
          color: #4CAF50;
          font-size: 24px;
          margin-bottom: 15px;
        }
        p {
          font-size: 16px;
          line-height: 1.5;
        }
        .details {
          background-color: #f0f8ff;
          padding: 15px;
          border-radius: 8px;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        .details p {
          margin: 10px 0;
        }
        .footer {
          text-align: center;
          color: #777;
          font-size: 14px;
          margin-top: 30px;
        }
        .footer a {
          color: #4CAF50;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>🎉 New Appointment Booked!</h2>
        <p><strong>Hello Admin,</strong></p>
        <p>A new appointment has been successfully booked by <strong>${user.username}</strong>!</p>
        
        <div class="details">
          <p><strong>📅 Date of Appointment:</strong> ${new Date(dateOfAppointment).toDateString()}</p>
          <p><strong>⏰ Time Slot:</strong> ${timeSlot}:00</p>
        </div>
        
        <p>Kindly review the appointment details and take the necessary actions to proceed.</p>
        
        <div class="footer">
          <p>Thank you for using our system!</p>
          <p>If you need more information, feel free to visit our <a href="https://www.yoursystem.com" target="_blank">Admin Panel</a>.</p>
        </div>
      </div>
    </body>
  </html>
`;


    // Send Email
    await sendmail([adminEmail], subject, text, html);

    // Save to database
    await newAppointment.save();

    return res.status(201).json({
      error: false,
      message: "Appointment booked successfully.",
      data: {
        id: newAppointment._id,
        dateOfAppointment: newAppointment.dateOfAppointment,
        timeSlot: newAppointment.timeSlot,
      },
    });
  } catch (err) {
    console.error("Error while booking appointment:", err.message);

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

    return res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred. Please try again later.",
    });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    // Fetch all appointments from the database
    const appointments = await Appointment.find().sort({
      dateOfAppointment: 1,
    });
    // Check if no appointments exist
    if (appointments.length === 0) {
      return res.status(404).json({
        error: true,
        errorMessage: "No appointments found.",
      });
    }

    // Return the list of appointments
    return res.status(200).json({
      error: false,
      data: appointments,
    });
  } catch (err) {
    console.error("Error fetching appointments:", err);

    return res.status(500).json({
      error: true,
      errorMessage: "An unexpected error occurred while fetching appointments.",
      details: err.message,
    });
  }
};
