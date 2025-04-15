import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice" // Adjust import path
import { FaChevronDown, FaWallet, FaBook, FaGift, FaHeadset, FaUser, FaSignOutAlt } from "react-icons/fa";
import { BASE_URL } from "../utils/utils"; // Adjust import path
import axios from "axios";
import DashboardSidebar from "@/components/DashboardSidebar";
const Dashboard = () => {
  const [profileMenu, setProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async() => {
    const res = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    dispatch(logoutUser());
    navigate("/login"); // Redirect to Sign In page
  };

  return (
    <div className="w-full bg-gray-100 flex">
      {/* Sidebar */}
      <DashboardSidebar/>
      {/* Main Content */}
      <div className="w-full md:w-4/5 border-l border-gray-400 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
