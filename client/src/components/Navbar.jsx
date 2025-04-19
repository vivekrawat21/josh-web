import { useEffect, useState, useRef } from "react";
import {
  FaChevronDown,
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "@fontsource/fugaz-one";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, setUser } from "@/features/user/userSlice";
import axios from "axios";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { BASE_URL } from "@/utils/utils";
// import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setBundle } from "@/features/bundles/BundleSlice";
import { addCourse } from "@/features/courses/courseSlice";
const special = [
  {
    _id: "1",
    bundleName: "Freelancing Road To 1 lakhs",
    link: "/basicBundle",
  },

  {
    _id: "2",
    bundleName: "Freelancing Road To 3 Lakhs",
    link: "/intermediateBundle",
  },

  {
    _id: "3",
    bundleName: "Freelancing Road To 5 Lakhs",
    link: "/advanceBundle",
  },
];

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpenCourse, setIsOpenCourse] = useState(false);
  const [bundles, setBundles] = useState([]);
  const [specialBundles, setSpecialBundles] = useState([]);
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [isRotating, setIsRotating] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loggedIn, setIsLoggedIn] = useState(!!user?.email);
  const navigate = useNavigate();

  const coursesDropdownRef = useRef(null);
  const coursesButtonRef = useRef(null);
  const cart = useSelector((state) => state.cart.cart);
  const cartItems = useSelector((state) => state.cart.cart);
  // if (cartItems) {
  //   console.log(cartItems.length);
  // }

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close dropdown if clicked outside
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpenCourse]);

  const logout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user`, {
          withCredentials: true,
        });
        dispatch(setUser(res.data.data.user));

        setIsLoggedIn(true);
      } catch {
        dispatch(logoutUser());
      }
    };

    const fetchBundles = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/course/getBundles`, {
          withCredentials: true,
        });
        const allBundles = res.data.data.bundles;
        setBundles(allBundles);
        dispatch(setBundle(allBundles));
      } catch (error) {
        // console.error("Error fetching bundles:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/course/getCourses`, {
          withCredentials: true,
        });
        const all = res?.data?.data.courses;
        setAllCourses(all);
        setTrendingCourses(all.filter((course) => course.isTrending));
        dispatch(addCourse(all));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (!user) fetchUser();
    fetchBundles();
    fetchCourses();
  }, [user, dispatch]);

  useEffect(() => {
    const filteredSpecialBundles = bundles.filter((bundle) => bundle.isSpecial);
    // setSpecialBundles(filteredSpecialBundles);
    setSpecialBundles(special);
  }, [bundles]);

  return (
    <nav className="fixed mb-0 top-0 left-0 right-0 mx-auto bg-white shadow-sm rounded-xl z-50 transition-all duration-300 py-1 px-auto">
      <div className="flex justify-between items-center font-['Fugaz One'] mx-auto max-w-[90%]">
        <div className="flex items-center space-x-20 relative">
          <div className="flex flex-col items-center">
            <Link to="/">
              <img
                src="/logo1.png"
                alt="joshguru"
                className="w-[60px] h-[60px] object-cover"
              />
            </Link>
            <p className="absolute text-center font-bold text-[6px] md:text-[8px] top-[63.5%] text-gray-900 md:w-[130px] md:top-[63%]">
              Powered by <span className="text-gray-900">NIITF</span>
            </p>
          </div>

          <ul className="hidden md:flex items-center space-x-10 text-[16px] pt-4">
            <li>
              <Link to="/" className="hover:text-orange-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-400 transition">
                About
              </Link>
            </li>
            <li className="relative group">
              <button
                ref={coursesButtonRef}
                className="flex items-center space-x-2 hover:text-orange-500 transition"
                onClick={() => {
                  setIsOpenCourse(!isOpenCourse);
                  setIsRotating(!isRotating);
                }}
              >
                <span>Courses</span>
                <motion.div animate={{ rotate: isRotating ? 180 : 0 }}>
                  <FaChevronDown className="text-base transition-transform duration-300" />
                </motion.div>
              </button>

              {isOpenCourse && (
                <div
                  ref={coursesDropdownRef}
                  className="absolute lg:left-[400%] left-1/2 top-full transform -translate-x-1/2 mt-2 shadow-2xl rounded-2xl p-8 w-[80vw] h-[50vh] grid grid-cols-4 gap-8 opacity-100 transition-opacity duration-300 pointer-events-auto overflow-y-auto border border-gray-200 bg-white"
                >
                  {/* Special Bundles */}
                  <div className="pr-6">
                    <h3 className="text-orange-500 text-xl font-bold mb-7">
                      SPECIAL BUNDLES
                    </h3>
                    <ul className="space-y-2 text-md">
                      {specialBundles.slice(0, 6).map((bundle) => (
                        <li
                          key={bundle._id}
                          className="hover:text-orange-500 transition"
                        >
                          <Link
                            to={`/specialBundle/${bundle._id}`}
                            className="relative hover:after:w-full after:transition-all after:duration-300"
                          >
                            {bundle?.bundleName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {specialBundles.length > 6 && (
                      <Link
                        to="/specialBundles"
                        className="text-sm text-orange-500 mt-2 inline-block"
                      >
                        See All →
                      </Link>
                    )}
                  </div>

                  {/* Trending Courses */}
                  <div className="pr-6">
                    <h3 className="text-orange-500 text-xl font-bold mb-7">
                      TRENDING COURSES
                    </h3>
                    <ul className="space-y-2 text-md">
                      {trendingCourses.slice(0, 6).map((course) => (
                        <li
                          key={course._id}
                          className="hover:text-orange-500 transition"
                        >
                          <Link to={`/course/${course._id}`}>
                            {course.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {trendingCourses.length > 6 && (
                      <Link
                        to="/courses/trending"
                        className="text-sm text-orange-500 mt-2 inline-block"
                      >
                        See All →
                      </Link>
                    )}
                  </div>

                  {/* All Bundles */}
                  <div className="pr-6">
                    <h3 className="text-orange-500 text-xl font-bold mb-7">
                      ALL BUNDLES
                    </h3>
                    <ul className="space-y-2 text-md">
                      {bundles.slice(0, 6).map((bundle) => (
                        <li
                          key={bundle._id}
                          className="hover:text-orange-500 transition"
                        >
                          <Link to={`/bundle/${bundle._id}`}>
                            {bundle?.bundleName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {bundles.length > 6 && (
                      <Link
                        to="/bundles"
                        className="text-sm text-orange-500 mt-2 inline-block"
                      >
                        See All →
                      </Link>
                    )}
                  </div>

                  {/* All Courses */}
                  <div className="pr-6">
                    <h3 className="text-orange-500 text-xl font-bold mb-7">
                      ALL COURSES
                    </h3>
                    <ul className="space-y-2 text-md">
                      {allCourses.slice(0, 6).map((course) => (
                        <li
                          key={course._id}
                          className="hover:text-orange-500 transition"
                        >
                          <Link to={`/course/${course?._id}`}>
                            {course?.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {allCourses.length > 6 && (
                      <Link
                        to="/courses"
                        className="text-sm text-orange-500 mt-2 inline-block"
                      >
                        See All →
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>

        {/* Right-side icons and auth */}
        <div className="flex items-center space-x-4">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 p-2 rounded-lg bg-white shadow hover:shadow-lg transition-all"
          >
            <FaShoppingCart className="text-3xl text-gray-800" />
            {cartItems?.length > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {!loggedIn ? (
            <div className="hidden md:flex space-x-4">
              <Link
                to="/login"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg"
              >
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
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <DropdownMenuItem>
                  <Link to="/dashboard/profile/personalinformation">
                    My Profile
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Link to="/dashboard/mywallet">My Wallet</Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <Link to="/dashboard/mycourses">My Courses</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard/help&support">Help and Support</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={logout}>Logout</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <button
            onClick={toggleSidebar}
            className="md:hidden text-2xl ml-auto text-gray-900 mr-4"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        isLoggedIn={loggedIn}
        logout={logout}
        bundles={bundles}
        specialBundles={specialBundles}
        trendingCourses={trendingCourses}
        allCourses={allCourses}
      />
    </nav>
  );
};

export default Navbar;
