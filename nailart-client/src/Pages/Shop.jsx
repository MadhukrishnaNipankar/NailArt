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
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [orderError, setOrderError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");
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
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data.error) {
          setError(data.errorMessage || "Failed to fetch products.");
          setFilteredProducts([]);
        } else {
          console.log(data);
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

  const handleBuyNow = (product) => {
    console.log("handle buy now", product);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setOrderMessage("Authorization token not found.");
      return;
    }

    try {
      console.log(selectedProduct);

      const res = await fetch("http://localhost:5000/api/v1/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: selectedProduct.productId, // Using _id from the selected product
          shippingAddress: shippingAddress.trim(),
        }),
      });

      const data = await res.json();
      if (data.error) {
        setOrderMessage("❌ Failed to place order. Please try again.");
      } else {
        setOrderMessage(
          "✅ Order placed successfully! Order ID: " + data.data.orderId
        );
        setTimeout(() => {
          setShowModal(false);
          setShippingAddress("");
          setOrderMessage("");
        }, 2000);
      }
    } catch (error) {
      setOrderMessage("❌ Network error. Please try again.");
    }
  };

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
      fontSize: "1rem",
    },
  };

  return (
    <>
      <Navbar />
      <div style={styles.shopContainer}>
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

        <input
          type="text"
          placeholder="🔍 Search for the perfect shade..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchBar}
        />

        {loading && <p style={styles.loadingText}>Loading products...</p>}
        {error && <p style={styles.errorText}>{error}</p>}

        {!loading && !error && (
          <div style={styles.productGrid}>
            {filteredProducts
              .filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((product) => (
                <ProductCard
                  key={product._id}
                  productId={product._id}
                  name={product.name}
                  cost={product.cost}
                  image={product.image}
                  handleBuyNow={handleBuyNow}
                />
              ))}
          </div>
        )}
      </div>

      {/* Inline Modal */}
      {showModal && selectedProduct && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContainer}>
            <h2>Confirm Your Order</h2>
            <p>
              <strong>Product:</strong> {selectedProduct.name}
            </p>
            <p>
              <strong>Cost:</strong> ₹{selectedProduct.cost}
            </p>
            <label>
              <strong>Shipping Address:</strong>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter your address here"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginTop: "0.5rem",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  fontFamily: "inherit",
                  fontSize: "1rem",
                }}
                rows={3}
              />
            </label>

            {orderMessage && (
              <p
                style={{
                  marginTop: "1rem",
                  color: orderMessage.startsWith("✅") ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {orderMessage}
              </p>
            )}

            <div>
              <button onClick={handleConfirmOrder} style={styles.button}>
                Confirm Order
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setShippingAddress("");
                  setOrderMessage("");
                }}
                style={styles.closeButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
