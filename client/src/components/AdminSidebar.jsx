import React , {useState , useEffect} from 'react'
import { motion } from "framer-motion";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice" // Adjust import path
import { FaChevronDown, FaWallet, FaBook, FaGift, FaHeadset, FaUser, FaSignOutAlt } from "react-icons/fa";
import { BASE_URL } from "../utils/utils"; // Adjust import path
import axios from 'axios';
const AdminSidebar = () => {
    const [profileMenu, setProfileMenu] = useState(false);
      const dispatch = useDispatch();
      const navigate = useNavigate();
    const handleLogout = async() => {
      const res= await axios.post(`${BASE_URL}/auth/logout`,{},{
        withCredentials: true
      });
      dispatch(logoutUser());
      navigate("/login");
    
    }
  return (
    <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col bg-white shadow-lg p-5 w-1/5 min-h-screen text-base"
      >
        {/* Profile Dropdown */}
        <Link to="/admin/dashboard"
          className="flex items-center justify-between w-full text-gray-900 font-medium py-3 hover:text-orange-500 transition text-lg"
        
        >
          <div className="flex items-center gap-2">
            <FaUser className="text-gray-600" /> Dashboard
          </div>
          
        </Link>

        {/* {profileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 rounded-lg p-3 mt-2"
          >
            <ul className="space-y-2">
              <Link to="/dashboard/profile/personalinformation" className="flex items-center gap-2 hover:text-orange-500 transition">
                <FaUser /> Personal Info
              </Link>
              <Link to="/dashboard/profile/invoices" className="flex items-center gap-2 hover:text-orange-500 transition">
                <FaWallet /> Invoices
              </Link>
              <Link to="/dashboard/profile/privacyandsecurity" className="flex items-center gap-2 hover:text-orange-500 transition">
                <FaBook /> Privacy & Security
              </Link>
            </ul>
          </motion.div>
        )} */}

        {/* Sidebar Links */}
        {/* <Link to="/admin/dashboard" className="flex items-center gap-2 text-gray-900 font-medium py-3 hover:text-orange-500 transition text-lg">
          <FaBook />Dashboard
        </Link> */}
        <Link to="/admin/courses" className="flex items-center gap-2 text-gray-900 font-medium py-3 hover:text-orange-500 transition text-lg">
          <FaBook />Courses
        </Link>
        <Link to="/admin/students" className="flex items-center gap-2 text-gray-900 font-medium py-3 hover:text-orange-500 transition text-lg">
          <FaGift /> Students
        </Link>
        <Link to="/admin/settings" className="flex items-center gap-2 text-gray-900 font-medium py-3 hover:text-orange-500 transition text-lg">
          <FaHeadset /> Settings
        </Link>

        {/* Logout Button - Positioned Above the Bottom */}
        <div className="mt-64">
          <button
            onClick={handleLogout}
            className="border border-orange-500 text-orange-500 flex items-center justify-center gap-2 py-3 px-5 rounded-lg hover:bg-orange-500 hover:text-white transition text-lg w-full"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </motion.div> 

  )
}

export default AdminSidebar