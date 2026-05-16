// AdminUsers.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "USER"
  });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://https://plantbackend-mqgt.onrender.com/api/admin/users");
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete a user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://https://plantbackend-mqgt.onrender.com/api/admin/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://https://plantbackend-mqgt.onrender.com/api/admin/users", newUser);
      setUsers([...users, res.data]);
      setNewUser({ username: "", email: "", role: "USER" });
    } catch (err) {
      alert("Failed to add user.");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-users-container">
      <h2>Admin - Users</h2>

      {/* Add User Form */}
      <form className="add-user-form" onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      {/* Users Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <FaEdit className="action-icon edit-icon" />
                <FaTrash
                  className="action-icon delete-icon"
                  onClick={() => handleDelete(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Internal CSS */}
      <style>{`
        .admin-users-container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .add-user-form {
          margin-bottom: 20px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .add-user-form input,
        .add-user-form select,
        .add-user-form button {
          padding: 8px;
          font-size: 14px;
        }

        .add-user-form button {
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
        }

        .add-user-form button:hover {
          background-color: #45a049;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
        }

        .users-table th,
        .users-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }

        .users-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        .users-table th {
          background-color: #f2f2f2;
        }

        .action-icon {
          cursor: pointer;
          margin-right: 10px;
        }

        .edit-icon {
          color: #2196F3;
        }

        .delete-icon {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default AdminUsers;
