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
import Navbar1 from "./Components/Navbar1";
import BlogDetails from "./Pages/BlogDetails";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/navbar" element={<Navbar1 />} />
          <Route path="*" element={<h2>404 - Page Not Found 😢</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
