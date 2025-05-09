import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllOrders.css";
import AdminNavbar from "../Components/AdminNavbar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.get(
        "http://localhost:5000/api/v1/order/orders/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.errorMessage || "Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDownloadExcel = () => {
    const worksheetData = orders.map((order) => ({
      "Order ID": order.orderId,
      "Product Name": order.product.name,
      "Product Cost": order.product.cost,
      "Username": order.user.username,
      "User Email": order.user.email,
      "Phone Number": order.user.phoneNumber,
      "Shipping Address": order.shippingAddress,
      "Date & Time": new Date(order.createdAt).toLocaleString(),
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
  
    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  
    saveAs(file, "All_Orders.xlsx");
  };
  
  return (
    <>
      <AdminNavbar />
      <div className="admin-orders-container">
        <h2 className="orders-header">📦 All Orders</h2>
        {!loading && !error && orders.length > 0 && (
        <button className="download-btn" onClick={handleDownloadExcel}>
          ⬇️ Download Excel
        </button>
        
      )}
        {loading ? (
          <p className="loading">Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : orders.length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product Name</th>
                <th>Product Cost</th>
                <th>Product Image</th>
                <th>Username</th>
                <th>User Email</th>
                <th>Phone Number</th>
                <th>Shipping Address</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.product.name}</td>
                  <td>₹{order.product.cost}</td>
                  <td>
                    <img
                      src={order.product.image}
                      alt={order.product.name}
                      className="product-img"
                    />
                  </td>
                  <td>{order.user.username}</td>
                  <td>{order.user.email}</td>
                  <td>{order.user.phoneNumber}</td>
                  <td>{order.shippingAddress}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AllOrders;
