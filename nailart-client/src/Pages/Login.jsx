import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "", show: false });
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.error) {
        showAlert(`${data.errorMessage}`, "error");
      } else {
        showAlert("✅ Login Successful! Redirecting...", "success");
        localStorage.setItem("authToken", data.token);

        // Redirect to "/" after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      showAlert("⚠️ Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Show Alert Popup
  const showAlert = (message, type) => {
    setAlert({ message, type, show: true });

    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #ffdde1, #ee9ca7)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Login Card */}
      <div
        style={{
          display: "flex",
          width: "75%",
          height: "90%",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Left Side - Login Form */}
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem",
            background: "#fff",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
          }}
        >
          <h2
            style={{
              marginBottom: "1rem",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#e91e63",
            }}
          >
            Welcome Back! 💖
          </h2>
          <p style={{ color: "#555", marginBottom: "1.5rem" }}>
            Enter your credentials to continue.
          </p>

          <form style={{ width: "100%" }} onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />

            <button
              type="submit"
              style={{
                ...buttonStyle,
                background: loading
                  ? "gray"
                  : "linear-gradient(135deg, #ff85a2, #ff4081)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Let's Go 🚀"}
            </button>
          </form>

          <p style={{ marginTop: "1rem", fontSize: "14px", color: "#777" }}>
            Don't have an account?{" "}
            <a
              href="/signup"
              style={{
                color: "#e91e63",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Right Side - Image */}
        <div
          style={{
            width: "50%",
            background: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            style={{
              width: "90%",
              height: "90%",
              objectFit: "cover",
              borderRadius: "15px",
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
            }}
            src="https://i.pinimg.com/originals/38/57/d0/3857d0a75e76c5ad974aaec6e7666142.jpg"
            alt="Login Background"
          />
          <h2
            style={{
              position: "absolute",
              bottom: "5%",
              background: "rgba(255, 255, 255, 0.2)",
              padding: "10px 20px",
              borderRadius: "10px",
              fontSize: "18px",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Welcome Back to NailArt 💅
          </h2>
        </div>
      </div>

      {/* Custom Alert Popup */}
      {alert.show && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            background: alert.type === "success" ? "#2ecc71" : "#e74c3c",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: "10px",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            animation: "fadeIn 0.3s ease-in-out",
            opacity: alert.show ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {alert.message}
          <button
            onClick={() => setAlert({ message: "", type: "", show: false })}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
            }}
          ></button>
        </div>
      )}

      {/* Alert Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

// Styles
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "18px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0px 5px 15px rgba(255, 105, 135, 0.3)",
};

export default Login;
