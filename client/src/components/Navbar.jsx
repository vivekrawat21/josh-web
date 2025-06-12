import { useEffect, useState, useRef } from "react";
import {
  FaChevronDown,
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "@fontsource/fugaz-one";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, setUser } from "@/features/user/userSlice";
import axios from "axios";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { BASE_URL } from "@/utils/utils";
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
      title: "Freelancing Road To 1 lakhs",
      image: "/specialBundle1.png",
      titleColor: "#F2B46F",
      link: "basicBundle",
    },
    {
      title: "Freelancing Road To 3 Lakhs",
      image: "/specialBundle2.png",
      titleColor: "#88BD9F",
      link: "intermediateBundle",
    },
    {
      title: "Freelancing Road To 5 Lakhs",
      image: "/specialBundle3.png",
      titleColor: "#7C42B0",
      link: "advanceBundle",
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
  const [chooseSkill , setChooseSkill] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const coursesDropdownRef = useRef(null);
  const coursesButtonRef = useRef(null);
  const cartItems = useSelector((state) => state.cart.cart);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close on route change
  useEffect(() => {
    setIsOpenCourse(false);
    setIsRotating(false);
  }, [location]);

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
        const res = await axios.get(`${BASE_URL}/user`, {
          withCredentials: true,
        });
        dispatch(setUser(res.data.data.user));
      } catch {
        dispatch(logoutUser());
      }
    };

    const fetchBundles = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bundle/getBundles`, {
          withCredentials: true,
        });
        const allBundles = res?.data?.data.bundles;
        setBundles(allBundles);
        dispatch(setBundle(allBundles));
      } catch (error) {
        console.error("Error fetching bundles:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/course/getCourses`, {
          withCredentials: true,
        });
        const all = res?.data?.data.courses;
        setChooseSkill(all.filter((course) => !course.isTrending));
        setAllCourses(all);
        setTrendingCourses(all.filter((course) => course.isTrending));
        dispatch(addCourse(all));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (!user || !user.email) fetchUser();
    fetchBundles();
    fetchCourses();
  }, [user, dispatch]);

  useEffect(() => {
    setSpecialBundles(special);
  }, [bundles]);

  const [digitalBundles, setDigitalBundles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/digitalBundle/getDigitalBundles`);
        console.log("digital bundles response:", response.data.data.bundles);
        
        setDigitalBundles(response.data.data.bundles); // pick first 3 bundles only
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        console.error("Error fetching bundles:", error);
      }
    };
    fetchBundles();
  }, []);

  const mergedBundles = [...digitalBundles].reverse().map((digitalBundles, index) => ({
    ...special[index],
    ...digitalBundles,
    _id: digitalBundles._id || `fallback-${index}`,
    title: special[index].title || digitalBundles.title,
  }));

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm rounded-xl z-50 py-1 px-auto">
      <div className="flex justify-between items-center font-['Fugaz One'] mx-auto max-w-[90%]">
        <div className="flex items-center space-x-20 relative">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="flex flex-col items-center">
           
              <img
                src="/logo1.png"
                alt="joshguru"
                className="w-[60px] h-[60px] object-cover"
              />
            
            <p className="absolute text-[6px] md:text-[8px] top-[63.5%] text-gray-900  md:w-[130px] md:top-[63%] text-center font-bold">
              Powered by <span className="text-gray-900">NIITF</span>
            </p>
          </div>
          </Link>
          <ul className="hidden md:flex items-center space-x-10 text-[16px] pt-4">
            <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-orange-400  transition font-semibold">Home</Link></li>
            <li><Link to="/about" className="hover:text-orange-400 transition font-semibold">About</Link></li>
            <li className="relative ">
              <button
                ref={coursesButtonRef}
                className="flex items-center  gap-1 hover:text-orange-500"
                onClick={() => {
                  setIsOpenCourse(!isOpenCourse);
                  setIsRotating(!isRotating);
                }}
              >
                <span className="font-semibold">Courses</span>
                <motion.div animate={{ rotate: isRotating ? 180 : 0 }} className="mt-[0.17rem]">
                  <FaChevronDown className="text-base" /
                  >
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpenCourse && (
                  <motion.div
                    ref={coursesDropdownRef}
                    className="absolute lg:left-[-370%]   transform -translate-x-1/2 mt-2 shadow-2xl rounded-2xl px-8 py-4 w-[90vw] h-[44vh] grid grid-cols-4 gap-8 border bg-white border-gray-200 overflow-y-auto z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {[
                      { title: "SPECIAL BUNDLES", items: bundles, type: "bundle" },
                      { title: "TRENDING COURSES", items: trendingCourses, type: "course" }, 
                      { title: "DIGITAL LEARNING BUNDLES", items: mergedBundles, type: "digitallearningbundles" },
                      { title: "CHOOSE YOUR SKILL", items: chooseSkill, type: "course" },
                    ].map((section, idx) => (
                      <div className="pr-6" key={idx}>
                        <h2 className="text-orange-500 text-sm font-bold mb-2 whitespace-nowrap">{section.title}</h2>

                        <ul className="space-y-2 text-md">
                          {section.items.slice(0, 6).map((item) => (
                            <li key={item._id}>
                              <Link
                                to={
                                  section.type === "digitallearningbundles"
                                    ? `/${section.type}/${item.link}/${item._id}`
                                    : `/${section.type}/${item._id}`
                                }

                                className="relative group transition-colors duration-300 hover:text-orange-500"
                              >
                                {item?.title || item?.bundleName}
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {section.items.length > 6 && (
                          <Link
                            to={`/${section.type === "specialBundle" ? "specialBundles" : section.type + "s"}`}
                            className="text-sm text-orange-500 mt-2 inline-block"
                          >
                            See All →
                          </Link>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            <li><Link to="/webinars" className="hover:text-orange-400 transition font-semibold">Webinars</Link></li>
          </ul>
        </div>

        {/* Right Icons */}
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

          {/* Use Redux user state instead of loggedIn */}
          {!user?.email ? (
            <div className="hidden md:flex space-x-4">
              <Link to="/login" className="bg-orange-500 text-white px-4 py-2 rounded-lg">Login</Link>
              <Link to="/signup" className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg">Register</Link>
            </div>
          ) : (
            <DropdownMenu className="hidden md:inline">
              <DropdownMenuTrigger asChild>
                <FaUser className="text-2xl cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-4 rounded-lg shadow-lg">
                <DropdownMenuItem>
                  <Link to="/dashboard/profile/personalinformation">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard/mycourses">My Courses</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dashboard/help&support">Help and Support</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  Logout
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
        isLoggedIn={!!user?.email}
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
