import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import {
  FaChevronDown,
  FaWallet,
  FaBook,
  FaGift,
  FaHeadset,
  FaUser,
  FaSignOutAlt,
  // FaVideo,
} from "react-icons/fa";
import { BASE_URL } from "../utils/utils";
import axios from "axios";

const DashboardSidebar = () => {
  const [profileMenu, setProfileMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden md:flex flex-col bg-white shadow-2xl border-r border-orange-100 p-6 w-64 min-h-screen text-base relative " 
      style={{
        background:
          "linear-gradient(135deg, #fff 80%, #fff7ed 100%)",
      }}
    >
      {/* Profile Dropdown */}
      <div className="mb-4">
        <button
          className="w-full flex items-center justify-between text-gray-900 font-semibold py-3 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 transition"
          onClick={() => setProfileMenu((v) => !v)}
        >
          <div className="flex items-center gap-3">
            <FaUser className="text-orange-500 text-xl" />
            <span>My Profile</span>
          </div>
          <FaChevronDown
            className={`transition-transform duration-300 ${
              profileMenu ? "rotate-180" : ""
            }`}
          />
        </button>
        {profileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="bg-orange-50 rounded-xl shadow-inner p-3 mt-2"
          >
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard/profile/personalinformation"
                  className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-orange-100 text-gray-800 hover:text-orange-600 transition"
                >
                  <FaUser /> Personal Info
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/profile/invoices"
                  className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-orange-100 text-gray-800 hover:text-orange-600 transition"
                >
                  <FaWallet /> Invoices
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/profile/privacyandsecurity"
                  className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-orange-100 text-gray-800 hover:text-orange-600 transition"
                >
                  <FaBook /> Privacy & Security
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </div>

      {/* Sidebar Links */}
      <nav className="flex-1 flex flex-col gap-1">
        <Link
          to="/dashboard/mywallet"
          className="flex items-center gap-3 text-gray-900 font-medium py-3 px-3 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition"
        >
          <FaWallet className="text-orange-400" /> My Wallet
        </Link>
        <Link
          to="/dashboard/mycourses"
          className="flex items-center gap-3 text-gray-900 font-medium py-3 px-3 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition"
        >
          <FaBook className="text-orange-400" /> My Courses
        </Link>
        <Link
          to="/dashboard/refer&earn"
          className="flex items-center gap-3 text-gray-900 font-medium py-3 px-3 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition"
        >
          <FaGift className="text-orange-400" /> Refer & Earn
        </Link>
        {/* <Link
          to="/dashboard/webinars"
          className="flex items-center gap-3 text-gray-900 font-medium py-3 px-3 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition"
        >
          <FaVideo className="text-orange-400" /> Webinars
        </Link> */}
        <Link
          to="/dashboard/help&support"
          className="flex items-center gap-3 text-gray-900 font-medium py-3 px-3 rounded-xl hover:bg-orange-100 hover:text-orange-600 transition"
        >
          <FaHeadset className="text-orange-400" /> Help & Support
        </Link>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-8 flex items-center gap-3 w-full py-3 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow hover:from-orange-600 hover:to-orange-700 transition"
      >
        <FaSignOutAlt className="text-lg" />
        Logout
      </button>
    </motion.aside>
  );
};

export default DashboardSidebar;
