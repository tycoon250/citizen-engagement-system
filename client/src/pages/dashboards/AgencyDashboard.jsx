import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';

export default function AgencyDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const [stats, setStats] = useState({ total: 0, in_review: 0, resolved: 0, rejected: 0 });
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    const fetchStatsAndComplaints = async () => {
      try {
        const statRes = await axios.get(`${import.meta.env.VITE_API_URL}/stats/agency/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(statRes.data);

        const complaintRes = await axios.get(`${import.meta.env.VITE_API_URL}/complaints/agency/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLatest(complaintRes.data.slice(0, 3)); // show only 3
      } catch (err) {
        console.error('Failed to load agency dashboard', err);
      }
    };

    fetchStatsAndComplaints();
  }, [user.id, token]);

  const colorMap = {
    total: 'border-blue-500 text-blue-600',
    in_review: 'border-yellow-500 text-yellow-600',
    resolved: 'border-green-500 text-green-600',
    rejected: 'border-red-500 text-red-600'
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Agency Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">Overview of your assigned complaints</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {Object.entries(stats).map(([key, val]) => (
          <div key={key} className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${colorMap[key]}`}>
            <h3 className="text-sm text-gray-500 capitalize">{key.replace('_', ' ')}</h3>
            <p className="text-2xl font-bold">{val}</p>
          </div>
        ))}
      </div>

      {/* Recent Complaints */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Latest Complaints</h2>
        {latest.length === 0 ? (
          <p className="text-sm text-gray-500">No complaints assigned yet.</p>
        ) : (
          <ul className="space-y-4">
            {latest.map((c) => (
              <li key={c.id} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-800">{c.category}</h4>
                    <p className="text-sm text-gray-600">{c.description}</p>
                    <p className="text-xs text-gray-400">From: {c.citizen_name}</p>
                  </div>
                  <a href={`/dashboard/agency/respond/${c.id}`} className="text-sm text-blue-600 hover:underline">
                    Respond
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
