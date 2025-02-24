import { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "@fontsource/fugaz-one";

import { useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <nav className="fixed top-0 left-0 right-0 mx-auto w-[94%] backdrop-blur-md bg-white/40 shadow-xl p-4 rounded-xl z-50 transition-all duration-300">
      <div className="relative flex justify-between items-center font-['Fugaz One']">
        <div className="flex items-center space-x-10">
          <Link to="/">
           
              <img src="/logo1.png"  alt="Logo" className="w-[80px]" />
           
            
          </Link>

          <ul className="hidden md:flex items-center space-x-6 pt-2 ml-2 text-gray-900 font-medium text-[16px]">
            <li>
              <Link to="/about" className="hover:text-orange-500 transition">
                About
              </Link>
            </li>
            <li className="relative group">
              <button className="flex items-center space-x-2 hover:text-orange-500 transition">
                <span>Courses</span>
                <FaChevronDown className="text-base transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <div className="absolute left-0 mt-3 w-[380px] bg-white shadow-xl rounded-xl p-5 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300">
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
                        <li className="hover:text-orange-500 transition cursor-pointer">
                          Full Stack Development
                        </li>
                      </Link>
                      <Link to="/topcourse/digitalmarketing">
                        <li className="hover:text-orange-500 transition cursor-pointer">
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
                      <li className="hover:text-orange-500 transition cursor-pointer">
                        Dummy Course 1
                      </li>
                      <li className="hover:text-orange-500 transition cursor-pointer">
                        Dummy Course 2
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-6">
          <Link to={"/cart"}>
            {/* <FaCartShopping className="text-3xl bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent" /> */}
            <img
              src="/shopping-cart.png"
              alt="Shopping cart"
              className="w-7 "
            />
          </Link>
          {currentRoute.startsWith("/dashboard") ? (
            <div className="">
              <CgProfile className="cursor-pointer mx-auto"/>
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <Link to="/login">
                <button className="px-5 py-2 bg-white text-orange-600 text-base font-semibold rounded-lg shadow-md hover:bg-orange-100 transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-5 py-2 bg-orange-600 text-white text-base font-semibold rounded-lg shadow-md hover:bg-orange-700 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
          {/* {!isLogin && (
            <div className="hidden md:flex space-x-4">
              <Link to="/login">
                <button className="px-5 py-2 bg-white text-orange-600 text-base font-semibold rounded-lg shadow-md hover:bg-orange-100 transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-5 py-2 bg-orange-600 text-white text-base font-semibold rounded-lg shadow-md hover:bg-orange-700 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          )} */}
          <button
            className="md:hidden text-gray-900 text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {currentRoute.startsWith("/dashboard") ? (
        <div
          className={`md:hidden flex flex-col bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-5 absolute w-full top-16 left-0 transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <button
            className="flex items-center justify-between w-full text-gray-900 text-lg font-medium py-2 hover:text-orange-500 transition"
            onClick={() => setIsCoursesOpen(!isCoursesOpen)}
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
              <ul className="space-y-2 text-gray-800 mt-2">
                <Link to="/dashboard/profile/personalinformation">
                  <li className="hover:text-orange-500 transition cursor-pointer">
                    Personal Information
                  </li>
                </Link>
                <Link to="/dashboard/profile/invoices">
                  {" "}
                  <li className="hover:text-orange-500 transition cursor-pointer">
                    Invoices
                  </li>
                </Link>
                <Link to="/dashboard/profile/privacyandsecurity">
                  {" "}
                  <li className="hover:text-orange-500 transition cursor-pointer">
                    Privacy and Security
                  </li>
                </Link>
              </ul>
            </div>
          )}
          <Link
            to="/dashboard/mycourses"
            className="text-gray-900 text-lg font-medium py-2 hover:text-orange-500 transition"
          >
            My Courses
          </Link>
          <Link
            to="/dashboard/refer&earn"
            className="text-gray-900 text-lg font-medium py-2 hover:text-orange-500 transition"
          >
            Refer and Earn
          </Link>
          <Link
            to="/dashboard/helpandsupport"
            className="text-gray-900 text-lg font-medium py-2 hover:text-orange-500 transition"
          >
            Help and support
          </Link>
        </div>
      ) : (
        <div
          className={`md:hidden flex flex-col bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-5 absolute w-full top-16 left-0 transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <Link
            to="/about"
            className="text-gray-900 text-lg font-medium py-2 hover:text-orange-500 transition"
          >
            About
          </Link>
          <button
            className="flex items-center justify-between w-full text-gray-900 text-lg font-medium py-2 hover:text-orange-500 transition"
            onClick={() => setIsCoursesOpen(!isCoursesOpen)}
          >
            Courses{" "}
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
              <ul className="space-y-2 text-gray-800 mt-2">
                <Link to="/topcourse/fullstack">
                  <li className="hover:text-orange-500 transition cursor-pointer">
                    Full Stack Development
                  </li>
                </Link>
                <Link to="/topcourse/digitalmarketing">
                  {" "}
                  <li className="hover:text-orange-500 transition cursor-pointer">
                    Digital Marketing
                  </li>
                </Link>
              </ul>
              <h4 className="text-orange-600 font-bold border-b pb-2 mt-4">
                Other Courses
              </h4>
              <ul className="space-y-2 text-gray-800 mt-2">
                <li className="hover:text-orange-500 transition cursor-pointer">
                  Dummy Course 1
                </li>
                <li className="hover:text-orange-500 transition cursor-pointer">
                  Dummy Course 2
                </li>
              </ul>
            </div>
          )}
          {currentRoute === "/dashboard" ? (
            <div className="w-8">
              <CgProfile />
            </div>
          ) : (
            <div className="mt-4">
              <Link to="/login">
                <button className="w-full py-2 bg-white text-orange-600 text-lg font-semibold rounded-lg shadow-md hover:bg-orange-100 transition mb-2">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-full py-2 bg-orange-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-orange-700 transition">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
          {/* {!isLogin && (
          
        )} */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
