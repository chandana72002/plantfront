// src/components/UserReminders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const UserReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const userId = localStorage.getItem("userId"); // ✅ use logged-in userId
        if (!userId) {
          console.error("⚠️ No userId found in localStorage");
          setLoading(false);
          return;
        }

        // ✅ Fetch reminders for this user
        const res = await axios.get(
          `http://https://plantbackend-mqgt.onrender.com/api/user/reminders`
        );
        setReminders(res.data);
      } catch (err) {
        console.error("Error fetching reminders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  if (loading) return <p style={styles.loading}>Loading reminders...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>⏰ My Reminders</h2>

      {reminders.length === 0 ? (
        <p style={styles.noReminders}>No reminders found.</p>
      ) : (
        <div style={styles.cardGrid}>
          {reminders.map((rem) => (
            <div key={rem._id} style={styles.card}>
              <h3 style={styles.cardTitle}>{rem.type || "Reminder"}</h3>
              <p>
                <strong>Plant:</strong> {rem.plantName || rem.plantId}
              </p>
              <p>
                <strong>Reminder Time:</strong>{" "}
                {rem.reminderTime
                  ? new Date(rem.reminderTime).toLocaleString()
                  : "-"}
              </p>
              <p style={rem.completed ? styles.completed : styles.pending}>
                {rem.completed ? "✔️ Completed" : "⏳ Pending"}
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
    color: "#1976d2",
  },
  loading: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
  },
  noReminders: {
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
    fontSize: "20px",
    marginBottom: "10px",
    color: "#1976d2",
  },
  completed: {
    color: "green",
    fontWeight: "bold",
  },
  pending: {
    color: "orange",
    fontWeight: "bold",
  },
};

export default UserReminders;
