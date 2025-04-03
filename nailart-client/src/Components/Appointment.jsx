// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import "./Appointment.css";
// import { FaCalendarAlt } from "react-icons/fa"; // Import calendar icon

// const Appointment = () => {
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState("");
//   const [showCalendar, setShowCalendar] = useState(false);

//   const timeSlots = ["12PM", "2PM", "4PM", "6PM"];

//   const handleDateChange = (newDate) => {
//     setDate(newDate);
//     setShowCalendar(false); // Hide calendar after selecting a date
//   };

//   const handleSubmit = () => {
//     if (!time) {
//       alert("Please select a time slot!");
//       return;
//     }
//     alert(`Appointment booked on ${date.toDateString()} at ${time}`);
//   };

//   return (
//     <div className="appointment-container">
//       <div className="appointment-box">
//         <h2>Book an Appointment</h2>

//         {/* Date Picker Input */}
//         <div className="date-picker-container">
//           <input
//             type="text"
//             value={date.toDateString()}
//             readOnly
//             className="date-input"
//             onClick={() => setShowCalendar(!showCalendar)}
//           />
//           <FaCalendarAlt className="calendar-icon" onClick={() => setShowCalendar(!showCalendar)} />
//         </div>

//         {/* Calendar (Hidden by default, appears on click) */}
//         {showCalendar && (
//           <div className="calendar-popup">
//             <Calendar onChange={handleDateChange} value={date} />
//           </div>
//         )}

//         {/* Time Slot Selection */}
//         <h3>Select a Time Slot:</h3>
//         <div className="time-slot-container">
//           {timeSlots.map((slot) => (
//             <button
//               key={slot}
//               onClick={() => setTime(slot)}
//               className={`time-slot ${time === slot ? "selected" : ""}`}
//             >
//               {slot}
//             </button>
//           ))}
//         </div>

//         {/* Submit Button */}
//         <button onClick={handleSubmit} className="submit-btn">
//           Confirm Appointment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Appointment;


import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Appointment.css";
import { FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import Navbar from "../Components/Navbar";

const Appointment = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  const timeSlots = ["12PM", "2PM", "4PM", "6PM"];

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false);
  };

  const handleSubmit = async () => {
    if (!time) {
      alert("Please select a time slot!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("authToken"); // Assuming user authentication token is stored in localStorage
      const response = await axios.post(
        "http://localhost:5000/api/v1/appointment", // Replace with your actual backend URL
        {
          dateOfAppointment: date.toISOString().split("T")[0], // Send date in YYYY-MM-DD format
          timeSlot: parseInt(time), // Convert time slot to integer
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert(
        error.response?.data?.errorMessage || "Failed to book appointment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
        <div className="appointment-container">
      <div className="appointment-box">
        <h2>Book an Appointment</h2>

        <div className="date-picker-container">
          <input
            type="text"
            value={date.toDateString()}
            readOnly
            className="date-input"
            onClick={() => setShowCalendar(!showCalendar)}
          />
          <FaCalendarAlt
            className="calendar-icon"
            onClick={() => setShowCalendar(!showCalendar)}
          />
        </div>

        {showCalendar && (
          <div className="calendar-popup">
            <Calendar onChange={handleDateChange} value={date} />
          </div>
        )}

        <h3>Select a Time Slot:</h3>
        <div className="time-slot-container">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setTime(slot.replace("PM", ""))} // Store numeric value only
              className={`time-slot ${time === slot.replace("PM", "") ? "selected" : ""}`}
            >
              {slot}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="submit-btn"
          disabled={loading}
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
      </div>
    </div>
    
  );
};

export default Appointment;