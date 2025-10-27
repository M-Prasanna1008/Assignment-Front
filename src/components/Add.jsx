import React, { useState, useEffect } from "react";
import axios from "axios";

function Add() {
  const [item, setItem] = useState({ name: "", category: "", price: "" });
  const [msg, setMsg] = useState("");
  const [menu, setMenu] = useState([]);

  // Fetch menu to find last ID
  useEffect(() => {
    axios.get("https://assignment-back-9w94.onrender.com/menu")
      .then(res => setMenu(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!item.name || !item.category || !item.price) {
      setMsg("Please fill in all fields!");
      return;
    }

    // Auto-generate ID
    const newId = menu.length > 0 ? Math.max(...menu.map(m => m.id)) + 1 : 1;

    try {
      await axios.post("https://assignment-back-9w94.onrender.com/menu", { id: newId, ...item });
      setMsg("Menu item added successfully!");
      setItem({ name: "", category: "", price: "" });
      setMenu([...menu, { id: newId, ...item }]);
    } catch (error) {
      console.log(error);
      setMsg("Failed to add item.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Add Menu Item</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleAdd}>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={item.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={item.category}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={item.price}
          onChange={handleChange}
          style={inputStyle}
        />
        <br />
        <button type="submit" style={btnStyle}>Add Item</button>
      </form>
    </div>
  );
}

const inputStyle = { margin: "8px", padding: "6px", border: "1px solid #ccc", borderRadius: "4px" };
const btnStyle = { marginTop: "10px", padding: "6px 12px", border: "none", backgroundColor: "#4caf50", color: "white", borderRadius: "4px", cursor: "pointer" };

export default Add;
