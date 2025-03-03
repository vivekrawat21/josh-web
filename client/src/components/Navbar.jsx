import { useEffect, useState } from "react";
import { FaChevronDown, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "@fontsource/fugaz-one";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, setUser } from "@/features/user/userSlice";
import axios from "axios";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { BASE_URL } from "@/utils/utils";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      { id: 6, title: "Influence Mastery" },
      { id: 7, title: "Finance Mastery" },
      { id: 8, title: "Business Mastery" },
    ],
  },
  {
        category: "UPSKILLING COURSES",
        courses: [
          { id: 9, title: "Python Programming" },
          { id: 10, title: "React Development" },
          { id: 11, title: "Node.js Development" },
          { id: 12, title: "MongoDB Development" },
          { id: 13, title: "Express Development" },
          { id: 14, title: "JavaScript Development" },
        ],
  },

];

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loggedIn = !!user?.email; // Check if user exists
  const [loggedInUser,setLoggedInUser]= useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const navigator = useNavigate();

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const showProfile  = ()=>{
    console.log("Profile")
  }
  const logout = async() => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      // const res2 = await axios.post("http://localhost:3000/api/v1/auth/logout",{},{withCredentials: true});
      dispatch(logoutUser());
      // console.log(res2.data.data.user);
      setLoggedInUser(false);
      navigator("/login");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user`, { withCredentials: true });
        const fetchedUser = res.data.data.user;

        dispatch(setUser(fetchedUser));
      } catch (error) {
        dispatch(logoutUser());
      }
    };
    if (!user) {

    if(loggedInUser){
      fetchUser();
    }
    }
  }, [dispatch, user]);
  useEffect(() => {
    if (user) {
      setLoggedInUser(true); // User exists, set loggedIn to true
    } else {
      setLoggedInUser(false); // No user in store, set loggedIn to false
    }
  }, [user]);

  return (
    <nav className="fixed top-0 left-0 right-0 mx-auto  bg-white shadow-sm  rounded-xl z-50 transition-all duration-300 py-1 px-5 ">
    <div className="flex justify-between items-center font-['Fugaz One'] mx-4">
      {/* Logo and Navigation Links */} 
      <div className="flex items-center space-x-20 relative ">
        <div className="flex flex-col items-center ">
          <div className="flex flex-col items-center relative md:ml-8 ml-4">
            <Link to="/">
              <img
                src="/logo1.png"
                alt="Logo"
                className="w-[50px] md:w-[60px] ml-3 "
              />
            </Link>
            <p
              className="absolute text-center font-bold 
            text-[6px] md:text-[8px] top-[80%] text-gray-900 md:w-[130px] md:top-[75%] md:left-[-35%] "
            >
              Powered by <span className="text-gray-900">NIITF</span>
            </p>
          </div>
        </div>

        <ul className="hidden md:flex items-center space-x-10 text-gray-600  text-[16px] pt-4">

          <li>
            <Link to="/" className="hover:text-orange-400 text-md transition cursor-pointer ">
              Home
            </Link>

          </li>
          <li>
            <Link to="/about" className="hover:text-orange-400 text-md transition cursor-pointer ">
              About
            </Link>
          </li>
          <li className="relative group">
          <button
              className="flex items-center space-x-2 hover:text-orange-500 transition cursor-pointer"
              onMouseEnter={() => setIsRotating(true)}
              onMouseLeave={() => setIsRotating(false)}
            >
              
              <span className="text-md ">Courses</span>
              <motion.div animate={{ rotate: isRotating ? 180 : 0 }}>
                <FaChevronDown className="text-base transition-transform duration-300" />
              </motion.div>
            </button>
            <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg p-6 w-[600px] grid grid-cols-3 gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
              {coursesData.map((category, index) => (
                <div key={index} className="border-r border-gray-300 pr-4">
                  <h3 className=" text-orange-500 mb-4">
                    {category.category}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {category.courses.map((course) => (
                      <li
                        key={course.id}
                        className="hover:text-blue-500 transition cursor-pointer"
                      >
                        <Link to={`/courses/${course.title}/${course.id}`}>
                          {course.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/cart">
          <FaShoppingCart className="text-4xl text-gray-900 shadow-md rounded-lg p-2 bg-transparent mr-5" />
        </Link>
          {/* Desktop Login/Register (Hidden on Small Screens) */}
          {!loggedIn ? (
            <div className="hidden md:flex space-x-4">
              <Link to="/login" className="bg-orange-500 text-white px-4 py-2 rounded-lg">Login</Link>
              <Link to="/signup" className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg">Register</Link>
            </div>
          ) : (
            <div className="hidden md:inline ">
              
              <DropdownMenu  className="hidden md:inline">
              <DropdownMenuTrigger asChild>
                <FaUser className="text-3xl cursor-pointer " />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align=""
                sideOffset={5}
                className="relative w-full bg-white p-4 rounded-lg shadow-lg mt-8 right-12 "
              >
                <DropdownMenuItem>
                  <Link to="/dashboard/profile/personalinformation">
                    <p>My Profile</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard/mywallet">
                    <p>My Wallet</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard/mycourses">
                    <p>My Courses</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard/helpandsupport">
                    <p>Help and Support</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={logout}>Logout</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          )}

          {/* Mobile: Show Hamburger Menu Instead */}
          <button onClick={toggleSidebar} className="md:hidden text-2xl text-gray-900">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isLoggedIn={loggedIn} />
    </nav>
  );
};

export default Navbar;
