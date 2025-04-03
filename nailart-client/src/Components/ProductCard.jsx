import React from "react";

const ProductCard = ({ name, cost }) => {
  const styles = {
    cardContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "60vh",
      padding: "1rem",
    },
    card: {
      width: "250px",
      background: "#fff",
      borderRadius: "15px",
      boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      position: "relative",
    },
    cardImageContainer: {
      position: "relative",
    },
    cardImage: {
      width: "100%",
      borderRadius: "10px 10px 0 0",
      display: "block",
    },
    overlay: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.1)",
    },
    cardContent: {
      padding: "1rem",
    },
    cardTitle: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: "#ff3b5c",
      marginBottom: "0.5rem",
    },
    cardPrice: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "#555",
      background: "rgba(255, 59, 92, 0.1)",
      padding: "5px 10px",
      borderRadius: "10px",
      display: "inline-block",
      marginRight: "1rem",
    },
    buyButton: {
      display: "inline-block",
      padding: "0.5rem 1.2rem",
      background: "linear-gradient(135deg, #ff4b7d, #ff1744)",
      color: "#fff",
      borderRadius: "20px",
      fontSize: "0.9rem",
      textDecoration: "none",
      transition: "transform 0.3s ease, background 0.3s ease",
      cursor: "pointer",
      marginTop: "0.8rem",
      border: "none",
    },
    buyButtonHover: {
      transform: "scale(1.1)",
      background: "linear-gradient(135deg, #ff3b5c, #e60023)",
    },
  };

  return (
    <div style={styles.cardContainer}>
      <div
        style={styles.card}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow =
            "0px 10px 30px rgba(255, 59, 92, 0.3)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0px 5px 20px rgba(0, 0, 0, 0.1)";
        }}
      >
        <div style={styles.cardImageContainer}>
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.5KuwW_NU020ryxpYeHT91wHaHa&rs=1&pid=ImgDetMain"
            alt={name}
            style={styles.cardImage}
          />
          <div style={styles.overlay}></div>
        </div>
        <div style={styles.cardContent}>
          <h3 style={styles.cardTitle}>{name}</h3>
          <p style={styles.cardPrice}>₹{cost}</p>
          <button
            style={styles.buyButton}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = styles.buyButtonHover.transform;
              e.currentTarget.style.background =
                styles.buyButtonHover.background;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = styles.buyButton.background;
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
