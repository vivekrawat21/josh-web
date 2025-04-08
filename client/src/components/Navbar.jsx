import { useEffect, useState, useRef } from "react";
import { FaChevronDown, FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
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
import { setBundle } from "@/features/bundles/BundleSlice";
import { addCourse,addTrendingCourses } from "@/features/courses/courseSlice";


const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenCourse, setIsOpenCourse] = useState(false);
  const [bundles, setBundles] = useState([]);
  const [specialBundles, setSpecialBundles] = useState([]);
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [isRotating, setIsRotating] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loggedIn ,setIsLoggedIn] = useState(!!user?.email);
  const navigate = useNavigate();

  const coursesDropdownRef = useRef(null);
  const coursesButtonRef = useRef(null);

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle clicks outside the courses dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpenCourse &&
        coursesDropdownRef.current &&
        !coursesDropdownRef.current.contains(event.target) &&
        !coursesButtonRef.current.contains(event.target)
      ) {
        setIsOpenCourse(false);
        setIsRotating(false);
       
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenCourse]);

  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
      dispatch(logoutUser());
      
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user`, { withCredentials: true });
        dispatch(setUser(res.data.data.user));
        setIsLoggedIn(true);
      } catch (error) {
        dispatch(logoutUser());
      }
    };

    const fetchBundles = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/course/getBundles`, { withCredentials: true });
        const allBundles = res.data.data.bundles;
        setBundles(allBundles);
        dispatch(setBundle(allBundles));
      } catch (error) {
        console.error("Error fetching bundles:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/course/getCourses`, { withCredentials: true });
        const allCourses = res.data.data.courses;
        const filteredTrendingCourses = allCourses.filter((course) => course.isTrending);
        setTrendingCourses(filteredTrendingCourses);
        // console.log(allCourses)
        dispatch(addCourse(allCourses));
        // dispatch(addTrendingCourses(filteredTrendingCourses));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (!user) {
      fetchUser();
    }

    fetchBundles();
    fetchCourses();
  }, [user, dispatch]);

  useEffect(() => {
    const filteredSpecialBundles = bundles.filter((bundle) => bundle.isSpecial);
    setSpecialBundles(filteredSpecialBundles);
  }, [bundles]);

  return (
    <nav className="fixed top-0 left-0 right-0 mx-auto bg-white shadow-sm rounded-xl z-50 transition-all duration-300 py-1 px-auto">
      <div className="flex justify-between items-center font-['Fugaz One'] mx-auto max-w-[90%]">
        {/* Logo and Navigation Links */}
        <div className="flex items-center space-x-20 relative">
          <div className="flex flex-col items-center">
            <Link to="/">
              <img
                src="/logo1.png"
                alt="joshguru"
                className="w-[60px] md:w-[60px] h-[60px] md:h-[60px] object-cover"
              />
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
                ref={coursesButtonRef}
                className="flex items-center space-x-2 hover:text-orange-500 transition cursor-pointer"
                onClick={() => {
                  setIsOpenCourse((prev) => !prev);
                  setIsRotating((prev) => !prev);
                }}
              >
                <span className="text-md">Courses</span>
                <motion.div animate={{ rotate: isRotating ? 180 : 0 }}>
                  <FaChevronDown className="text-base transition-transform duration-300" />
                </motion.div>
              </button>

              {isOpenCourse && (
  <div
    ref={coursesDropdownRef}
    className="absolute lg:left-[400%] left-1/2 top-full transform -translate-x-1/2 mt-2 bg-white shadow-2xl rounded-2xl p-8 w-[60vw] h-[60vh] grid grid-cols-3 gap-8 opacity-100 transition-opacity duration-300 pointer-events-auto overflow-y-auto border border-gray-200"
  >
    {/* Special Bundles */}
    <div className="pr-6">
      <h3 className="text-orange-500 text-md md:text-xl font-bold mb-7">SPECIAL BUNDLES</h3>
      <ul className="space-y-2 text-md">
        {specialBundles.map((bundle) => (
          <li key={bundle._id} className="hover:text-orange-500 transition cursor-pointer">
            <Link
              to={`/specialBundle/${bundle._id}`}
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

    {/* Trending Courses */}
    <div className="pr-6">
      <h3 className="text-orange-500 text-md md:text-xl font-bold mb-7">TRENDING COURSES</h3>
      <ul className="space-y-2 text-md">
        {trendingCourses.map((course) => (
          <li key={course._id} className="hover:text-orange-500 transition cursor-pointer">
            <Link
              to={`/course/${course._id}`}
              className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 
                    after:w-0 after:h-[0.5px] after:bg-orange-500 after:transition-all 
                    after:duration-300 hover:after:w-full"
            >
              {course.title}
            </Link>
          </li>
        ))}
      </ul>
      
    </div>

    {/* All Bundles */}
    <div className="pr-6">
      <h3 className="text-orange-500 text-md md:text-xl font-bold mb-7">ALL BUNDLES</h3>
      <ul className="space-y-2 text-md">
        {bundles.map((bundle) => (
          <li key={bundle._id} className="hover:text-orange-500 transition cursor-pointer">
            <Link
              to={`/bundle/${bundle._id}`}
              className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 
                    after:w-0 after:h-[0.5px] after:bg-orange-500 after:transition-all 
                    after:duration-300 hover:after:w-full"
            >
              {bundle.bundleName}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/courses" className="mt-4 block text-orange-500 font-semibold hover:underline">
        See All
      </Link>
    </div>
  </div>
)}

            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/cart">
            <FaShoppingCart className="text-4xl text-gray-900 shadow-md rounded-lg p-2 bg-transparent" />
          </Link>

          {!loggedIn ? (
            <div className="hidden md:flex space-x-4">
              <Link to="/login" className="bg-orange-500 text-white px-4 py-2 rounded-lg">
                Login
              </Link>
              <Link to="/signup" className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg">
                Register
              </Link>
            </div>
          ) : (
            <DropdownMenu className="hidden md:inline">
              <DropdownMenuTrigger asChild>
                <FaUser className="text-2xl cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align=""
                sideOffset={3}
                className="relative  bg-white p-4 rounded-lg shadow-lg  right-5 "
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
                  <Link to="/dashboard/help&support">
                    <p>Help and Support</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={logout}>Logout</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <button onClick={toggleSidebar} className="md:hidden text-2xl ml-auto text-gray-900 mr-4">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} isLoggedIn={loggedIn} logout={logout} bundles={bundles} specialBundles={specialBundles} trendingCourses={trendingCourses} />
    </nav>
  );
};

export default Navbar;
