import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function RatingStars({ value, onChange, readOnly = false }) {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= value ? 'filled' : ''}`}
          onClick={() => !readOnly && onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function UserDashboard() {
  const { logout, user } = useAuth();
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState({ name: '', address: '' });

  useEffect(() => {
    fetchStores();
  }, [search]);

  const fetchStores = async () => {
    const response = await axios.get('http://localhost:3000/stores', { params: search });
    const storesWithRatings = await Promise.all(
      response.data.map(async (store) => {
        try {
          const userRating = await axios.get(`http://localhost:3000/ratings/user/${store.id}`);
          return { ...store, userRating: userRating.data?.rating || 0 };
        } catch {
          return { ...store, userRating: 0 };
        }
      })
    );
    setStores(storesWithRatings);
  };

  const submitRating = async (storeId, rating) => {
    await axios.post('http://localhost:3000/ratings', { storeId, rating });
    fetchStores();
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="filters">
        <input
          placeholder="Search by name"
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
        />
        <input
          placeholder="Search by address"
          onChange={(e) => setSearch({ ...search, address: e.target.value })}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Address</th>
            <th>Overall Rating</th>
            <th>Your Rating</th>
            <th>Submit/Update Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>{store.averageRating}</td>
              <td>
                <RatingStars value={store.userRating} readOnly />
              </td>
              <td>
                <RatingStars
                  value={store.userRating}
                  onChange={(rating) => submitRating(store.id, rating)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
