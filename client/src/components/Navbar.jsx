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
  const [isOpenCourse, setIsOpenCourse] = useState(false);
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
    <nav className="fixed top-0 left-0 right-0 mx-auto  bg-white shadow-sm  rounded-xl z-50 transition-all duration-300 py-1 px-auto ">
    <div className="flex justify-between items-center font-['Fugaz One'] mx-4">
      {/* Logo and Navigation Links */} 
      <div className="flex items-center space-x-20 relative ">
        <div className="flex flex-col items-center  ">
          <div className="flex flex-col items-center relative md:ml-8 ml-4">
            <Link to="/">
              <img
                src="/logo1.png"
                alt="joshguru"
                className="w-[50px] md:w-[60px]  h-[50px] md:h-[60px] object-cover"
              />
            </Link>
            <p
              className="absolute text-center font-bold 
            text-[6px] md:text-[8px] top-[80%] text-gray-900 md:w-[130px] md:top-[75%] md:left-[-%] "
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
              onClick={() => {
                setIsOpenCourse(prev=>!prev)
                setIsRotating(prev=>!prev)
              }}

            >
              
              <span className="text-md ">Courses</span>
              <motion.div animate={{ rotate: isRotating ? 180 : 0 }}>
                <FaChevronDown className="text-base transition-transform duration-300" />
              </motion.div>
            </button>
            {isOpenCourse && (
        <div className="absolute lg:left-[400%] left-1/2  top-full transform -translate-x-1/2 mt-4 bg-white shadow-2xl rounded-2xl p-8 w-[60vw] h-[60vh] grid grid-cols-3 gap-8 opacity-100 transition-opacity duration-300 pointer-events-auto overflow-y-auto border border-gray-200">
          {coursesData.map((category, index) => (
            <div key={index} className="pr-6">
              <h3 className="text-orange-500 text-xl font-bold mb-15 my-[40px] ">{category.category}</h3>
              <ul className="space-y-4 text-md">
                {category.courses.map((course) => (
                  <li key={course.id} className="hover:text-blue-500 transition cursor-pointer" onClick={() => {setIsOpenCourse(false);
                  setIsRotating(false)
                  }
                  }>
                    <Link to={`/courses/${course.title}/${course.id}`}>{course.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/cart">
          <FaShoppingCart className="text-4xl text-gray-900 shadow-md rounded-lg p-2 bg-transparent " />
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
          <button onClick={toggleSidebar} className="md:hidden text-2xl ml-auto text-gray-900 mr-4">
            {isSidebarOpen ? <FaTimes className=""/> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isLoggedIn={loggedIn} />
    </nav>
  );
};

export default Navbar;
