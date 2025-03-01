import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronDown, FaChevronUp, FaWallet, FaBook, FaGift, FaHeadset, FaUser, FaSignOutAlt, FaInfoCircle, FaUsers, FaVideo, FaBlog, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/features/user/userSlice";
import axios from "axios";
import { BASE_URL } from "@/utils/utils";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, isLoggedIn }) => {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
       toggleSidebar(true);
    } 
  }, [location.pathname]);
  

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
      dispatch(logoutUser());
        navigate("/login");
     
    } catch (error) {
      console.log(error);
    }
    toggleSidebar(false);
  };

  const coursesData = [
    {
      category: "MONETIZATION SERIES",
      courses: [
        { id: 1, title: "Excel and Earn using AI and ChatGPT" },
        { id: 2, title: "Content Creation Mastery" },
      ],
    },
    {
      category: "DIGITAL ENTREPRENEURSHIP BUNDLE",
      courses: [
        { id: 3, title: "Marketing Mastery" },
        { id: 4, title: "Branding Mastery" },
        { id: 5, title: "Traffic Mastery" },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-5 z-50 flex flex-col sidebar-container"
        >
          <button onClick={() => toggleSidebar(false)} className="self-end text-3xl text-gray-700">
            <FaTimes />
          </button>

          <nav className="mt-2 flex flex-col space-y-5 text-lg">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard/profile/personalinformation" className="flex items-center gap-3 hover:text-orange-500 transition">
                  <FaUser /> Personal Info
                </Link>
                <Link to="/about" className="flex items-center gap-3 hover:text-orange-500 transition">
                  <FaInfoCircle /> About
                </Link>
                <Link to="/dashboard/mywallet" className="flex items-center gap-3 hover:text-orange-500 transition">
                  <FaWallet /> My Wallet
                </Link>
                <Link to="/dashboard/mycourses" className="flex items-center gap-3 hover:text-orange-500 transition">
                  <FaBook /> My Courses
                </Link>
                <Link to="/dashboard/refer&earn" className="flex items-center gap-3 hover:text-orange-500 transition">
                  <FaGift /> Refer & Earn
                </Link>
                <Link to="/dashboard/helpandsupport" className="flex items-center gap-3 hover:text-orange-500 transition">
                  <FaHeadset /> Help & Support
                </Link>
                <Link to="/community" className="flex items-center gap-3 hover:text-orange-500 transition">
                  <FaUsers /> Community
                </Link>
                <Link to="/webinars" className="flex items-center gap-3 hover:text-orange-500 transition">
                  <FaVideo /> Webinars
                </Link>
                <Link to="/blogs" className="flex items-center gap-3 hover:text-orange-500 transition">
                  <FaBlog /> Blogs
                </Link>
                <button
                  onClick={handleLogout}
                 className="text-center border border-orange-500 text-orange-500 flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-orange-500 hover:text-white transition text-sm"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/about" className="flex items-center gap-3 hover:text-orange-500 transition">
                  <FaInfoCircle /> About
                </Link>
                <button onClick={() => setIsCoursesOpen(!isCoursesOpen)} className="flex gap-3 items-center justify-start w-full hover:text-orange-500 transition">
                  <FaBook /> Courses {isCoursesOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <AnimatePresence>
                  {isCoursesOpen && (
                    <motion.div className="ml-6 flex flex-col space-y-2 text-sm">
                      {coursesData.map((category, index) => (
                        <div key={index}>
                          <h3 className="text-black font-semibold text-xs">{category.category}</h3>
                          {category.courses.map((course) => (
                            <Link key={course.id} to={`/courses/${course.title}/${course.id}`} className="block text-gray-600 text-xs hover:text-blue-500">
                              {course.title}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                <Link to="/community" className="flex items-center gap-3 hover:text-orange-500 transition">
                  <FaUsers /> Community
                </Link>
                <Link to="/webinars" className="flex items-center gap-3 hover:text-orange-500 transition">
                  <FaVideo /> Webinars
                </Link>
                <Link to="/blogs" className="flex items-center gap-3 hover:text-orange-500 transition">
                  <FaBlog /> Blogs
                </Link>
                <Link to="/login" className="text-center border border-orange-500 text-orange-500 flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-orange-500 hover:text-white transition text-sm">
                  <FaSignInAlt /> Login
                </Link>
                
              </>
            )}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
