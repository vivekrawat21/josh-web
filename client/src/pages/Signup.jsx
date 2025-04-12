import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiXCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from "../utils/utils";
import { Loader } from 'lucide-react';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsgs([]);

    if (password !== confirmPassword) {
      setErrorMsgs(["Passwords do not match."]);
      return;
    }

    const userInfo = { name, mobilenumber, email, password, referralCode };

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/auth/register`, userInfo);
      if (res.data.data.user) {
        navigate("/login");
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
    <div className="flex w-full min-h-screen items-center justify-center flex-col md:flex-row lg:space-x-5 px-4 py-4 sm:py-6 bg-gray-50">
      {/* Left Section - Image */}
      <div className="hidden md:flex md:w-2/5 items-center justify-center">
        <img
          src="/signup.jpg"
          alt="Signup Illustration"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Right Section - Signup Form */}
      <div className="w-full md:w-2/5 flex items-center justify-center  md:mt-0">
        <div className="px-6 md:py-4 py-1 rounded-lg shadow-md max-w-sm w-full bg-white">
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="text"
                value={mobilenumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter your mobile"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="relative mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-9 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <div className="relative mb-4">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-9 text-gray-500"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Referral Code (Optional)</label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Enter referral code (optional)"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md text-lg font-semibold hover:bg-orange-600 transition duration-200"
              disabled={loading}
            >
              {loading ? <Loader size={20} color="white" className="m-auto animate-spin" /> : "Sign Up"}
            </button>

            {errorMsgs.length > 0 && (
              <div className="bg-red-100 border border-red-400 text-red-700 rounded-md px-4 py-3 mt-4 relative flex gap-2 items-center">
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
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 font-medium hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
