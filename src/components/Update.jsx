import React, { useState, useEffect } from "react";
import axios from "axios";

function Update() {
  const [menu, setMenu] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [item, setItem] = useState({ name: "", category: "", price: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/menu")
      .then(res => setMenu(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!selectedId) {
      setMsg("Please select an item to update.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/menu/${parseInt(selectedId)}`, item);
      setMsg("Menu item updated successfully!");
      setSelectedId("");
      setItem({ name: "", category: "", price: "" });
      // Refresh menu
      setMenu(menu.map(m => m.id === parseInt(selectedId) ? { ...m, ...item } : m));
    } catch (error) {
      console.log(error);
      setMsg("Failed to update item.");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Update Menu Item</h2>
      {msg && <p>{msg}</p>}
      <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} style={inputStyle}>
        <option value="">--Select Item--</option>
        {menu.map(m => <option key={m.id} value={m.id}>{m.id} - {m.name}</option>)}
      </select>
      <br />
      <input type="text" name="name" placeholder="New Name" value={item.name} onChange={handleChange} style={inputStyle} />
      <input type="text" name="category" placeholder="New Category" value={item.category} onChange={handleChange} style={inputStyle} />
      <input type="number" name="price" placeholder="New Price" value={item.price} onChange={handleChange} style={inputStyle} />
      <br />
      <button onClick={handleUpdate} style={btnStyle}>Update Item</button>
    </div>
  );
}

const inputStyle = { margin: "8px", padding: "6px", border: "1px solid #ccc", borderRadius: "4px" };
const btnStyle = { marginTop: "10px", padding: "6px 12px", border: "none", backgroundColor: "#2196f3", color: "white", borderRadius: "4px", cursor: "pointer" };

export default Update;
