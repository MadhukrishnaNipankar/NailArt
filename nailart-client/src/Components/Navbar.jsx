import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>NailArt</div>
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>
          Home
        </Link>
        <Link to="/blogs" style={styles.navLink}>
          Blogs
        </Link>
        <Link to="/shop" style={styles.navLink}>
          Shop
        </Link>
        <Link to="/faq" style={styles.navLink}>
          FAQ
        </Link>
        <Link to="/account" style={styles.navLink}>
          My Account
        </Link>
        <Link to="/cart" style={styles.navLink}>
          Cart
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
