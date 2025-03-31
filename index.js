const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/Db");
const cors = require("cors");

// Load environment variables
dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json()); // Middleware for parsing JSON
app.use(cors()); //Allow all cors requests

// Database Connection String
const CONNECTION_STRING = process.env.CONNECTION_STRING;

// Connect to database
connectDB(CONNECTION_STRING);

// Importing routes
const userAuthRoutes = require("./Routes/UserAuthRoutes");
const companyRoutes = require("./Routes/CompanyRoutes");
// API Routes

app.use("/api/v1/auth", userAuthRoutes);
app.use("/api/v1/companies", companyRoutes);

app.use("/", (req, res) => {
  res.send("Welcome to NailArt");
});
// Port setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
