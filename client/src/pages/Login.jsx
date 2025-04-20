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

  const handleShowPassword = () => setShowPassword(!showPassword);

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
      const backendError = error.response?.data?.message;
      setErrorMsgs(
        backendError ? (Array.isArray(backendError) ? backendError : [backendError]) : ["Something went wrong. Please try again."]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white lg:bg-gradient-to-br lg:from-orange-50 lg:to-blue-50 flex flex-col lg:flex-row items-center min-h-screen px-4 sm:px-6 mt-8">
      {/* Image Section */}
      <div className="hidden lg:flex w-1/2 justify-start pr-8">
        <img
          src="/login.png"
          alt="Login"
          className="w-[90%] h-auto object-contain rounded-2xl"
        />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-screen-sm mx-auto bg-white lg:max-w-xl lg:shadow-xl lg:rounded-2xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 sm:mx-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold text-center mb-8 md:mb-10 bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">
          Login to Joshguru
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or Phone number"
            className="border p-2 sm:p-3 rounded w-full"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border p-2 sm:p-3 rounded w-full"
              required
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="text-right">
            <Link
              to="/forgotpassword"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 sm:py-3 rounded-md hover:bg-orange-600 transition"
            disabled={loading}
          >
            {loading ? <Loader size={20} className="animate-spin mx-auto" /> : "Login"}
          </button>

          {errorMsgs.length > 0 && (
            <div className="bg-red-100 text-red-700 border border-red-400 p-3 mt-4 rounded flex items-start gap-2">
              <FiXCircle className="mt-1" />
              <ul className="text-sm">
                {errorMsgs.map((msg, idx) => (
                  <li key={idx}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-center text-sm text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
