import React, { useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';

export default function SubmitComplaint() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const [form, setForm] = useState({
    category: '',
    description: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const payload = {
      user_id: user.id,
      category: form.category,
      description: form.description
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/complaints`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setSuccess(true);
      setForm({ category: '', description: '' });
    } catch (err) {
      setError('Failed to submit complaint');
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">Submit a Complaint</h1>

        {success && <p className="text-green-600 mb-4">Complaint submitted successfully!</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-md focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select a category</option>
              <option value="electricity">Electricity</option>
              <option value="water">Water</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="education">Education</option>
              <option value="healthcare">Healthcare</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows="5"
              value={form.description}
              onChange={handleChange}
              placeholder="Explain your complaint in detail..."
              required
              className="w-full border border-gray-300 p-3 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}
