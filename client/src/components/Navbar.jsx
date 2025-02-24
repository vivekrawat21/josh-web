import { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "@fontsource/fugaz-one";
import { CgProfile } from "react-icons/cg";
// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  }

  return (
    <nav className="fixed top-0 left-0 right-0 mx-auto w-[94%] backdrop-blur-md bg-white/40 shadow-xl p-4 rounded-xl z-50 transition-all duration-300">
      <div className="flex justify-between items-center font-['Fugaz One']">
        {/* Logo and Navigation Links */}
        <div className="flex items-center space-x-10">
          <Link to="/">
            <img src="/logo1.png" alt="Logo" className="w-[60px]" />
          </Link>

          <ul className="hidden md:flex items-center space-x-6 text-gray-900 font-medium text-[16px]">
            <li>
              <Link to="/about" className="hover:text-orange-500 transition">
                About
              </Link>
            </li>
            <li className="relative group">
              <button
                onClick={toggleCourses}
                className="flex items-center space-x-2 hover:text-orange-500 transition"
              >
                <span>Courses</span>
                <FaChevronDown
                  className={`text-base transition-transform duration-300 ${
                    isCoursesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu for Courses */}
              <div
                className={`absolute left-0 mt-3 w-[380px] bg-white shadow-xl rounded-xl p-5 transition-all duration-300 ${
                  isCoursesOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <h3 className="text-lg font-bold text-orange-600 border-b pb-2 mb-4">
                  Courses
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Top Courses
                    </h4>
                    <ul className="space-y-2 text-gray-800">
                      <Link to="/topcourse/fullstack">
                        <li className="hover:text-orange-500 transition">
                          Full Stack Development
                        </li>
                      </Link>
                      <Link to="/topcourse/digitalmarketing">
                        <li className="hover:text-orange-500 transition">
                          Digital Marketing
                        </li>
                      </Link>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">
                      Other Courses
                    </h4>
                    <ul className="space-y-2 text-gray-800">
                      <li className="hover:text-orange-500 transition">
                        Dummy Course 1
                      </li>
                      <li className="hover:text-orange-500 transition">
                        Dummy Course 2
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Cart and User Authentication */}
        <div className="flex items-center space-x-6">
          <Link to="/cart">
            <img src="/shopping-cart.png" alt="Shopping cart" className="w-7" />
          </Link>

          {loggedIn ? (
            <div className="hidden md:flex space-x-4 items-center" >
             
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
              <CgProfile className="text-3xl cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="" sideOffset={5} className="relative w-full bg-white p-4 rounded-lg shadow-lg mt-8 right-12">
              <DropdownMenuItem>
                <Link to="/dashboard/profile/personalinformation">
                  <p>Personal Information</p>
                  {/* <span className="hidden hover:inline hover:underline w-5 h-2"></span> */}
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
                {/* <Link to="/dashboard/logout">
                  <p>Logout</p>
                </Link> */}
                <button onClick={logout}>
                  logout
                </button>
              </DropdownMenuItem>
             
                </DropdownMenuContent>
            
              </DropdownMenu>
            
            
            {/* <button className="px-5 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition" onClick={logout}>
               Logout
            </button> */}

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
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-5 absolute w-full top-16 left-0 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {loggedIn ? (
          <div className="flex flex-col">
            <button
              onClick={toggleCourses}
              className="flex items-center justify-between w-full text-lg py-2 hover:text-orange-500 transition"
            >
              My Profile
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  isCoursesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCoursesOpen && (
              <div className="bg-white p-3 mt-2 rounded-lg shadow">
                <ul className="space-y-2">
                  <Link to="/dashboard/profile/personalinformation">
                    <li className="hover:text-orange-500 transition">
                      Personal Information
                    </li>
                  </Link>
                  <Link to="/dashboard/profile/invoices">
                    <li className="hover:text-orange-500 transition">Invoices</li>
                  </Link>
                  <Link to="/dashboard/profile/privacyandsecurity">
                    <li className="hover:text-orange-500 transition">
                      Privacy and Security
                    </li>
                  </Link>
                </ul>
              </div>
            )}
            <Link
              to="/dashboard/mycourses"
              className="text-lg py-2 hover:text-orange-500 transition"
            >
              My Courses
            </Link>
            <Link
              to="/dashboard/refer&earn"
              className="text-lg py-2 hover:text-orange-500 transition"
            >
              Refer and Earn
            </Link>
            <Link
              to="/dashboard/helpandsupport"
              className="text-lg py-2 hover:text-orange-500 transition"
            >
              Help and Support
            </Link>
          </div>
        ) : (
          <div className="flex flex-col">
            <Link
              to="/about"
              className="text-lg py-2 hover:text-orange-500 transition"
            >
              About
            </Link>
            <button
              onClick={toggleCourses}
              className="flex items-center justify-between w-full text-lg py-2 hover:text-orange-500 transition"
            >
              Courses
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  isCoursesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCoursesOpen && (
              <div className="bg-white p-3 mt-2 rounded-lg shadow">
                <h4 className="text-orange-600 font-bold border-b pb-2">
                  Top Courses
                </h4>
                <ul className="space-y-2">
                  <Link to="/topcourse/fullstack">
                    <li className="hover:text-orange-500 transition">
                      Full Stack Development
                    </li>
                  </Link>
                  <Link to="/topcourse/digitalmarketing">
                    <li className="hover:text-orange-500 transition">
                      Digital Marketing
                    </li>
                  </Link>
                </ul>
                <h4 className="text-orange-600 font-bold border-b pb-2 mt-4">
                  Other Courses
                </h4>
                <ul className="space-y-2">
                  <li className="hover:text-orange-500 transition">Dummy Course 1</li>
                  <li className="hover:text-orange-500 transition">Dummy Course 2</li>
                </ul>
              </div>
            )}

            <div className="mt-4">
              <Link to="/login">
                <button className="w-full py-2 bg-white text-orange-600 font-semibold rounded-lg shadow-md hover:bg-orange-100 transition mb-2">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-full py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
