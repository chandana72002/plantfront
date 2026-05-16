// src/pages/AdminAnalytics.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaLeaf, FaBell } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const StatCard = ({ icon, label, value, bgColor, iconColor }) => (
  <div className="stat-card" style={{ backgroundColor: bgColor }}>
    {React.cloneElement(icon, { style: { color: iconColor, fontSize: "2.5rem", marginRight: "1rem" } })}
    <div>
      <p className="stat-label">{label}</p>
      <h2 className="stat-value">{value}</h2>
    </div>
  </div>
);

const AdminAnalytics = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalPlants: 0, totalReminders: 0 });
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [statsRes, trendsRes] = await Promise.all([
          axios.get("https://plantbackend-mqgt.onrender.com/api/admin/stats"),
          axios.get("https://plantbackend-mqgt.onrender.com/api/admin/trends"),
        ]);
        setStats(statsRes.data);
        setTrendData(trendsRes.data);
      } catch (err) {
        setError("Failed to fetch analytics. Please check your backend.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );

  if (error) return <div className="error">{error}</div>;

  const chartData = [
    { name: "Users", count: stats.totalUsers },
    { name: "Plants", count: stats.totalPlants },
    { name: "Reminders", count: stats.totalReminders },
  ];

  const pieColors = ["#059669", "#1D4ED8", "#D97706"];

  return (
    <div className="container">
      {/* Stats Cards */}
      <div className="grid">
        <StatCard icon={<FaUsers />} label="Total Users" value={stats.totalUsers} bgColor="#D1FAE5" iconColor="#059669" />
        <StatCard icon={<FaLeaf />} label="Total Plants" value={stats.totalPlants} bgColor="#DBEAFE" iconColor="#1D4ED8" />
        <StatCard icon={<FaBell />} label="Total Reminders" value={stats.totalReminders} bgColor="#FEF3C7" iconColor="#D97706" />
      </div>

      {/* Bar Chart */}
      <div className="chart-container">
        <h3>Bar Chart: Analytics Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="chart-container">
        <h3>Pie Chart: Proportion Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="chart-container">
        <h3>Line Chart: Trends Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#059669" />
            <Line type="monotone" dataKey="plants" stroke="#1D4ED8" />
            <Line type="monotone" dataKey="reminders" stroke="#D97706" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Internal CSS */}
      <style>{`
        .container { padding: 2rem; font-family: Arial, sans-serif; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .stat-card { display: flex; align-items: center; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s; }
        .stat-card:hover { transform: scale(1.05); }
        .stat-label { color: #4B5563; margin: 0; font-size: 1rem; }
        .stat-value { font-size: 1.75rem; font-weight: bold; margin: 0.25rem 0 0; }
        .chart-container { background-color: #ffffff; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 2rem; }
        .chart-container h3 { margin-bottom: 1rem; font-size: 1.25rem; font-weight: bold; }
        .loader-container { display: flex; justify-content: center; align-items: center; height: 300px; }
        .loader { border: 6px solid #f3f3f3; border-top: 6px solid #4F46E5; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .error { color: #b91c1c; text-align: center; font-weight: bold; margin-top: 2rem; }
      `}</style>
    </div>
  );
};

export default AdminAnalytics;
