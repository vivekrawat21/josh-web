import { useEffect, useState } from "react";
import { FaChevronDown, FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "@fontsource/fugaz-one";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, setUser } from "@/features/user/userSlice";
import axios from "axios";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { BASE_URL } from "@/utils/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenCourse, setIsOpenCourse] = useState(false);
  const [bundles, setBundles] = useState([]);
  const [specialBundles, setSpecialBundles] = useState([]);
  const [trendingCourses, setTrendingCourses] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const loggedIn = !!user?.email; // Check if user exists
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const navigate = useNavigate();

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
      dispatch(logoutUser());
      setLoggedInUser(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

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
    
    const fetchBundles = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/course/getBundles`, { withCredentials: true });
        const allBundles = res.data.data.bundles;
        // Filter special bundles
        // console.log(allBundles)
        console.log(allBundles)
        // setSpecialBundlesData(allBundles);
        setBundles(allBundles)
        // setSpecialBundles(filteredSpecialBundles);
        // console.log(specialBundles)
      } catch (error) {
        console.error("Error fetching bundles:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/course/getCourses`, { withCredentials: true });
        const allCourses = res.data.data.courses;
        // console.log(allCourses)
        // Filter trending courses
        const filteredTrendingCourses = allCourses.filter(course => course.isTrending);
        setTrendingCourses(filteredTrendingCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (!user) {
      fetchUser();
    }

    fetchBundles();
    fetchCourses();
  }, []);
  const setSpecialBundlesData = (allBundles)=>{
    const filteredSpecialBundles = allBundles.filter(bundle => bundle.isSpecial);
    setSpecialBundles(filteredSpecialBundles);
    console.log(specialBundles)
  }
  useEffect (()=>{
    setSpecialBundlesData(bundles)
  },[bundles])
  useEffect(() => {
    if (user) {
      setLoggedInUser(true);
    } else {
      setLoggedInUser(false);
    }
  }, [user]);
  // useEffect(() => {
  //   fetchBundles();
  // },[specialBundles])
  return (
    <nav className="fixed top-0 left-0 right-0 mx-auto bg-white shadow-sm rounded-xl z-50 transition-all duration-300 py-1 px-auto">
      <div className="flex justify-between items-center font-['Fugaz One'] mx-auto max-w-[90%]">
        {/* Logo and Navigation Links */}
        <div className="flex items-center space-x-20 relative">
          <div className="flex flex-col items-center">
            <Link to="/">
              <img src="/logo1.png" alt="joshguru" className="w-[60px] md:w-[60px] h-[60px] md:h-[60px] object-cover" />
            </Link>
            <p className="absolute text-center font-bold text-[6px] md:text-[8px] top-[80%] text-gray-900 md:w-[130px] md:top-[75%]">
              Powered by <span className="text-gray-900">NIITF</span>
            </p>
          </div>

          <ul className="hidden md:flex items-center space-x-10 text-[16px] pt-4">
            <li>
              <Link to="/" className="hover:text-orange-400 text-md transition cursor-pointer">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-400 text-md transition cursor-pointer">
                About
              </Link>
            </li>
            <li className="relative group">
              <button
                className="flex items-center space-x-2 hover:text-orange-500 transition cursor-pointer"
                onClick={() => {
                  setIsOpenCourse(prev => !prev);
                  setIsRotating(prev => !prev);
                }}
              >
                <span className="text-md">Courses</span>
                <motion.div animate={{ rotate: isRotating ? 180 : 0 }}>
                  <FaChevronDown className="text-base transition-transform duration-300" />
                </motion.div>
              </button>

              {isOpenCourse && (
                <div className="absolute lg:left-[400%] left-1/2 top-full transform -translate-x-1/2 mt-2 bg-white shadow-2xl rounded-2xl p-8 w-[60vw] h-[60vh] grid grid-cols-3 gap-8 opacity-100 transition-opacity duration-300 pointer-events-auto overflow-y-auto border border-gray-200">
                  <div className="pr-6">
                    <h3 className="text-orange-500 text-md md:text-xl font-bold  mb-7">SPECIAL BUNDLES</h3>
                    <ul className="space-y-2 text-md ">
                      {specialBundles.map((bundle) => (
                        <li key={bundle._id} className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 
                        after:w-0 after:h-[0.5px] after:bg-orange-500 after:transition-all 
                        after:duration-300 hover:after:w-full">
                          <Link to={`/specialBundle/${bundle._id}`}>{bundle.bundleName}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pr-6">
                    <h3 className="text-orange-500 text-md md:text-xl font-bold  mb-7 ">TRENDING COURSES</h3>
                    <ul className="space-y-2 text-md  ">
                      {trendingCourses.map((course) => (
                        <li key={course._id} className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 
                        after:w-0 after:h-[0.5px] after:bg-orange-500 after:transition-all 
                        after:duration-300 hover:after:w-full">
                          <Link to={`/courses/${course.title}/${course._id}`}>{course.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pr-6">
                    <h3 className="text-orange-500 text-md md:text-xl font-bold mb-7 ">ALL BUNDLES</h3>
                    <ul className="space-y-2 text-md">
                      {bundles.map((bundle) => (
                        <li key={bundle._id} className="hover:text-orange-500 transition cursor-pointer">
                          <Link
                            to={`/courses/${bundle.bundleName}/${bundle._id}`}
                            className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 
                                  after:w-0 after:h-[0.5px] after:bg-orange-500 after:transition-all 
                                  after:duration-300 hover:after:w-full"
                          >
                            {bundle.bundleName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
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
            <DropdownMenu className="hidden md:inline">
              <DropdownMenuTrigger asChild>
                <FaUser className="text-3xl cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align=""
                sideOffset={5}
                className="relative w-full bg-white p-4 rounded-lg shadow-lg mt-8 right-12"
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
          )}

          {/* Mobile: Show Hamburger Menu Instead */}
          <button onClick={toggleSidebar} className="md:hidden text-2xl ml-auto text-gray-900 mr-4">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} loggedIn={loggedIn} logout={logout} />
    </nav>
  );
};

export default Navbar;
