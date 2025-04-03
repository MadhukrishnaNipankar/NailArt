import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import Navbar from "../Components/Navbar";

const categories = ["work", "vacation", "nailartsupplies", "festive", "casual"];

const Shop = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("work");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken"); // Fetch token from localStorage
      if (!token) {
        setError("Authorization token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/products/${selectedCategory}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Use authToken
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data);

        if (data.error) {
          setError(data.errorMessage || "Failed to fetch products.");
          setFilteredProducts([]);
        } else {
          setFilteredProducts(data.data);
        }
      } catch (err) {
        setError("Network error. Please try again.");
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const styles = {
    shopContainer: {
      padding: "2rem",
      background: "linear-gradient(135deg, #fde6e9, #ffcad4)",
      minHeight: "100vh",
      fontFamily: "'Poppins', sans-serif",
    },
    categoryBar: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      marginBottom: "1.5rem",
    },
    categoryButton: {
      padding: "0.7rem 1.5rem",
      borderRadius: "20px",
      border: "none",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "0.3s ease",
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(10px)",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
      color: "#3a1c1c",
      fontWeight: "500",
    },
    selectedCategory: {
      background: "#ff8fab",
      color: "white",
    },
    searchBar: {
      display: "block",
      width: "50%",
      padding: "0.9rem",
      margin: "0 auto 1.5rem auto",
      fontSize: "1.1rem",
      borderRadius: "25px",
      border: "none",
      textAlign: "center",
      outline: "none",
      color: "#3a1c1c",
      background: "rgba(255, 255, 255, 0.6)",
      backdropFilter: "blur(10px)",
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: "0.3s ease",
    },
    productGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "0.8rem",
      justifyContent: "center",
      padding: "0 1rem",
    },
    errorText: {
      textAlign: "center",
      color: "red",
      fontSize: "1.2rem",
      marginTop: "1rem",
    },
    loadingText: {
      textAlign: "center",
      fontSize: "1.2rem",
      marginTop: "1rem",
    },
  };

  return (
    <>
      <Navbar />
      <div style={styles.shopContainer}>
        {/* Category Selection */}
        <div style={styles.categoryBar}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                ...styles.categoryButton,
                ...(selectedCategory === category
                  ? styles.selectedCategory
                  : {}),
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search for the perfect shade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchBar}
        />

        {/* Show Loading */}
        {loading && <p style={styles.loadingText}>Loading products...</p>}

        {/* Show Error */}
        {error && <p style={styles.errorText}>{error}</p>}

        {/* Product Grid */}
        {!loading && !error && (
          <div style={styles.productGrid}>
            {filteredProducts
              .filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((product) => (
                <ProductCard
                  key={product._id}
                  name={product.name}
                  cost={product.cost}
                  image={product.image}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Shop;
