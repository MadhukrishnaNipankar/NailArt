import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<h2>404 - Page Not Found 😢</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
