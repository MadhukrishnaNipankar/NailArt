const express = require("express");
const router = express.Router();
const appointmentController = require("../Controllers/AppointmentControllers/AppointmentController");
const userAuthController = require("../Controllers/UserControllers/UserAuthController");
// Book Appointments
router.post(
  "/",
  userAuthController.protect,
  appointmentController.bookAppointment
);
router.get(
    "/",
    userAuthController.protect,
    appointmentController.getAppointments
  );
  
module.exports = router;
