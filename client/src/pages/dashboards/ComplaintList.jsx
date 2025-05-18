import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import axios from 'axios';

export default function MyComplaints() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const [complaints, setComplaints] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchComplaintsWithResponses = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/complaints/${user.id}/full`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setComplaints(res.data);
      } catch (err) {
        console.error('Failed to load complaints', err);
      }
    };

    fetchComplaintsWithResponses();
  }, [user.id, token]);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">My Complaints</h1>

        {complaints.length === 0 ? (
          <p className="text-gray-600 text-sm">No complaints yet.</p>
        ) : (
          <div className="space-y-4">
            {complaints.map((c) => (
              <div key={c.complaint_id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">{c.category}</h2>
                    <p className="text-sm text-gray-500">Submitted: {new Date(c.created_at).toLocaleDateString()}</p>
                    <p className={`text-sm mt-1 font-medium ${
                      c.status === 'pending' ? 'text-yellow-600' :
                      c.status === 'resolved' ? 'text-green-600' :
                      c.status === 'rejected' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      Status: {c.status}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelected(c)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative">
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✖
              </button>
              <h3 className="text-xl font-bold mb-2">{selected.category}</h3>
              <p className="text-sm text-gray-500 mb-1">
                Submitted: {new Date(selected.created_at).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mb-3">Status: {selected.status}</p>
              <hr className="mb-3" />
              <p className="text-gray-700 text-sm whitespace-pre-line mb-3">
                {selected.description}
              </p>

              {/* Responses */}
              {selected.responses?.length > 0 ? (
                <>
                  <h4 className="text-md font-semibold text-green-700 mt-4 mb-2">Responses:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {selected.responses.map((r, idx) => (
                      <li key={idx} className="border-l-2 pl-3 border-green-500">
                        <p><strong>{r.responder}</strong> — {new Date(r.time).toLocaleString()}</p>
                        <p>{r.message}</p>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-sm text-gray-500">No response yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
