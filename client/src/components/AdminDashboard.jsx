import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/utils';
import CustomToast from './CustomToast';
import { Eye, EyeOff, ShieldCheck, ShieldX } from 'lucide-react';
import { useSelector } from 'react-redux';
const AdminDashboard = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const user = useSelector((state) => state.user);
  // console.log(user)
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getUsers`, {
        withCredentials: true,
      });
      setStudents(res.data.data.users);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

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

  const toggleAdminRole = async (studentId, isAdmin) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/user/updateRole`,
        { userId: studentId},
        { withCredentials: true }
      );
      // console.log(res.data)
      const isAdmin = res.data.data.updatedUser.role;
      // console.log(isAdmin)
      if (res.status === 200) {
        showToast('success', `User is ${isAdmin==='admin' ? 'admin now ' : 'no longer an admin now'}`);
        fetchStudents(); // Refresh list
      }
    } catch (error) {
      console.error(error);
      showToast('error', 'Failed to update role');
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  
      

      <div className="container mx-auto px-4 py-6">
  <div className="max-w-md mx-auto p-4 sm:p-6 md:p-8 border rounded-lg shadow-lg bg-white">
    {/* Toast */}
    {toast.visible && (
      <CustomToast
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    )}

    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
      Admin Password Reset
    </h2>

    <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700 text-sm sm:text-base">Old Password</label>
            <div className="relative">
              <input
                type={showOldPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md pr-12 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
                disabled={loading}
                placeholder="Enter your old password"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600"
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
                className="w-full p-3 border border-gray-300 rounded-md pr-12 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
                disabled={loading}
                placeholder="Enter your new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white text-lg font-semibold transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-400'
            }`}
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
        </form>
  </div>

  {/* Search Input */}
  <div className="mt-10">
    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full mb-6 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  </div>

  {/* Students Grid */}
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {filteredStudents.map((student) => (
      <div
        key={student._id}
        className="relative bg-white shadow-md rounded-xl p-4 sm:p-6 flex flex-col items-center text-center transition-transform duration-200 hover:scale-[1.02]"
      >
        {/* Role badge */}
        <div
          className={`absolute top-1 right-2 px-3 py-1 rounded-full text-xs font-bold z-10 ${
            student.role === 'admin'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {student.role === 'admin' ? 'Admin' : 'User'}
        </div>

        {/* Student Info */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">{student.name}</h3>
        <p className="text-sm text-gray-600 break-words">Email: {student.email}</p>
        <p className="text-sm text-gray-600">Mobile: {student.mobilenumber}</p>
       

        {/* Admin Toggle */}
        <button
          onClick={() => toggleAdminRole(student._id, student.isAdmin)}
          className={`mt-4 px-4 py-2 rounded-md text-sm font-medium transition w-full sm:w-auto ${
            student.role==='admin'
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {student.role==='admin' ?(
            <>
              <ShieldX className="inline mr-1" size={16} /> Remove Admin
            </>
          ) : (
            <>
              <ShieldCheck className="inline mr-1" size={16} /> Make Admin
            </>
          )}
        </button>
      </div>
    ))}
  </div>
</div>

    
  );
};

export default AdminDashboard;
