import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Import axios
import { FaSpinner, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import CustomToast from "../components/CustomToast"; // Adjust path as needed
import { BASE_URL } from "@/utils/utils"; // Assuming this path is correct

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // "success" or "error"

  const handleToastClose = () => {
    setToastMessage("");
    localStorage.removeItem("toast");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToastMessage(""); // Clear previous toasts

    if (!password || !confirmPassword) {
      setToastMessage("Please fill in both password fields.");
      setToastType("error");
      return;
    }
    if (password !== confirmPassword) {
      setToastMessage("Passwords do not match.");
      setToastType("error");
      return;
    }
    if (password.length < 6) {
      setToastMessage("Password should be at least 6 characters long.");
      setToastType("error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/auth/resetPassword`, {
        token: token,
        password: password,
      });

      setToastMessage(response.data.message || "Password has been reset successfully! Redirecting to login...");
      setToastType("success");
      setPassword("");
      setConfirmPassword("");

      // Navigate to login page ONLY on success, after a delay for the toast
      setTimeout(() => {
        navigate("/login");
      }, 2500);

    } catch (error) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (error.response) {
        // Check for specific status codes or messages for token expiration
        if ((error.response.status === 400 || error.response.status === 401) && error.response.data && error.response.data.message && (error.response.data.message.toLowerCase().includes("token") || error.response.data.message.toLowerCase().includes("expired") || error.response.data.message.toLowerCase().includes("invalid"))) {
          errorMessage = "Your password reset token is invalid or has expired. Please request a new one.";
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
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
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">
              Reset Your Password
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Choose a new strong password for your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 sm:py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 
                             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                             sm:text-sm transition duration-150 ease-in-out"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-slate-500 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm New Password Field */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Confirm New Password
              </label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 sm:py-3 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 
                             focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                             sm:text-sm transition duration-150 ease-in-out"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-slate-500 hover:text-slate-700"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
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
                    Changing Password...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </form>
           <div className="text-center mt-6"> {/* Increased margin-top for better spacing */}
            <Link
              to="/forgot-password" // Link to request a new token if current one failed
              className="font-medium text-sm text-orange-600 hover:text-orange-500 hover:underline"
            >
              Problem with token? Request a new link.
            </Link>
            <span className="mx-2 text-slate-400">|</span>
            <Link
              to="/login"
              className="font-medium text-sm text-slate-600 hover:text-slate-800 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
      <CustomToast
        message={toastMessage}
        type={toastType}
        onClose={handleToastClose}
      />
    </>
  );
};

export default ResetPassword;