import React from "react";

const Modal = ({ product, onClose, onConfirm }) => {
  const styles = {
    modalBackdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    modalContainer: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "10px",
      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      zIndex: 1001,
      width: "80%",
      maxWidth: "500px",
    },
    button: {
      padding: "0.8rem 1.5rem",
      backgroundColor: "rgb(65, 179, 33)",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "1rem",
      fontSize: "1rem",
    },
    closeButton: {
      marginLeft: "1rem",
      padding: "0.5rem 1rem",
      backgroundColor: "rgb(194, 55, 0)",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "1rem",
      marginRight: "10px",
      fontSize: "1rem",
    },
  };

  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modalContainer}>
        <h2>Confirm Your Order</h2>
        <p>Product: {product.name}</p>
        <p>Cost: ${product.cost}</p>
        <p>Are you sure you want to place this order?</p>

        <div>
          <button onClick={onConfirm} style={styles.button}>
            Confirm Order
          </button>
          <button onClick={onClose} style={styles.closeButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
