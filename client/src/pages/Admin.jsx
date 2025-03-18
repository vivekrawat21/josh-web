import React, { useState, useEffect } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminSidebar from '../components/AdminSidebar';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const toggleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      // if (user.role === 'admin') {
      //   navigate('/admin/dashboard');
      // }
    }
    // Simulate a delay for loading (you can remove this part if not needed)
    setTimeout(() => setLoading(false), 1000); // Simulates a short delay before loading finishes
  }, [user]);

  // Loading indicator (could be a spinner or a simple text)
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      {isLoggedIn && (
        <AdminSidebar
          isLoggedIn={isLoggedIn}
          toggleLoggedIn={toggleLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      {/* Main Content */}
      <div className="w-full md:w-4/5 p-6">
        {!isLoggedIn ? (
          <AdminLogin
            setIsLoggedIn={setIsLoggedIn}
            toggleLoggedIn={toggleLoggedIn}
          />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Admin;
