import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = [
  '../../signupimage.jpg',
  '../../member2.jpg',
  '../../memeber3.jpg',
];

const Login = () => {
  const [loginMethod, setLoginMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      loginMethod === 'email' ? { email, password } : { number }
    );
  };

  return (
    <div className="flex h-screen w-screen">
      <div className="hidden md:block w-1/2 relative">
        <img
          src={images[currentImage]}
          alt="Login Illustration"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${currentImage === index ? 'bg-white' : 'bg-gray-400'}`}
            ></div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-10">
        <div className="max-w-md w-full">
          <div className="flex justify-between mb-6">
            <button className="flex-1 py-2 px-4 text-sm font-medium bg-gray-300 rounded-l-md" onClick={() => setLoginMethod('email')}>
              Login with Email
            </button>
            <button className="flex-1 py-2 px-4 text-sm font-medium bg-gray-300" onClick={() => setLoginMethod('otp')}>
              Login with OTP
            </button>
            <button className="flex-1 py-2 px-4 text-sm font-medium bg-gray-300 rounded-r-md" onClick={() => setLoginMethod('qr')}>
              Login with QR Code
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {loginMethod === 'email' ? (
              <>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                  <a href="#" className="text-sm text-blue-500 hover:underline mt-1 block text-right">
                    Forgot Password?
                  </a>
                </div>
              </>
            ) : loginMethod === 'otp' ? (
              <div className="mb-4">
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">Enter Number</label>
                <input
                  type="text"
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            ) : (
              <div className="mb-4 text-center text-sm text-gray-700">
                <p>Scan the QR code to login.</p>
              </div>
            )}

            <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200">
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 font-medium hover:underline">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
