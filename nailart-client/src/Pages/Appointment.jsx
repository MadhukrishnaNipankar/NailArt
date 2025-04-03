import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = ["12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time slot.");
      return;
    }
    alert(
      "Appointment booked for ${selectedDate.toDateString()} at ${selectedTime}"
    );
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-pink-100 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-pink-600 text-center mb-4">
        Book an Appointment
      </h2>

      <div className="mb-4">
        <label className="block text-pink-700 mb-2">Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="w-full p-2 border rounded-md text-gray-700"
          minDate={new Date()}
          dateFormat="MMMM d, yyyy"
        />
      </div>

      <div className="mb-4">
        <label className="block text-pink-700 mb-2">Select Time Slot:</label>
        <div className="grid grid-cols-2 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              className={`p-2 rounded-md border ${
                selectedTime === slot
                  ? "bg-pink-500 text-white"
                  : "bg-white text-pink-600 border-pink-500"
              }`}
              onClick={() => setSelectedTime(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <Button className="w-full bg-pink-600 text-white" onClick={handleSubmit}>
        Submit Appointment
      </Button>
    </div>
  );
};

export default AppointmentBooking;
