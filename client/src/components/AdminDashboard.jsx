import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/utils';
import CustomToast from './CustomToast';
import { Eye, EyeOff } from 'lucide-react';

const AdminDashboard = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Toast state: message, type (success, error), and visibility
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  const showToast = (type, message) => {
    setToast({ type, message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(
        `${BASE_URL}/auth/adminpassword`,
        { oldPassword, newPassword },
        { withCredentials: true }
      );

      if (res.status === 200) {
        showToast('success', 'Password changed successfully!');
        setOldPassword('');
        setNewPassword('');
      } else {
        showToast('error', res.data?.message || 'Failed to change password');
      }
    } catch (error) {
      console.error(error);
      showToast('error', error.response?.data?.message || 'Error changing password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 sm:p-8 border rounded-lg shadow-lg relative bg-white
                    w-full sm:max-w-md
                    ">
      {/* CustomToast rendered conditionally */}
      {toast.visible && (
        <CustomToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}

      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Admin Password Reset</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">Old Password</label>
          <div className="relative">
            <input
              type={showOldPassword ? 'text' : 'password'}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md pr-12 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              required
              disabled={loading}
              placeholder="Enter your old password"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600 transition"
              tabIndex={-1}
              aria-label={showOldPassword ? 'Hide old password' : 'Show old password'}
            >
              {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md pr-12 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              required
              disabled={loading}
              placeholder="Enter your new password"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600 transition"
              tabIndex={-1}
              aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md text-white text-lg font-semibold transition
            ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-400'
            }`}
        >
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
