import React from 'react';
import { Link } from 'react-router-dom';

const roleLinks = {
  citizen: [
    { label: 'Dashboard', path: '/dashboard/citizen' },
    { label: 'My Complaints', path: '/dashboard/citizen/complaints' },
    { label: 'Submit Complaint', path: '/dashboard/complaint/new' }
  ],
  agency: [
    { label: 'Dashboard', path: '/dashboard/agency' },
    { label: 'Assigned Cases', path: '/dashboard/agency/complaints' }
  ],
  admin: [
    { label: 'Dashboard', path: '/dashboard/admin' },
    { label: 'Manage Agencies', path: '/dashboard/admin/agencies' },
    { label: 'Users', path: '/dashboard/admin/users' }
  ]
};

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const links = roleLinks[user?.role] || [];

  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-lg font-bold text-blue-600">Menu</h2>
      </div>
      <nav className="p-4 space-y-3">
        {links.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            className="block px-4 py-2 rounded hover:bg-blue-50 text-sm font-medium text-gray-700"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
