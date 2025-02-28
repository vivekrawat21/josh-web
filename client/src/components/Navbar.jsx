import { useEffect, useState } from "react";
import { FaChevronDown, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "@fontsource/fugaz-one";
import { CgProfile } from "react-icons/cg";
import { BASE_URL } from "@/utils/utils";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/features/user/userSlice";
import { setUser } from "@/features/user/userSlice";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// const coursesData = [
//   {
//     category: "MONETIZATION SERIES",
//     courses: ["Excel and Earn using AI and ChatGPT", "Content Creation Mastery"],
//   },
//   {
//     category: "DIGITAL ENTREPRENEURSHIP BUNDLE",
//     courses: [
//       "Marketing Mastery",
//       "Branding Mastery",
//       "Traffic Mastery",
//       "Influence Mastery",
//       "Finance Mastery",
//       "Business Mastery",
//     ],
//   },
//   {
//     category: "UPSKILLING COURSES",
//     courses: [
//       "Development",
//       "Business",
//       "Finance",
//       "Personal Development",
//       "Design",
//       "Office Productivity",
//     ],
//   },
// ];
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
      { id: 9, title: "Development" },
      { id: 10, title: "Business" },
      { id: 11, title: "Finance" },
      { id: 12, title: "Personal Development" },
      { id: 13, title: "Design" },
      { id: 14, title: "Office Productivity" },
    ],
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentRoute = location.pathname;
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const user = useSelector((state) => state.user);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  // const fetchUser = async ()=>{
  //   try{
  //     const res = await axios.post(`${BASE_URL}/user `,{
  //         withCredentials: true
  //       }
  //     );

  //     dispatch(setUser(res.data.data.user));
  //     console.log(res)
  //   }
  //   catch(error){
  //     setLoggedIn(false);
  //   }
  // }
  const logout = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      // const res2 = await axios.post("http://localhost:3000/api/v1/auth/logout",{},{withCredentials: true});
      dispatch(logoutUser());
      // console.log(res2.data.data.user);
      setLoggedIn(false);
      navigator("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchUser();

  //   if (user) {
  //     setLoggedIn(true);
  //   }

  // },[user])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user`, {
          withCredentials: true,
        });
        const fetchedUser = res.data.data.user;

        // Update Redux store with fetched user
        // if(!user){
        //   setLoggedIn(false);
        // }
        setLoggedIn(true);
        dispatch(setUser(fetchedUser));
      } catch (error) {
        console.log(error);
        // setLoggedIn(false);
        // If error occurs (e.g., user is not authenticated), clear the Redux store
        dispatch(logoutUser());
      }
    };

    if (!user) {
      // setLoggedIn(false);
      if (loggedIn) {
        fetchUser();
      }

      // Fetch the user if not present in the Redux store
    }
  }, [user, dispatch]);
  useEffect(() => {
    if (user) {
      setLoggedIn(true); // User exists, set loggedIn to true
    } else {
      setLoggedIn(false); // No user in store, set loggedIn to false
    }
  }, [user]);

  return (
    <nav className="fixed top-0 left-0 right-0 mx-auto backdrop-blur-md bg-white/40 shadow-sm p-4 rounded-xl z-50 transition-all duration-300 ">
      <div className="flex justify-between items-center font-['Fugaz One'] mx-4">
        {/* Logo and Navigation Links */}
        <div className="flex items-center space-x-20 relative ">
          <div className="flex flex-col items-center pb-4">
            <div className="flex flex-col items-center relative md:ml-8 ml-4">
              <Link to="/">
                <img
                  src="/logo1.png"
                  alt="Logo"
                  className="w-[55px] md:w-[60px] "
                />
              </Link>
              <p
                className="absolute md:text-[11px] text-center font-bold 
              text-[8px] top-[80%] text-gray-900 md:w-[130px] md:top-[75%] md:left-[-50%] "
              >
                Powered by <span className="text-gray-900">NIITF</span>
              </p>
            </div>
          </div>

          <ul className="hidden md:flex items-center space-x-10 text-gray-900 font-medium text-[16px]">
            <li>
              <Link to="/about" className="hover:text-orange-400 text-md transition cursor-pointer font-semibold">
                About
              </Link>
            </li>
            <li className="relative group">
            <button
                className="flex items-center space-x-2 hover:text-orange-500 transition cursor-pointerg"
                onMouseEnter={() => setIsRotating(true)}
                onMouseLeave={() => setIsRotating(false)}
              >
                
                <span className="text-md font-semibold">Courses</span>
                <motion.div animate={{ rotate: isRotating ? 180 : 0 }}>
                  <FaChevronDown className="text-base transition-transform duration-300" />
                </motion.div>
              </button>
              <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-lg p-6 w-[600px] grid grid-cols-3 gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                {coursesData.map((category, index) => (
                  <div key={index} className="border-r border-gray-300 pr-4">
                    <h3 className="font-semibold text-orange-500 mb-4">
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

          {loggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <CgProfile className="text-3xl cursor-pointer " />
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
                  <Link to="/dashboard/profile/mywallet">
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
          ) : (
            <div className="hidden md:flex space-x-4 items-center">
              <Link to="/login">
                <button className="px-5 py-2 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg shadow-md hover:bg-orange-100 transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-5 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          <motion.button
            className="md:hidden text-2xl focus:outline-none"
            onClick={toggleMenu}
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
          {isMenuOpen && (
            <div className="md:hidden absolute top-20 left-0   w-[90%] bg-white/95 shadow-md rounded-lg p-4 mt-4 flex flex-col items-center space-y-4">
              <Link
                to="/about"
                className="hover:text-orange-400 transition cursor-pointer"
              >
                About
              </Link>
              <Link
                to="/courses"
                className="hover:text-orange-400 transition cursor-pointer"
              >
                Courses
              </Link>
              {loggedIn ? (
                <>
                  <Link
                    to="/dashboard/profile/personalinformation"
                    className=" hover:text-orange-400 transition cursor-pointer"
                  >
                    Personal Information
                  </Link>
                  <Link
                    to="/dashboard/profile/personalinformation"
                    className=" hover:text-orange-400 transition cursor-pointer"
                  >
                    My Wallet
                  </Link>
                  <Link
                    to="/dashboard/mycourses"
                    className="hover:text-orange-400 transition cursor-pointer"
                  >
                    My Courses
                  </Link>
                  <Link
                    to="/dashboard/helpandsupport"
                    className="hover:text-orange-400 transition cursor-pointer"
                  >
                    Help and Support
                  </Link>
                  <button
                    onClick={logout}
                    className="text-red-500 hover:text-red-700 transition cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full text-center py-2 bg-orange-500 text-white rounded-lg font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full text-center py-2 border border-orange-500 text-orange-500 rounded-lg font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
