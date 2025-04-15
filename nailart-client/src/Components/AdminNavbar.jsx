import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const authToken = localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload(); // Refresh the page after logout
  };

  const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 5%",
      background: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#e91e63",
    },
    nav: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
    },
    navLink: {
      fontSize: "1.1rem",
      textDecoration: "none",
      color: "#333",
      fontWeight: "300",
      transition: "color 0.3s",
    },
    logoutButton: {
      padding: "0.7rem 1rem",
      background:
        "linear-gradient(135deg, rgb(255, 133, 162), rgb(255, 64, 129))",
      color: "#fff",
      border: "none",
      borderRadius: "30px",
      cursor: "pointer",
      transition: "background 0.3s",
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>NailedIt</div>
      <nav style={styles.nav}>
        <Link to="/all-appointments" style={styles.navLink}>
          Appointments
        </Link>
        <Link to="/all-orders" style={styles.navLink}>
          Orders
        </Link>
        {/* Show Logout button only if user is logged in */}
        {authToken && (
          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default AdminNavbar;
