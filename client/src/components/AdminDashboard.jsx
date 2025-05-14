import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/utils';
import MarkdownEditor from './MarkdownEditor';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('disclaimer');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabNames = {
    disclaimer: 'Disclaimer',
    refund: 'Refund Policy',
    license: 'License & Agreement',
    terms: 'Terms & Conditions'
  };

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false); // Close dropdown on mobile when a tab is selected
  };

  return (
    <div className="p-3 md:p-6 max-w-full">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Privacy Controller</h1>

      {/* Desktop Tabs - Hidden on small screens */}
      <div className="hidden md:flex space-x-2 lg:space-x-4 mb-4 border-b pb-2 overflow-x-auto">
        {Object.keys(tabNames).map(tab => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-3 py-2 md:px-4 whitespace-nowrap rounded-t transition-colors ${
              activeTab === tab 
                ? 'bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {tabNames[tab]}
          </button>
        ))}
      </div>

      {/* Mobile Dropdown - Visible only on small screens */}
      <div className="md:hidden mb-4 relative">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-full flex items-center justify-between bg-gray-100 px-4 py-2 rounded border"
        >
          <span>{tabNames[activeTab]}</span>
          <svg 
            className={`w-5 h-5 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {mobileMenuOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
            {Object.keys(tabNames).map(tab => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  activeTab === tab ? 'bg-gray-100 font-medium' : ''
                }`}
              >
                {tabNames[tab]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab Content */}
      <div className="border rounded p-2 md:p-4 bg-white shadow-sm">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <MarkdownEditor type={activeTab} data={selectedData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;