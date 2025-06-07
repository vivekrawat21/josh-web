import React, { useState, useEffect } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { BASE_URL } from '../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import CustomToast from './CustomToast';
import { Link } from 'react-router-dom';
const AdminLogin = ({ setIsLoggedIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const showToast = (type, message) => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast({ ...toast, visible: false }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = { email, password };

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/auth/login`, userInfo, {
        withCredentials: true,
      });

      const role = res.data?.data?.user?.role;

      if (role !== 'admin') {
        showToast('error', 'Access Denied: You are not an admin');
        navigate('/admin/login');
        return;
      }

      dispatch(setUser(res.data.data.user));
      setIsLoggedIn(true);
      showToast('success', 'Successfully logged in as Admin');
      navigate('/admin/privacy');
    } catch (error) {
      console.error('Login failed:', error);
      showToast('error', error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin/privacy');
    }
  }, [user, navigate]);

  return (
    <div className="w-full md:h-[90%] md:w-2/5 lg:w-3/5 py-4 flex items-center justify-center my-auto">
      {toast.visible && (
        <CustomToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}

      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Login with Admin credentials
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="relative mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute right-2 top-9 text-gray-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div className="mb-4 text-right">
            <button
              type="submit"
              className={`w-full bg-orange-500 text-white py-2 px-4 rounded-md text-lg font-semibold transition duration-200 ${
                loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-orange-600'
              }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <div className="text-right">
            <Link
              to="/forgotpassword"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
