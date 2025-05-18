import React, { useState } from 'react';
import { login } from '../services/authService';
import { getRedirectPathByRole } from '../utils/roleRedirect';
export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const user = await login(form);
    const redirectPath = getRedirectPathByRole(user.role);
    window.location.href = redirectPath;
  } catch (err) {
    setError('Invalid email or password');
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-semibold text-gray-900 mb-1">Sign in</h2>
          <p className="text-gray-600 text-sm mb-6">Access your Citizen Engagement System dashboard</p>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-md transition"
            >
              Next
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6">
            New to the system?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Create an account
            </a>
          </p>
        </div>

        {/* Right Info Section */}
        <div className="hidden md:flex w-1/2 bg-gray-50 p-10 items-center justify-center">
          <div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">What is this system?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              This platform allows citizens to submit complaints or feedback about public services.
              You can track the progress of your submission, receive responses from government
              agencies, and stay updated in real time.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
