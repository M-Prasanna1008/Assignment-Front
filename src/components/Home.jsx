import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [menu, setMenu] = useState([]);
  const [msg, setMsg] = useState("");

  const handleGet = async () => {
    try {
      const resp = await axios.get("https://assignment-back-9w94.onrender.com/menu");
      console.log(resp.data);
      setMenu(resp.data);
      setMsg("Menu items loaded successfully!");
    } catch (e) {
      console.log(e);
      setMsg("Failed to load menu items.");
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <>
      <h2>Hotel Menu</h2>

      {msg && <p>{msg}</p>}

      {menu && menu.length > 0 ? (
        <table
          style={{
            margin: "0 auto",
            borderCollapse: "collapse",
            width: "70%",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Item Name</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>{item.id}</td>
                <td style={tdStyle}>{item.name}</td>
                <td style={tdStyle}>{item.category}</td>
                <td style={tdStyle}>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No menu items available</h3>
      )}
    </>
  );
}

const thStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
};

export default Home;
