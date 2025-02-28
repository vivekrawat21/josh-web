import React, { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
const Dashboard = () => {
  const [profileMenu, setProfileMenu] = useState(false);
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const toggleMenu = () => {

  //   setProfileMenu(!profileMenu);
  // };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex  relative">
      <div
        className={`hidden  md:flex flex-col bg-white/90 backdrop-blur-md p-5 w-1/5 top-16 left-0 transition-all duration-300 `}
      >
        <button
          className="flex items-center justify-between w-full text-gray-900 text-lg font-medium py-2 hover:text-orange-500 transition"
          onClick={() => setProfileMenu(!profileMenu)}
        >
          My Profile
          <FaChevronDown
            className={`transition-transform duration-300 ${
              profileMenu ? "rotate-180" : ""
            }`}
          />
        </button>
        {profileMenu && (
          <div className="bg-white p-3 mt-2  ">
            <ul className="space-y-2 text-gray-800 mt-2">
              <Link to="/dashboard/profile/personalinformation">
                <li className="hover:text-orange-500 transition cursor-pointer">
                  Personal Information
                </li>
              </Link>
              <Link to="/dashboard/profile/invoices">
                {" "}
                <li className="hover:text-orange-500 transition cursor-pointer">
                  Invoices
                </li>
              </Link>
              <Link to="/dashboard/profile/privacyandsecurity">
                {" "}
                <li className="hover:text-orange-500 transition cursor-pointer">
                  Privacy and Security
                </li>
              </Link>
            </ul>
          </div>
        )}
        <Link
          to="/dashboard/mywallet"
          className="text-gray-900 text-lg font-medium py-2 hover:text-orange-500 transition"
        >
          My Wallet
        </Link>
        <Link
          to="/dashboard/mycourses"
          className="text-gray-900 text-lg font-medium py-2 hover:text-orange-500 transition"
        >
          My Courses
        </Link>
        <Link
          to="/dashboard/refer&earn"
          className="text-gray-900 text-lg font-medium py-2 hover:text-orange-500 transition"
        >
          Refer and Earn
        </Link>
        <Link
          to="/dashboard/helpandsupport"
          className="text-gray-900 text-lg font-medium py-2 hover:text-orange-500 transition"
        >
          Help and support
        </Link>
      </div>
      <div className="border">

      </div>
      <div className="w-full md:w-4/5">
      <Outlet />
      </div>
     
    </div>
  )
};

export default Dashboard;
