// src/components/CustomisationList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CustomisationList.css";
import AdminNavbar from "../Components/AdminNavbar";
import * as XLSX from "xlsx";

const CustomisationList = () => {
  const [customisations, setCustomisations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomisations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/customization/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        console.log("API Response:", response.data);
        setCustomisations(response.data.data || []); // correctly accessing the array
      } catch (err) {
        console.error(err);
        setError("Failed to fetch customisations.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomisations();
  }, []);

  const handleDownloadExcel = () => {
    const data = customisations.map((c) => ({
      Color: c.color,
      Shape: c.shape,
      Length: c.length,
      Description: c.description || "N/A",
      "Order Date": new Date(c.createdAt).toLocaleDateString(),
      "Image URL": `http://localhost:5000${c.imageUrl}`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customisations");

    XLSX.writeFile(workbook, "CustomisationOrders.xlsx");
  };

  if (loading) return <div className="centered pink-text">Loading...</div>;
  if (error) return <div className="centered error-text">{error}</div>;

  return (
    <>
    <AdminNavbar/>
    <div className="customisation-container">
      <h1 className="customisation-heading">Customisation Orders</h1>
      {customisations.length > 0 && (
          <button className="download-btn" onClick={handleDownloadExcel}>
            ⬇️ Download Excel
          </button>
        )}
        
      <div className="customisation-grid">
        {Array.isArray(customisations) &&
          customisations.map((c) => (
            <div key={c._id} className="customisation-card">
              <img
                src={`http://localhost:5000${c.imageUrl}`}
                alt="Nail Design"
                className="customisation-image"
              />
              <div className="customisation-content">
                <h2 className="color-title" style={{ color: c.color }}>
                  {c.color}
                </h2>
                <p>
                  <strong>Shape:</strong> {c.shape}
                </p>
                <p>
                  <strong>Length:</strong> {c.length}
                </p>
                <p className="description">{c.description}</p>
                <p className="date">
                  {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
    </>
  );
};

export default CustomisationList;
