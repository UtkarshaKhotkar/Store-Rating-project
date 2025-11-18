import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [users, stores, ratings] = await Promise.all([
        axios.get('http://localhost:3000/users/count'),
        axios.get('http://localhost:3000/stores/count'),
        axios.get('http://localhost:3000/ratings/count'),
      ]);
      setStats({ users: users.data, stores: stores.data, ratings: ratings.data });
    };
    fetchStats();
  }, []);

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Users</h3>
        <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.users}</p>
      </div>
      <div className="stat-card">
        <h3>Total Stores</h3>
        <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.stores}</p>
      </div>
      <div className="stat-card">
        <h3>Total Ratings</h3>
        <p style={{ fontSize: '32px', fontWeight: 'bold' }}>{stats.ratings}</p>
      </div>
    </div>
  );
}

function Users() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:3000/users', { params: filters });
    setUsers(response.data);
  };

  return (
    <div>
      <h2>Users</h2>
      <div className="filters">
        <input placeholder="Name" onChange={(e) => setFilters({ ...filters, name: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setFilters({ ...filters, email: e.target.value })} />
        <select onChange={(e) => setFilters({ ...filters, role: e.target.value })}>
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="store_owner">Store Owner</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Stores() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    const response = await axios.get('http://localhost:3000/stores');
    setStores(response.data);
  };

  return (
    <div>
      <h2>Stores</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.averageRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminDashboard() {
  const { logout } = useAuth();

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div>
          <Link to="/admin" style={{ marginRight: '20px' }}>Dashboard</Link>
          <Link to="/admin/users" style={{ marginRight: '20px' }}>Users</Link>
          <Link to="/admin/stores" style={{ marginRight: '20px' }}>Stores</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/stores" element={<Stores />} />
      </Routes>
    </div>
  );
}
