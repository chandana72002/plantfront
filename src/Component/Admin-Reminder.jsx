// src/pages/AdminReminders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    plantId: "",
    userId: "",
    type: "",
    reminderTime: "",
    completed: false,
  });

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const res = await axios.get("https://plantbackend-mqgt.onrender.com/api/admin/reminders");
      setReminders(res.data);
    } catch (err) {
      console.error("Error fetching reminders", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewReminder({
      ...newReminder,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddReminder = async () => {
    try {
      await axios.post("https://plantbackend-mqgt.onrender.com/api/admin/reminders", newReminder);
      setNewReminder({
        plantId: "",
        userId: "",
        type: "",
        reminderTime: "",
        completed: false,
      });
      fetchReminders();
    } catch (err) {
      console.error("Error adding reminder", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://plantbackend-mqgt.onrender.com/api/admin/reminders/${id}`);
      fetchReminders();
    } catch (err) {
      console.error("Error deleting reminder", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🌱 Admin - Manage Reminders</h2>

      {/* Add Reminder Form */}
      <div style={styles.form}>
        <input
          style={styles.input}
          type="text"
          name="plantId"
          placeholder="Plant ID"
          value={newReminder.plantId}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          name="userId"
          placeholder="User ID"
          value={newReminder.userId}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          name="type"
          placeholder="Type (e.g. Watering)"
          value={newReminder.type}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="datetime-local"
          name="reminderTime"
          value={newReminder.reminderTime}
          onChange={handleChange}
        />
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="completed"
            checked={newReminder.completed}
            onChange={handleChange}
          />{" "}
          Completed
        </label>
        <button style={styles.addButton} onClick={handleAddReminder}>
          ➕ Add Reminder
        </button>
      </div>

      {/* Reminders Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Plant ID</th>
            <th style={styles.th}>User ID</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Reminder Time</th>
            <th style={styles.th}>Completed</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((reminder) => (
            <tr key={reminder.id} style={styles.tr}>
              <td style={styles.td}>{reminder.id}</td>
              <td style={styles.td}>{reminder.plantId}</td>
              <td style={styles.td}>{reminder.userId}</td>
              <td style={styles.td}>{reminder.type}</td>
              <td style={styles.td}>{reminder.reminderTime?.replace("T", " ")}</td>
              <td style={styles.td}>
                {reminder.completed ? "✅" : "❌"}
              </td>
              <td style={styles.td}>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(reminder.id)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 🎨 Internal CSS Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  heading: {
    marginBottom: "20px",
    color: "#2e7d32",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    flex: "1",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  addButton: {
    padding: "8px 14px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  tr: {
    transition: "background 0.2s",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#e53935",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AdminReminders;
