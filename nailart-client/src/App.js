import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Blogs from "./Pages/Blogs";
import BlogDetails from "./Pages/BlogDetails";
import Homepage from "./Pages/Homepage";
import Shop from "./Pages/Shop";
import AllAppointments from "./Pages/AllAppointments";
import AllOrders from "./Pages/AllOrders";
import AppointmentPage from "./Pages/AppointmentPage";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/" element={<AllAppointments />} /> */}
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/all-orders" element={<AllOrders />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="*" element={<h2>404 - Page Not Found 😢</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
