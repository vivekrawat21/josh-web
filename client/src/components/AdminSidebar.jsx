import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBook, FaGift,  FaSignOutAlt, FaVideo } from 'react-icons/fa';
import {BiSolidOffer} from 'react-icons/bi';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/user/userSlice';
import { BASE_URL } from '../utils/utils';
import { FaChalkboardTeacher } from "react-icons/fa";
import { is } from 'date-fns/locale';

const AdminSidebar = ({ isLoggedIn, setIsLoggedIn }) => {
  // const [profileMenu, setProfileMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
      dispatch(logoutUser());
      setIsLoggedIn(false); // Set login state to false after logout
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden md:flex flex-col bg-white shadow-lg p-5 w-1/5 min-h-screen text-base  "

    >
      <Link
        to="/admin/dashboard"
        className="flex items-center justify-between w-full text-gray-900 font-medium py-3 hover:text-orange-500 transition text-lg"
      >
        <div className="flex items-center gap-2">
          <FaUser className="text-gray-600" /> Dashboard
        </div>
      </Link>
      <Link to="/admin/courses" className="flex items-center gap-2 text-gray-900 font-medium py-3 hover:text-orange-500 transition text-lg ">
        <FaBook /> Courses
      </Link>
      <Link to="/admin/bundles" className="flex items-center gap-2 text-gray-900 font-medium py-3 hover:text-orange-500 transition text-lg">
        <FaBook /> Bundles
      </Link>
      <Link to="/admin/students" className="flex items-center gap-2 text-gray-900 font-medium py-3 hover:text-orange-500 transition text-lg">
        <FaGift /> Students
      </Link>
      <Link to="/admin/mentors" className="flex items-center gap-2 text-gray-900 font-medium py-3 hover:text-orange-500 transition text-lg">
        <FaChalkboardTeacher /> Mentor
      </Link>
      <Link to="/admin/offers"
        className="flex items-center gap-2 text-gray-900 font-medium py-3 hover:text-orange-500 transition text-lg"
      >
        <BiSolidOffer /> Offers
      </Link>
      <Link to="/admin/webinars"
        className="flex items-center gap-2 text-gray-900 font-medium py-3 hover:text-orange-500 transition text-lg"
      >
        <FaVideo /> Webinars
      </Link>
      <div className="mt-64">
        <button
          onClick={isLoggedIn ? handleLogout : null}
          className="border border-orange-500 text-orange-500 flex items-center justify-center gap-2 py-3 px-5 rounded-lg hover:bg-orange-500 hover:text-white transition fixed bottom-30 text-lg lg:w-64 "
        >
    {
      isLoggedIn ? (
        <>
          <FaSignOutAlt /> Logout
        </>
      ) : (
        <>
          <FaSignOutAlt /> Login
        </>
      )
    }
        </button>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;
