import React , {useState} from "react";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    };
  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <div className="flex flex-col bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Forgot Password</h1>
        <p className="text-justify text-gray-600 mb-6">
          Please enter the email address you'd like your reset information sent to
        </p>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Enter your email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            onClick={handleSubmit}
          >
            Send Email
          </button>
        </div>
        <div>
            <Link to="/login" className="text-md text-blue-500 hover:underline block text-center mt-4 font-bold">
            Back To Login</Link>
            </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
