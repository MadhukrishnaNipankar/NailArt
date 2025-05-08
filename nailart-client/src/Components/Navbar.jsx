import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [userRole, setUserRole] = useState(null);
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (authToken) {
      const decoded = jwtDecode(authToken);
      setUserRole(decoded.role); // Set role in state
    }
  }, [authToken]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); // smooth redirect to login
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
      {userRole === "User" && <div style={styles.logo}>NailedIt</div>}
      {userRole === "Admin" && <div style={styles.logo}>NailedIt Admin</div>}

      <nav style={styles.nav}>
        {/* User-only links */}
        {userRole === "User" && (
          <>
            <Link to="/" style={styles.navLink}>
              Home
            </Link>
            <Link to="/blogs" style={styles.navLink}>
              Blogs
            </Link>
            <Link to="/shop" style={styles.navLink}>
              Shop
            </Link>
            <Link to="/appointment" style={styles.navLink}>
              Appointment
            </Link>
            <Link to="/customize" style={styles.navLink}>
              Customize
            </Link>
            <Link to="/orders" style={styles.navLink}>
              My Orders
            </Link>
          </>
        )}

        {/* Admin-only links */}
        {userRole === "Admin" && (
          <>
            <Link to="/all-appointments" style={styles.navLink}>
              Appointments
            </Link>
            <Link to="/all-orders" style={styles.navLink}>
              Orders
            </Link>
          </>
        )}

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

export default Navbar;
