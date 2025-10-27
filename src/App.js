import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Add from "./components/Add";
import Update from "./components/Update";
import Delete from "./components/Delete";

function App() {
  return (
    <>
      <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
        <h1 style={{ backgroundColor: "#f8f9fa", padding: "15px" }}>
          🍴 Hotel Menu Management
        </h1>

        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            backgroundColor: "#ddd",
            padding: "10px",
          }}
        >
          <Link style={linkStyle} to="/">Home</Link>
          <Link style={linkStyle} to="/add">Add Item</Link>
          <Link style={linkStyle} to="/update">Update Item</Link>
          <Link style={linkStyle} to="/delete">Delete Item</Link>
        </nav>

        <div style={{ marginTop: "30px", padding: "10px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/update" element={<Update />} />
            <Route path="/delete" element={<Delete />} />
          </Routes>
        </div>

        <footer
          style={{
            backgroundColor: "#f1f1f1",
            padding: "10px",
            marginTop: "30px",
          }}
        >
          <p>© 2025 Hotel Menu Management</p>
        </footer>
      </div>
    </>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "black",
  fontWeight: "bold",
  padding: "5px 10px",
  borderRadius: "5px",
  backgroundColor: "white",
  border: "1px solid #ccc",
};

export default App;
