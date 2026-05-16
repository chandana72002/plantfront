// UserDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHome, FaLeaf, FaBell, FaCog } from "react-icons/fa";

const UserDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [data, setData] = useState({
    totalPlants: 0,
    totalReminders: 0,
    plants: [],
    reminders: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch user-specific data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId"); // ✅ must be MongoDB _id
        if (!userId) {
          console.error("No userId found in localStorage");
          setLoading(false);
          return;
        }

        // Fetch stats for the logged-in user
        const res = await axios.get(
          `http://localhost:8080/api/user/all/stats`
        );

        setData({
          totalPlants: res.data.totalPlants,
          totalReminders: res.data.totalReminders,
          plants: res.data.plants,
          reminders: res.data.reminders,
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p style={styles.loading}>Loading dashboard...</p>;

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <>
            <h1 style={styles.heading}>Welcome to PlantPal User Dashboard</h1>
            <div style={styles.cardsContainer}>
              <div style={styles.card}>
                <h2>{data.totalPlants}</h2>
                <p>My Plants</p>
              </div>
              <div style={styles.card}>
                <h2>{data.totalReminders}</h2>
                <p>My Reminders</p>
              </div>
            </div>
          </>
        );
      case "plants":
        return (
          <>
            <h2 style={styles.heading}>My Plants</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Added On</th>
                </tr>
              </thead>
              <tbody>
                {data.plants.map((plant) => (
                  <tr key={plant._id}>
                    <td>{plant._id}</td>
                    <td>{plant.name}</td>
                    <td>{new Date(plant.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );
      case "reminders":
        return (
          <>
            <h2 style={styles.heading}>My Reminders</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Plant</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.reminders.map((r) => (
                  <tr key={r._id}>
                    <td>{r._id}</td>
                    <td>{r.plantName}</td>
                    <td>{new Date(r.reminderTime).toLocaleString()}</td>
                    <td>{r.completed ? "✅ Done" : "⏳ Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );
      case "settings":
        return <h2 style={styles.heading}>Settings coming soon...</h2>;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>PlantPal User</h2>
        <nav style={styles.nav}>
          {[
            { name: "Dashboard", icon: <FaHome />, key: "dashboard", path: "/user/dashboard" },
            { name: "My Plants", icon: <FaLeaf />, key: "plants", path: "/user/plants" },
            { name: "My Reminders", icon: <FaBell />, key: "reminders", path: "/user/reminders" },
            { name: "Settings", icon: <FaCog />, key: "settings", path: "#" },
          ].map((item) => (
            <Link
              key={item.key}
              to={item.path}
              style={activePage === item.key ? styles.activeLink : styles.link}
              onClick={() => setActivePage(item.key)}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>{renderContent()}</main>
    </div>
  );
};

// Internal CSS (same style as AdminDashboard)
const styles = {
  container: { display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" },
  sidebar: {
    width: "250px",
    backgroundColor: "#2e7d32",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  logo: { textAlign: "center", marginBottom: "30px", fontSize: "24px", fontWeight: "bold" },
  nav: { display: "flex", flexDirection: "column", gap: "10px" },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    color: "#fff",
    textDecoration: "none",
    transition: "0.3s",
  },
  activeLink: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    color: "#fff",
    backgroundColor: "#1b5e20",
    fontWeight: "bold",
    textDecoration: "none",
  },
  main: { flex: 1, padding: "20px", backgroundColor: "#f5f5f5" },
  heading: { marginBottom: "20px" },
  cardsContainer: { display: "flex", gap: "20px", marginTop: "20px" },
  card: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  table: { width: "100%", borderCollapse: "collapse", marginTop: "10px" },
  "table th, table td": { border: "1px solid #ddd", padding: "8px" },
  loading: { textAlign: "center", marginTop: "50px", fontSize: "18px" },
};

export default UserDashboard;
