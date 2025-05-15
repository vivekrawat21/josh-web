import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaBook, FaGift, FaSignOutAlt, FaVideo, FaBars, FaTimes } from 'react-icons/fa';
import { MdPolicy } from 'react-icons/md';
import { BiSolidOffer } from 'react-icons/bi';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/user/userSlice';
import { BASE_URL } from '../utils/utils';
import { FaChalkboardTeacher } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { VscFeedback } from "react-icons/vsc";
import { BiSolidInstitution } from "react-icons/bi";

const AdminSidebar = ({ isLoggedIn, setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when user clicks outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && e.target.id === 'mobile-menu-overlay') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    // Add overflow hidden to body when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

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

  const navLinks = [
    { path: '/admin/dashboard', icon: <MdPolicy />, text: 'Privacy' },
    { path: '/admin/courses', icon: <FaBook />, text: 'Courses' },
    { path: '/admin/bundles', icon: <FaBook />, text: 'Bundles' },
    { path: '/admin/students', icon: <FaGift />, text: 'Students' },
    { path: '/admin/mentors', icon: <FaChalkboardTeacher />, text: 'Mentor' },
    { path: '/admin/offers', icon: <BiSolidOffer />, text: 'Offers' },
    { path: '/admin/webinars', icon: <FaVideo />, text: 'Webinars' },
    { path: '/admin/gallery', icon: <GrGallery />, text: 'Gallery' },
    {path: '/admin/testimonials', icon: <VscFeedback />, text: 'Testimonials' },
    {path: '/admin/institutiontestimonials', icon: <BiSolidInstitution />, text: 'Institutional Testimonial' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation Link Component for both mobile and desktop
  const NavLink = ({ to, icon, children, onClick }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`flex items-center gap-2 font-medium py-3 transition-colors ${
          isActive 
            ? 'text-orange-500' 
            : 'text-gray-900 hover:text-orange-500'
        } ${isMobileMenuOpen ? 'text-lg' : 'text-base md:text-lg'}`}
      >
        {icon} {children}
      </Link>
    );
  };

  return (
    <>
      {/* Hamburger Menu Button - Visible on mobile only */}
      <div className="fixed top-2 right-4 z-50 md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-full bg-white shadow-md text-gray-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar - Hidden on mobile */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex flex-col bg-white shadow-lg p-5 w-64 min-h-screen fixed top-0 left-0 z-40"
      >
        {navLinks.map((link) => (
          <NavLink key={link.path} to={link.path} icon={link.icon}>
            {link.text}
          </NavLink>
        ))}
        
        <div className="mt-auto pb-5">
          <button
            onClick={isLoggedIn ? handleLogout : () => navigate('/admin/login')}
            className="border border-orange-500 text-orange-500 flex items-center justify-center gap-2 py-3 px-5 rounded-lg hover:bg-orange-500 hover:text-white transition w-full"
          >
            <FaSignOutAlt /> {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-50 p-5 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                <div className="py-4 border-b border-gray-200 mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Admin Menu</h2>
                </div>
                
                <div className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <NavLink 
                      key={link.path} 
                      to={link.path} 
                      icon={link.icon}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.text}
                    </NavLink>
                  ))}
                </div>
                
                <div className="mt-auto pb-5">
                  <button
                    onClick={isLoggedIn ? handleLogout : () => navigate('/admin/login')}
                    className="border border-orange-500 text-orange-500 flex items-center justify-center gap-2 py-3 px-5 rounded-lg hover:bg-orange-500 hover:text-white transition w-full"
                  >
                    <FaSignOutAlt /> {isLoggedIn ? 'Logout' : 'Login'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;