import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CustomerOrders.css";
import Navbar from "../Components/Navbar";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await axios.get("http://localhost:5000/api/v1/order/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.data.error) {
          setOrders(res.data.data);
        }
      } catch (err) {
        setError("Failed to fetch orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <div className="customer-orders-container">
        <h1 className="page-title">My Orders</h1>

        {loading ? (
          <div className="loading-text">Loading...</div>
        ) : error ? (
          <div className="error-text">{error}</div>
        ) : orders.length === 0 ? (
          <div className="no-orders">You have no orders yet.</div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div className="order-card" key={order.orderId}>
                <img
                  src={order.product.image}
                  alt={order.product.name}
                  className="product-image"
                />
                <div className="order-details">
                  <h2 className="product-name">{order.product.name}</h2>
                  <p className="product-cost">Cost: ₹{order.product.cost}</p>
                  <p className="shipping-address">
                    <strong>Shipping Address:</strong> {order.shippingAddress}
                  </p>
                  <p className="order-date">
                    <strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerOrders;