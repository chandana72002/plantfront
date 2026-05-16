// AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaLeaf, FaBell, FaChartLine, FaCog } from "react-icons/fa";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [data, setData] = useState({
    totalUsers: 0,
    totalPlants: 0,
    totalReminders: 0,
    users: [],
    plants: [],
    reminders: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch dynamic data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats from /admin/stats
        const statsRes = await axios.get("http://localhost:8080/api/admin/stats");

        setData({
          totalUsers: statsRes.data.totalUsers,
          totalPlants: statsRes.data.totalPlants,
          totalReminders: statsRes.data.totalReminders,
          users: statsRes.data.users,
          plants: statsRes.data.plants,
          reminders: statsRes.data.reminders,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching admin data:", err);
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
            <h1 style={styles.heading}>Welcome to PlantPal Admin Dashboard</h1>
            <div style={styles.cardsContainer}>
              <div style={styles.card}>
                <h2>{data.totalUsers}</h2>
                <p>Total Users</p>
              </div>
              <div style={styles.card}>
                <h2>{data.totalPlants}</h2>
                <p>Total Plants</p>
              </div>
              <div style={styles.card}>
                <h2>{data.totalReminders}</h2>
                <p>Total Reminders</p>
              </div>
            </div>
          </>
        );
      case "users":
        return (
          <>
            <h2 style={styles.heading}>Users</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username || user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );
      case "plants":
        return (
          <>
            <h2 style={styles.heading}>Plants</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {data.plants.map((plant) => (
                  <tr key={plant.id}>
                    <td>{plant.id}</td>
                    <td>{plant.name}</td>
                    <td>{plant.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );
      case "reminders":
        return (
          <>
            <h2 style={styles.heading}>Reminders</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Plant</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.reminders.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.plantName}</td>
                    <td>{r.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );
      case "analytics":
        return <h2 style={styles.heading}>Analytics coming soon...</h2>;
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
        <h2 style={styles.logo}>PlantPal Admin</h2>
        <nav style={styles.nav}>
          {[
            { name: "Dashboard", icon: <FaHome />, key: "dashboard", path: "/admin/dashboard" },
            { name: "Users", icon: <FaUsers />, key: "users", path: "/admin/users" },
            { name: "Plants", icon: <FaLeaf />, key: "plants", path: "/admin/plants" },
            { name: "Reminders", icon: <FaBell />, key: "reminders", path: "/admin/reminders" },
            { name: "Analytics", icon: <FaChartLine />, key: "analytics", path: "/admin/analytics" },
            { name: "Settings", icon: <FaCog />, key: "settings", path: "#" },
            { name: "Add Plants", icon: <FaLeaf />, key: "addplants", path: "/admin/plants/add" }
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

// Internal CSS
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

export default AdminDashboard;
