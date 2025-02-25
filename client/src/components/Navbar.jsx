import { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "@fontsource/fugaz-one";
import { CgProfile } from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const location = useLocation();
  const currentRoute = location.pathname;
  const [loggedIn, setLoggedIn] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCourses = () => setIsCoursesOpen(!isCoursesOpen);
  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 mx-auto w-[94%] backdrop-blur-md bg-white/40 shadow-xl p-4 rounded-xl z-50 transition-all duration-300">
      <div className="flex justify-between items-center font-['Fugaz One']">
        {/* Logo and Navigation Links */}
        <div className="flex items-center space-x-10 relative">
          <div className="flex flex-col items-center">
          <div className="flex flex-col items-center relative">
            <Link to="/">
              <img src="/logo1.png" alt="Logo" className="w-[60px]" />
            </Link>
            <p
              className="absolute text-[11px]  text-center font-bold"
              style={{
                width: "130px",
                color: "#57FEFF", // Lighter sky blue shade
                top: "75%",
                left: "-50%",
              }}
            >
              Powered by <span className="text-orange-400 ">NIITF</span>
            </p>
          </div>
          </div>

          <ul className="hidden md:flex items-center space-x-6 text-gray-900 font-medium text-[16px]">
            <li>
              <Link to="/about" className="hover:text-orange-400 transition">
                About
              </Link>
            </li>
            <li className="relative group">
              <button
                onClick={toggleCourses}
                className="flex items-center space-x-2 hover:text-orange-500 transition"
              >
                <span>Courses</span>
                <FaChevronDown className={`text-base transition-transform duration-300 ${isCoursesOpen ? "rotate-180" : ""}`} />
              </button>
            </li>
          </ul>
        </div>

        {/* Cart and User Authentication */}
        <div className="flex items-center space-x-6">
          <Link to="/cart">
            <img src="/shopping-cart.png" alt="Shopping cart" className="w-7" />
          </Link>

          {loggedIn ? (
            <div className="hidden md:flex space-x-4 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <CgProfile className="text-3xl cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="" sideOffset={5} className="relative w-full bg-white p-4 rounded-lg shadow-lg mt-8 right-12">
                  <DropdownMenuItem>
                    <Link to="/dashboard/profile/personalinformation">
                      <p>Personal Information</p>
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
          ) : (
            <div className="hidden md:flex space-x-4">
              <Link to="/login">
                <button className="px-5 py-2 bg-white text-orange-600 font-semibold rounded-lg shadow-md hover:bg-orange-100 transition">
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

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-2xl focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;