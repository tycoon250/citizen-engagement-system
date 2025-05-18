import React from 'react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Complaints', value: 12, color: 'blue' },
    { label: 'Pending', value: 4, color: 'yellow' },
    { label: 'Resolved', value: 6, color: 'green' },
    { label: 'Replied', value: 2, color: 'indigo' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
    </div>
  );
}
