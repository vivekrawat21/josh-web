import React, { useState, useEffect } from 'react';
import { FiEye, FiEyeOff, FiXCircle } from 'react-icons/fi';
import { Loader } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/utils';
import { motion } from 'framer-motion';
import { setUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const bundles = useSelector((state) => state?.bundle?.bundles[0] || []);

  const [step, setStep] = useState(1);
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
  const [selectedCourse, setSelectedCourse] = useState('');

  const steps = ['Info', 'Course', 'PayU'];

  // Skip to Step 2 if user exists in store
  useEffect(() => {
    if (user) {
      setStep(2);
    }
  }, [user]);

  const checkUserExist = async (errors) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/checkuserexist`, { mobilenumber, email });
      if (res?.data?.statusCode === 200 && res?.data?.data == null) {
        return;
      }
    } catch (error) {
      errors.push(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const handleInitialSubmit = async () => {
    const errors = [];
    setLoading(true);

    if (!name.trim()) errors.push('Name is required.');
    if (!/^[0-9]{10}$/.test(mobilenumber)) {
      errors.push('Enter a valid 10-digit mobile number.');
    } else {
      await checkUserExist(errors);
    }

    if (!/.+@.+\..+/.test(email)) errors.push('Enter a valid email address.');
    if (password.length < 6) errors.push('Password must be at least 6 characters.');
    if (password !== confirmPassword) errors.push('Passwords do not match.');

    if (errors.length > 0) {
      setErrorMsgs(errors);
    } else {
      setErrorMsgs([]);
      setStep(2);
    }

    setLoading(false);
  };

  const handleFinalSubmit = async () => {
    setErrorMsgs([]);
    setLoading(true);

    const userInfo = {
      name,
      mobilenumber,
      email,
      password,
      referralCode,
      course: selectedCourse,
    };

    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, userInfo);
      if (res?.data?.data?.user) {
        dispatch(setUser(res.data.data.user));
        navigate('/dashboard');
      }
    } catch (error) {
      const backendError = error.response?.data?.message;
      setErrorMsgs(Array.isArray(backendError) ? backendError : [backendError || 'Something went wrong. Please try again.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-blue-50 flex flex-col lg:flex-row items-center justify-center px-6">
      <div className="hidden lg:flex w-1/2 justify-start pr-8">
        <img
          src="/signup.jpg"
          alt="Signup"
          className="w-[90%] h-auto object-contain rounded-2xl"
        />
      </div>

      <div className="w-full lg:w-[720px] bg-white shadow-xl rounded-2xl p-6 sm:p-10">
        <h2 className="text-xl sm:text-xl font-extrabold text-center mb-8 bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">
          Signup to Joshguru
        </h2>

        <div className="flex justify-between items-center mb-8">
          {steps.map((s, idx) => (
            <div key={s} className="flex-1 relative px-1">
              <motion.div
                className={`h-2 rounded-full ${step > idx ? '' : 'bg-gray-200'}`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.4 }}
                style={{
                  background: step > idx
                    ? 'linear-gradient(to right, #facc15, #f97316)'
                    : undefined,
                }}
              />
              <div className="absolute left-1/2 -translate-x-1/2 top-[-20px] text-sm font-medium text-gray-600">
                {s}
              </div>
            </div>
          ))}
        </div>

        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleInitialSubmit();
            }}
            className="space-y-4 text-base"
          >
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="border p-3 rounded w-full" required />
            <input type="tel" value={mobilenumber} pattern="[0-9]{10}" onChange={(e) => setMobileNumber(e.target.value)} placeholder="Mobile number" className="border p-3 rounded w-full" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-3 rounded w-full" required />
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 6 chars)" className="border p-3 rounded w-full" minLength={6} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <div className="relative">
              <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" className="border p-3 rounded w-full" minLength={6} required />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-500">
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <input type="text" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} placeholder="Referral code (optional)" className="border p-3 rounded w-full" />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition"
              disabled={loading}
            >
              {loading ? <Loader size={20} className="animate-spin mx-auto" /> : 'Continue'}
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
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            </p>
          </form>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-center">Select a Bundle</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bundles.map((bundle) => (
                <label key={bundle._id} className={`border p-2 rounded-xl flex flex-col items-center cursor-pointer transition ${selectedCourse === bundle?._id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <img src={bundle?.bundleImage} alt={bundle?.bundleName} className="w-full h-24 object-cover rounded mb-2" />
                  <span className="font-semibold text-center text-sm">{bundle?.bundleName}</span>
                  <input
                    type="radio"
                    name="course"
                    value={bundle._id}
                    checked={selectedCourse === bundle?._id}
                    onChange={() => setSelectedCourse(bundle._id)}
                    className="mt-1"
                  />
                </label>
              ))}
            </div>
            <button
              className="mt-6 w-full bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition"
              onClick={() => selectedCourse && setStep(3)}
              disabled={!selectedCourse}
            >
              Next
            </button>
            <button
              onClick={() => setStep(1)}
              className="mt-3 w-full text-sm text-gray-600 hover:text-gray-800 underline"
            >
              ← Back to Personal Info
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">PayU</h3>
            <p className="text-gray-600 mb-6">Payment gateway integration coming soon.</p>
            <button
              onClick={handleFinalSubmit}
              className="bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? <Loader size={20} className="animate-spin mx-auto" /> : 'Continue to Dashboard'}
            </button>
            <button
              onClick={() => setStep(2)}
              className="mt-3 text-sm text-gray-600 hover:text-gray-800 underline"
            >
              ← Back to Course Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
