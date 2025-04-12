import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiXCircle } from "react-icons/fi";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { Loader } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsgs([]);
    const userInfo = { email, password };
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/auth/login`, userInfo, {
        withCredentials: true,
      });

      if (res.data.data.user) {
        dispatch(setUser(res.data.data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      const backendError = error.response?.data?.message;
      if (backendError) {
        setErrorMsgs(Array.isArray(backendError) ? backendError : [backendError]);
      } else {
        setErrorMsgs(["Something went wrong. Please try again."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex md:h-screen h-auto w-full md:items-center md:justify-center flex-col md:flex-row space-y-0 lg:space-y-0 lg:space-x-5 bg-gray-50 px-4 py-4">
      {/* Image Section */}
      <div className="hidden w-full md:w-2/5 md:flex items-center justify-center">
        <img
          src="/login.png"
          alt="login"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-2/5 lg:w-3/5 flex items-center justify-center py-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
            Welcome Back
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email or Phone
              </label>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Enter email or phone number"
                required
              />
            </div>

            <div className="relative mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute right-2 top-9 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <div className="mb-4 text-right">
              <Link
                to="/forgotpassword"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md text-lg font-semibold hover:bg-orange-600 transition duration-200"
              disabled={loading}
            >
              {loading ? <Loader size={20} color="white" className="m-auto animate-spin" /> : "Login"}
            </button>

            {errorMsgs.length > 0 && (
              <div className="bg-red-100 border border-red-400 text-red-700 rounded-md px-4 py-3 mt-4 relative flex gap-2 items-start">
                <button
                  type="button"
                  className="text-red-600 hover:text-red-800 mt-1"
                  onClick={() => setErrorMsgs([])}
                >
                  <FiXCircle size={18} />
                </button>
                <div className="text-sm space-y-1">
                  {errorMsgs.map((msg, idx) => (
                    <div key={idx}>{msg}</div>
                  ))}
                </div>
              </div>
            )}

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
