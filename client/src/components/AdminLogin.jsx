
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { useDispatch } from "react-redux";
import { setUser} from "../features/user/userSlice";
import { useNavigate} from "react-router-dom";
import { Loader } from "lucide-react";
const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission
    const userInfo = { email, password };
    console.log(userInfo)
    try {
      setLoading(true);
        const res = await axios.post(`${BASE_URL}/auth/login `,userInfo
          ,{
            withCredentials: true
          }
        );
        // const res2 = await axios.post("http://localhost:3000/api/v1/auth/login",userInfo,{
        //   withCredentials: true
        // })
        if(res.data.data.user.role !=="admin"){
            setLoading(false);
            alert("You are not an admin");
            navigate("/admin/login");
            return;
        }
      
        dispatch(setUser(res.data.data.user));
        navigate("/admin/dashboard");
        console.log(res.data.data.user);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };
  return (
    <div>
              <div className="w-full md:h-[90%] md:w-2/5 lg:w-3/5 py-4 flex items-center justify-center mx-auto my-auto ">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Login with Admin credentials
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            <div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md text-lg font-semibold hover:bg-orange-600 transition duration-200"
                disabled={loading}
              >
                {loading ? <Loader size={20} color="orange" className="m-auto"/> : "Login"}
              </button>
            </div>
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
  )
}

export default AdminLogin