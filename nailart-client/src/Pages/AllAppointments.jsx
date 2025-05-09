import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllAppointments.css";
import * as XLSX from "xlsx";
import AdminNavbar from "../Components/AdminNavbar";
const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.get("http://localhost:5000/api/v1/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(res.data.data);
    } catch (err) {
      setError(
        err.response?.data?.errorMessage || "Failed to fetch appointments."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const timeSlotToString = (slot) => {
    const map = {
      12: "12:00 PM",
      2: "2:00 PM",
      4: "4:00 PM",
      6: "6:00 PM",
    };
    return map[slot] || slot;
  };

  const handleDownloadExcel = () => {
    const data = appointments.map((appointment) => ({
      "Full Name": appointment.user?.fullName || "Unnamed User",
      Phone: appointment.user?.phoneNumber || "N/A",
      Email: appointment.user?.email || "N/A",
      "Appointment Date": new Date(appointment.dateOfAppointment).toLocaleDateString(),
      "Time Slot": timeSlotToString(appointment.timeSlot),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");

    XLSX.writeFile(workbook, "Appointments.xlsx");
  };
  return (
    <>
      <AdminNavbar />
      <div className="appointments-container">
        <h1 className="header">All Appointments</h1>
        {appointments.length > 0 && (
          <button className="download-btn" onClick={handleDownloadExcel}>
            ⬇️ Download Excel
          </button>
        )}
        {loading ? (
          <div className="loading-text">Loading...</div>
        ) : error ? (
          <div className="error-text">{error}</div>
        ) : appointments.length === 0 ? (
          <div className="no-appointments">No appointments found.</div>
        ) : (
          <div className="appointments-list">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="appointment-card">
                <h2 className="user-name">
                  {appointment.user?.fullName || "Unnamed User"}
                </h2>
                <p className="user-phone">
                  📞 <strong>Phone:</strong>{" "}
                  {appointment.user?.phoneNumber || "N/A"}
                </p>
                <p className="appointment-date">
                  📅 <strong>Date:</strong>{" "}
                  {new Date(appointment.dateOfAppointment).toLocaleDateString()}
                </p>
                <p className="appointment-time">
                  🕒 <strong>Time Slot:</strong>{" "}
                  {timeSlotToString(appointment.timeSlot)}
                </p>
                <p className="user-email">
                  📧 <strong>Email:</strong> {appointment.user?.email || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllAppointments;
