// src/components/PaymentSuccess.jsx
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="payment-success-container">
      <FaCheckCircle className="success-icon" />
      <h1>Payment Successful!</h1>
      <p>Thank you for your order. Your payment has been processed.</p>
      <button className="go-home-btn" onClick={handleGoHome}>
        🏠 Go to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
