import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/utils';
import MarkdownEditor from './MarkdownEditor'; // Assuming you have a MarkdownEditor component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('disclaimer');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/privacy/getAll`, {
          withCredentials: true,
        });
        if (res.data) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error("Error while fetching all data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectedData = data.find(item => item.contentType === activeTab);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4 border-b pb-2">
        {['disclaimer', 'refund', 'license', 'terms'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t ${
              activeTab === tab ? 'bg-gray-600 text-white' : 'bg-gray-100'
            }`}
          >
            {tab === 'disclaimer'
              ? 'Disclaimer'
              : tab === 'refund'
              ? 'Refund Policy'
              : tab === 'license'
              ? 'License & Agreement'
              : 'Terms & Conditions'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="border rounded p-4 bg-white shadow-sm">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <MarkdownEditor type={activeTab} data={selectedData} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
