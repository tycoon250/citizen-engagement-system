import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow px-6 py-6 flex justify-between items-center border-b">
      <h1 className="text-xl font-semibold text-gray-800">
        {user?.name || 'Welcome'}
      </h1>
      <button
        onClick={logout}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </header>
  );
}
