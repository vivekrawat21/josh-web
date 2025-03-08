import React, { useState } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminSidebar from '../components/AdminSidebar';
import { Outlet } from 'react-router-dom';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

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
