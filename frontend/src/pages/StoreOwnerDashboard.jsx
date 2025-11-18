import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function StoreOwnerDashboard() {
  const { logout, user } = useAuth();
  const [storeData, setStoreData] = useState(null);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchStoreData();
  }, []);

  const fetchStoreData = async () => {
    try {
      const userResponse = await axios.get(`http://localhost:3000/users/${user.id}`);
      if (userResponse.data.store) {
        const storeId = userResponse.data.store.id;
        const ratingsResponse = await axios.get(`http://localhost:3000/ratings/store/${storeId}`);
        const storeResponse = await axios.get(`http://localhost:3000/stores/${storeId}`);
        
        const avgRating = ratingsResponse.data.length > 0
          ? (ratingsResponse.data.reduce((sum, r) => sum + r.rating, 0) / ratingsResponse.data.length).toFixed(1)
          : 0;
        
        setStoreData({ ...storeResponse.data, averageRating: avgRating });
        setRatings(ratingsResponse.data);
      }
    } catch (err) {
      console.error('Error fetching store data:', err);
    }
  };

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Store Owner Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>
      {storeData && (
        <>
          <div className="stat-card" style={{ marginBottom: '30px' }}>
            <h2>{storeData.name}</h2>
            <p>Average Rating: <strong>{storeData.averageRating}</strong></p>
            <p>Total Ratings: <strong>{ratings.length}</strong></p>
          </div>
          <h3>User Ratings</h3>
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Rating</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((rating) => (
                <tr key={rating.id}>
                  <td>{rating.user?.name}</td>
                  <td>{rating.rating} ★</td>
                  <td>{new Date(rating.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
