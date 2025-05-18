import React, { useState } from 'react';
import { register } from '../services/authService';
import { getRedirectPathByRole } from '../utils/roleRedirect';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'citizen'
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      const redirectPath = getRedirectPathByRole(res.role || form.role);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      window.location.href = redirectPath;
    } catch (err) {
      setError('Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-semibold text-gray-900 mb-1">Create your account</h2>
          <p className="text-gray-600 text-sm mb-6">Sign up to report and track complaints with ease</p>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none"
            >
              <option value="citizen">Citizen</option>
              <option value="admin">Admin</option>
              <option value="agency">Agency</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-md transition"
            >
              Sign up
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign in here
            </a>
          </p>
        </div>

        {/* Right Info Section */}
        <div className="hidden md:flex w-1/2 bg-gray-50 p-10 items-center justify-center">
          <div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">What happens after signing up?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              After creating your account, you'll be able to log in, submit complaints or feedback on
              public services, and track your submissions through the response process — all in one place.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
