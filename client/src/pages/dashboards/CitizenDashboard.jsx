import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';

export default function CitizenDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    replied: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/stats/citizen/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to load dashboard stats');
      }
    };
    fetchStats();
  }, [user.id, token]);

  const colorClasses = {
    total: 'border-blue-500 text-blue-600',
    pending: 'border-yellow-500 text-yellow-600',
    resolved: 'border-green-500 text-green-600',
    replied: 'border-indigo-500 text-indigo-600'
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Welcome, {user?.name || 'Citizen'}
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        This is your personal dashboard. Track your complaints, get responses, and manage feedback.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className={`bg-white p-6 rounded-xl border-l-4 shadow-md ${colorClasses[key]}`}>
            <div className="text-sm text-gray-500 mb-1 capitalize">{key} complaints</div>
            <div className="text-2xl font-bold">{value}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
