import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import axios from 'axios';

export default function RespondToComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const [complaint, setComplaint] = useState(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('in_review');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/complaints/user-with-responses/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const match = res.data.find(c => c.complaint_id === parseInt(id));
        if (!match) throw new Error('Complaint not found');
        setComplaint(match);
      } catch (err) {
        setError('Failed to load complaint');
      }
    };
    fetchComplaint();
  }, [id, user.id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/complaints/respond/${id}`, {
        responder_id: user.id,
        message
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await axios.put(`${import.meta.env.VITE_API_URL}/complaints/status/${id}`, {
        status
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess(true);
      setMessage('');
      navigate('/dashboard/agency');
    } catch (err) {
      setError('Failed to respond or update status');
    }
  };

  if (!complaint) return <Layout><p className="text-center p-6">{error || 'Loading complaint...'}</p></Layout>;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-3">Respond to Complaint #{complaint.complaint_id}</h2>
        <p className="text-sm text-gray-500 mb-1">Category: {complaint.category}</p>
        <p className="text-sm text-gray-500 mb-4">Status: {complaint.status}</p>
        <p className="text-gray-700 text-sm whitespace-pre-line mb-6">{complaint.description}</p>

        {complaint.responses.length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-2">Previous Responses:</h4>
            <ul className="space-y-2 text-sm">
              {complaint.responses.map((r, idx) => (
                <li key={idx} className="border-l-2 pl-3 border-green-500">
                  <p><strong>{r.responder}</strong> — {new Date(r.time).toLocaleString()}</p>
                  <p>{r.message}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Response</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              required
              className="w-full border border-gray-300 p-3 rounded-md"
              placeholder="Enter your response message here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-md"
            >
              <option value="in_review">In Review</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">Response submitted!</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Submit Response
          </button>
        </form>
      </div>
    </Layout>
  );
}
