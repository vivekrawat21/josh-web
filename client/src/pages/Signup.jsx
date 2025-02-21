import React, { useState } from 'react';
import {FiEye, FiEyeOff} from 'react-icons/fi';
const Signup = () => {
  // State variables for input fields
  const [showPassword, setShowPassword] = useState(false);  
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState(''); // New state for referral code

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior
    const userInfo = { fullName, mobileNumber, email, password, referralCode };
    console.log(userInfo); // Log the user information
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  return (
    <div className="h-screen flex">
      {/* Left Section - Image */}
      <div className="hidden md:block w-1/2">
        <img
          src="../../save.jpg" // Replace with your image path
          alt="Signup Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-orange-500 mb-6">Sign Up</h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full name"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter your mobile"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div className=" relative mb-4">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <button 
              type="button"
              onClick={handleShowPassword}
              className="absolute right-2 top-10 text-gray-500">
                {showPassword ? <FiEyeOff /> : <FiEye />}

              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Referral Code (Optional)</label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Enter referral code (optional)"
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-orange-600 transition duration-200"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
