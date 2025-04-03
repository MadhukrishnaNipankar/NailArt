import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../Components/Navbar";

const Homepage = () => {
  // Inline styles
  const styles = {
    testimonialStars: {
      color: "#ffb400",
      fontSize: "1.2rem",
      margin: "0.5rem 0",
    },
    homepage: {
      fontFamily: "'Arial', sans-serif",
      background: "linear-gradient(135deg, #ffdde1, #ee9ca7)",
      color: "#333",
      minHeight: "100vh",
      paddingTop: "1rem",
    },

    hero: {
      textAlign: "center",
      padding: "5rem 2rem",
      background: "rgba(255, 255, 255, 0.7)",
      margin: "0.3rem 5% 2rem 5%",
      borderRadius: "20px",
    },
    heroTitle: {
      fontSize: "2.5rem",
      color: "#e91e63",
      fontWeight: "bold",
    },
    heroText: {
      fontSize: "1.2rem",
      margin: "1rem 0",
    },
    btn: {
      display: "inline-block",
      padding: "0.75rem 2rem",
      marginTop: "1rem",
      background: "linear-gradient(135deg, #ff85a2, #ff4081)",
      color: "#fff",
      borderRadius: "30px",
      fontSize: "1rem",
      textDecoration: "none",
      transition: "background 0.3s",
    },
    productGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1.5rem",
      padding: "2rem 5%",
    },
    productCard: {
      background: "#fff",
      padding: "1rem",
      borderRadius: "10px",
      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    productImage: {
      width: "100%",
      borderRadius: "10px",
    },
    footer: {
      textAlign: "center",
      padding: "0.4rem 5%",
      background: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
      marginTop: "2rem",
    },
    testimonialSection: {
      textAlign: "center",
      margin: "3rem 5%",
      padding: "2rem",
      background: "rgba(255, 255, 255, 0.9)",
      borderRadius: "20px",
    },
    testimonialCard: {
      padding: "1.5rem",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      textAlign: "center",
      maxWidth: "600px",
      margin: "auto",
    },
    testimonialText: {
      fontSize: "1.2rem",
      fontStyle: "italic",
      color: "#555",
    },
    testimonialAuthor: {
      marginTop: "1rem",
      fontWeight: "bold",
      color: "#e91e63",
    },
  };

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); // Redirect to /login if no token
    }
  }, [navigate]);

  // Function to render stars based on rating
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  // Testimonials Data
  const testimonials = [
    {
      text: "Absolutely love these nails! They are stunning and easy to apply. Highly recommend!",
      author: "Samantha R.",
    },
    {
      text: "These press-on nails last so long and look like a salon-quality manicure.",
      author: "Jessica M.",
    },
    {
      text: "I've tried many brands, but these are by far the best. Beautiful designs and durable!",
      author: "Emily K.",
    },
    {
      text: "I get so many compliments on my nails! The quality is amazing.",
      author: "Sophia L.",
    },
  ];

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Product Data
  const products = [
    {
      name: "Frosted Marble",
      cost: 749,
      image:
        "https://media.istockphoto.com/id/1399230916/photo/abstract-manicure-with-multicolored-lines.jpg?s=612x612&w=0&k=20&c=3cW1bguK36ouLFvRTb3EsvGiIghV1DZ5HrJom-er48A=",
    },
    {
      name: "Dream Dust",
      cost: 999,
      image:
        "https://media.istockphoto.com/id/1334253013/photo/close-up-manicured-womans-hands-on-pink-background.jpg?s=612x612&w=0&k=20&c=JuFZMI6Hd7iS_ZfU124XegjIFlI_ODHwpGVvNztAW4g=",
    },
    {
      name: "Glacé Tips",
      cost: 999,
      image:
        "https://media.istockphoto.com/id/1359662820/photo/close-up-womans-hands-with-trendy-minimal-manicure-on-green-background-spring-summer-nail.jpg?s=612x612&w=0&k=20&c=dBM1fF1utrbqQT96o-bGoBBvUOg9mc2R47QS85_lJR0=",
    },
    {
      name: "24K Fade",
      cost: 999,
      image:
        "https://media.istockphoto.com/id/1419093025/photo/beautiful-female-hands-with-pink-and-blue-manicure-nails-on-sea-sand-background.jpg?s=612x612&w=0&k=20&c=AoIB4avXbYL_eVyaFRmj12Kv4K5GNvcJfKbHJmDH1Vo=",
    },
  ];
  return (
    <>
      <Navbar />
      <div style={styles.homepage}>
        {/* Hero Section */}
        <section style={styles.hero}>
          <h1 style={styles.heroTitle}>
            Transform Your Look with Stunning Nails
          </h1>
          <p style={styles.heroText}>
            Explore our premium press-on nails collection for every occasion.
          </p>
          <Link to="/shop" style={styles.btn}>
            Shop Now
          </Link>
        </section>
        {/* Product Grid */}
        <section>
          <div style={styles.productGrid}>
            {products.map((product, index) => (
              <div key={index} style={styles.productCard}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={styles.productImage}
                />
                <h3>{product.name}</h3>
                <p style={{ color: "#e91e63", fontSize: "1rem" }}>
                  ₹{product.cost}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* Testimonial Section */}
        <section
          style={{
            textAlign: "center",
            margin: "3rem 5%",
            padding: "2rem",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "20px",
          }}
        >
          <h2
            style={{ color: "#e91e63", fontSize: "2rem", marginBottom: "1rem" }}
          >
            What Our Customers Say
          </h2>
          <Slider {...sliderSettings}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  padding: "1.5rem",
                  background: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                  textAlign: "center",
                  maxWidth: "600px",
                  margin: "auto",
                }}
              >
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontStyle: "italic",
                    color: "#555",
                  }}
                >
                  "{testimonial.text}"
                </p>
                <p style={styles.testimonialStars}>
                  {renderStars(testimonial.rating)}
                </p>
                <p
                  style={{
                    marginTop: "0.5rem",
                    fontWeight: "bold",
                    color: "#e91e63",
                  }}
                >
                  - {testimonial.author}
                </p>
              </div>
            ))}
          </Slider>
        </section>
        {/* Footer */}
        <footer style={styles.footer}>
          <p>&copy; 2025 NailArt. All Rights Reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Homepage;
