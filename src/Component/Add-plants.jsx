// AddPlant.jsx
import React, { useState } from "react";
import axios from "axios";

const AddPlant = ({ onPlantAdded }) => {
  const [plant, setPlant] = useState({
    name: "",
    type: "",
    photoUrl: "",
    wateringFrequency: "",
    fertilizingFrequency: "",
    userId: ""
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlant({ ...plant, [name]: value });

    if (name === "photoUrl") setPreview(value); // image preview
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!plant.name || !plant.photoUrl) {
      alert("Please provide a plant name and image URL!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("https://plantbackend-mqgt.onrender.com/api/admin/plants", plant);
      alert(`Plant "${res.data.name}" added successfully!`);
      setPlant({
        name: "",
        type: "",
        photoUrl: "",
        wateringFrequency: "",
        fertilizingFrequency: "",
        userId: ""
      });
      setPreview("");
      if (onPlantAdded) onPlantAdded(res.data);
    } catch (err) {
      console.error("Error adding plant:", err);
      alert("Failed to add plant. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Plant</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Plant Name"
          value={plant.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="type"
          placeholder="Plant Type (optional)"
          value={plant.type}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="photoUrl"
          placeholder="Image URL"
          value={plant.photoUrl}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="wateringFrequency"
          placeholder="Watering Frequency (optional)"
          value={plant.wateringFrequency}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="fertilizingFrequency"
          placeholder="Fertilizing Frequency (optional)"
          value={plant.fertilizingFrequency}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="userId"
          placeholder="Owner ID (optional)"
          value={plant.userId}
          onChange={handleChange}
          style={styles.input}
        />

        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150?text=Invalid+URL";
            }}
            style={styles.preview}
          />
        )}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Adding..." : "Add Plant"}
        </button>
      </form>
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    maxWidth: "500px",
    margin: "20px auto",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  heading: { marginBottom: "15px", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  preview: {
    width: "100%",
    maxHeight: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px"
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#2e7d32",
    color: "#fff",
    cursor: "pointer"
  }
};

export default AddPlant;
