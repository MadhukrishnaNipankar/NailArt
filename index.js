const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/Db");
const cors = require("cors");



const app = express();

app.use(express.json()); // Middleware for parsing JSON
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Load environment variables
dotenv.config({ path: "./config.env" });

// Database Connection String
const CONNECTION_STRING = process.env.CONNECTION_STRING;

// Connect to database
connectDB(CONNECTION_STRING);

// Importing routes
const userAuthRoutes = require("./Routes/UserAuthRoutes");
const appointmentRoutes = require("./Routes/AppointmentRoutes");
const companyRoutes = require("./Routes/CompanyRoutes");
const productRoutes = require("./Routes/ProductRoutes");
const adminRoutes = require("./Routes/AdminRoutes");

// API Routes

app.use("/api/v1/auth", userAuthRoutes);
app.use("/api/v1/appointment", appointmentRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/", (req, res) => {
  res.send("Welcome to NailIt");
});
// Port setup
// const PORT = process.env.PORT || 5000;
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
