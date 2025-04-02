import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    address: "",
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", isError: false });

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.error) {
        setMessage({ text: data.errorMessage, isError: true });
      } else {
        setMessage({ text: data.message, isError: false });
      }
    } catch (error) {
      setMessage({ text: "Something went wrong. Try again.", isError: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Signup Card */}
      <div style={styles.card}>
        {/* Right Side - Image */}
        <div style={styles.imageContainer}>
          <img
            src="https://i.pinimg.com/originals/38/57/d0/3857d0a75e76c5ad974aaec6e7666142.jpg"
            alt="Signup Background"
            style={styles.image}
          />
          <h2 style={styles.imageText}>Welcome to NailArt 💅</h2>
        </div>

        {/* Left Side - Signup Form */}
        <div style={styles.formContainer}>
          <h2 style={styles.title}>Create Your Account 💖</h2>
          <p style={styles.subtitle}>
            Join us for an exclusive NailArt experience.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={{ display: "flex", gap: "10px" }}>
              <CustomInput
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              <CustomInput
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <CustomInput
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <CustomInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <CustomInput
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <CustomInput
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <CustomInput
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Signing Up..." : "Get Started 🚀"}
            </button>
          </form>

          {message.text && (
            <p
              style={{
                color: message.isError ? "red" : "green",
                marginTop: "10px",
              }}
            >
              {message.text}
            </p>
          )}

          <p style={styles.loginText}>
            Already have an account?{" "}
            <a href="/login" style={styles.loginLink}>
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Custom Input Component
const CustomInput = ({ type, name, placeholder, value, onChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    style={styles.input}
    required
  />
);

// Styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #ffdde1, #ee9ca7)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    display: "flex",
    width: "75%",
    height: "90%",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
    background: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },
  imageContainer: {
    width: "50%",
    background: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    width: "90%",
    height: "90%",
    objectFit: "cover",
    borderRadius: "15px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
  },
  imageText: {
    position: "absolute",
    bottom: "5%",
    background: "rgba(255, 255, 255, 0.2)",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "18px",
    color: "#fff",
    fontWeight: "bold",
  },
  formContainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem",
    background: "#fff",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
  },
  title: {
    marginBottom: "1rem",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#e91e63",
  },
  subtitle: { color: "#555", marginBottom: "1.5rem", textAlign: "center" },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    flex: "1",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "16px",
    background: "rgba(255, 255, 255, 0.8)",
    transition: "0.3s",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #ff85a2, #ff4081)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "0.3s",
    fontWeight: "bold",
    boxShadow: "0px 5px 15px rgba(255, 105, 135, 0.3)",
  },
  loginText: { margin: "1rem", fontSize: "14px", color: "#777" },
  loginLink: { color: "#e91e63", textDecoration: "none", fontWeight: "bold" },
};

export default Signup;
