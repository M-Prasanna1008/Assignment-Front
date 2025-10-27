import React, { useState, useEffect } from "react";
import axios from "axios";

function Delete() {
  const [menu, setMenu] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [msg, setMsg] = useState("");

  // Fetch existing menu items
  useEffect(() => {
    axios.get("http://localhost:3000/menu")
      .then(res => setMenu(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async () => {
    if (!selectedId) {
      setMsg("Please select an item to delete.");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/menu/${parseInt(selectedId)}`);
      setMsg("Menu item deleted successfully!");
      setSelectedId("");
      // Update menu list after deletion
      setMenu(menu.filter(m => m.id !== parseInt(selectedId)));
    } catch (error) {
      console.log(error);
      setMsg("Failed to delete item.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Delete Menu Item</h2>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        style={inputStyle}
      >
        <option value="">--Select Item--</option>
        {menu.map(item => (
          <option key={item.id} value={item.id}>
            {item.id} - {item.name}
          </option>
        ))}
      </select>
      <br />
      <button onClick={handleDelete} style={btnStyle}>
        Delete Item
      </button>

      {msg && <p style={{ marginTop: "12px", color: msg.includes("successfully") ? "green" : "red" }}>{msg}</p>}
    </div>
  );
}

const inputStyle = {
  margin: "8px",
  padding: "6px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  width: "180px",
};

const btnStyle = {
  marginTop: "10px",
  padding: "6px 12px",
  border: "none",
  backgroundColor: "#f44336",
  color: "white",
  borderRadius: "4px",
  cursor: "pointer",
};

export default Delete;
