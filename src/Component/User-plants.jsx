// src/components/UserPlants.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all plants
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/user/plants");
        setPlants(res.data);
      } catch (err) {
        console.error("Error fetching plants:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  // ✅ Toggle Buy / Not Bought
  const toggleBought = async (plantId, currentStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/user/plants/${plantId}/bought`,
        { bought: !currentStatus }
      );

      // update state instantly
      setPlants((prev) =>
        prev.map((plant) =>
          plant.id === plantId ? { ...plant, bought: !currentStatus } : plant
        )
      );
    } catch (err) {
      console.error("Error updating plant status:", err);
    }
  };

  if (loading) return <p style={styles.loading}>Loading plants...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🌱 My Plants</h2>

      {plants.length === 0 ? (
        <p style={styles.noPlants}>No plants found.</p>
      ) : (
        <div style={styles.cardGrid}>
          {plants.map((plant) => (
            <div key={plant.id} style={styles.card}>
              {/* ✅ Plant Image */}
              {plant.photoUrl && (
                <img src={plant.photoUrl} alt={plant.name} style={styles.image} />
              )}

              {/* ✅ Plant Info */}
              <h3 style={styles.cardTitle}>{plant.name}</h3>
              <p><strong>Type:</strong> {plant.type || "N/A"}</p>
              <p><strong>Watering:</strong> {plant.wateringFrequency || "-"}</p>
              <p><strong>Fertilizing:</strong> {plant.fertilizingFrequency || "-"}</p>

              {/* ✅ Bought Status */}
              <p style={plant.bought ? styles.bought : styles.notBought}>
                {plant.bought ? "✔️ Bought" : "❌ Not Bought"}
              </p>

              {/* ✅ Toggle Button */}
              <button
                style={styles.button}
                onClick={() => toggleBought(plant.id, plant.bought)}
              >
                {plant.bought ? "Mark as Not Bought" : "Mark as Bought"}
              </button>

              <p>
                <strong>Added On:</strong>{" "}
                {plant.createdAt
                  ? new Date(plant.createdAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============ Internal CSS ============
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#2e7d32",
  },
  loading: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
  },
  noPlants: {
    textAlign: "center",
    fontSize: "18px",
    color: "#777",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    padding: "20px",
    textAlign: "left",
    transition: "transform 0.2s",
  },
  cardTitle: {
    fontSize: "22px",
    marginBottom: "10px",
    color: "#2e7d32",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  bought: {
    color: "green",
    fontWeight: "bold",
  },
  notBought: {
    color: "red",
    fontWeight: "bold",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#1976d2",
    color: "#fff",
    fontWeight: "bold",
  },
};

export default UserPlants;
