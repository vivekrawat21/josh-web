// src/pages/ForgotPassword.js (or wherever your component is)
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSpinner, FaEnvelope } from "react-icons/fa"; // Added FaEnvelope for input
import CustomToast from "../components/CustomToast"; // Adjust path as needed
import { BASE_URL } from "@/utils/utils"; // Assuming this path is correct

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleToastClose = () => {
    setToastMessage("");
    localStorage.removeItem("toast");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setToastMessage("Please enter your email address.");
      setToastType("error");
      return;
    }
    setIsLoading(true);
    setToastMessage("");

    try {
      const response = await axios.post(`${BASE_URL}/auth/forgotPassword`, {
        email: email,
      });

      setToastMessage(
        response.data.message || // Use API message if available
        "Reset link sent! Check your email (and spam folder)." // Clearer & concise
      );
      setToastType("success");
      setEmail("");
    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      setToastMessage(errorMessage);
      setToastType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4 sm:p-6">
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">
              Forgot Your Password?
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 
                             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                             sm:text-sm transition duration-150 ease-in-out"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`w-full flex items-center justify-center text-white px-4 py-2.5 sm:py-3 border border-transparent 
                           text-sm sm:text-base font-medium rounded-xl shadow-sm 
                           bg-orange-500 hover:bg-orange-600 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400
                           transition duration-150 ease-in-out
                           ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Email"
                )}
              </button>
            </div>
          </form>

          {/* Back to Login Link */}
          <div className="text-center">
            <Link
              to="/login"
              className="font-medium text-sm text-orange-600 hover:text-orange-500 hover:underline"
            >
              Remember your password? Login
            </Link>
          </div>
        </div>
      </div>
     
    {toastMessage && (
  <CustomToast
    message={toastMessage}
    type={toastType}
    onClose={handleToastClose}
  />
    )
    }
    </>
  );
};

export default ForgotPassword;