import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { logoutUser } from '../features/user/userSlice';
import { BASE_URL } from '../utils/utils';
import axios from 'axios';
import DashboardSidebar from '@/components/DashboardSidebar';

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.email) {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="w-full bg-gray-100 flex">
      {/* Sidebar */}
      <DashboardSidebar handleLogout={handleLogout} />
      {/* Main Content */}
      <div className="w-full md:w-4/5 border-l border-gray-400 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
