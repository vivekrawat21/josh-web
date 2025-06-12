import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCreditCard, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { Loader } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../utils/utils'; 

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price || 0);
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // --- 1. Get Data from Redux ---
  const  user = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart?.cart || []);
  const bundles = useSelector((state) => state.bundle?.bundles[0] || []);
  const courses = useSelector((state) => state.course?.courses[0] || []);
  
  // --- 2. State Management ---
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // --- 3. Authentication Check ---
  useEffect(() => {
    if (!user || !user.email) {
      navigate(`/login?redirect=${location.pathname}${location.search}`);
    }
  }, [user, navigate, location]);
  
  // --- 4. Determine Items to Purchase based on Query Params ---
  useEffect(() => {
    window.scrollTo(0, 0);
    const courseId = queryParams.get('courseId');
    const type = queryParams.get('type') || 'cart';
    const level = queryParams.get('level');

    const getSpecialBundleData = (level) => {
        switch (level) {
            case 'basic': return { _id: 'special_basic', title: 'Basic Bundle', image: '/specialBundle1.jpg', price: 49999 };
            case 'intermediate': return { _id: 'special_intermediate', title: 'Intermediate Bundle', image: '/specialBundle2.jpg', price: 79999 };
            case 'advance': return { _id: 'special_advance', title: 'Advance Bundle', image: '/specialBundle3.jpg', price: 99999 };
            default: return null;
        }
    };
    
    let items = [];
    if (type === 'cart') {
      items = cartItems;
    } else if (type === 'specialbundle' && level) {
      const special = getSpecialBundleData(level);
      if (special) items = [special];
    } else if (courseId) {
      const source = type === 'course' ? courses : bundles;
      const item = source.find((el) => el._id === courseId);
      if (item) items = [item];
    }

    setSelectedItems(items);
    setTotalPrice(items.reduce((total, item) => total + (item?.price || 0), 0));
    setLoading(false);
  }, [cartItems, bundles, courses, location.search]);

  // --- 5. Razorpay Payment Handler ---
  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert('Razorpay is not available. Please check your connection or refresh the page.');
      return;
    }
    setPaymentProcessing(true);

    // *** THIS IS THE KEY CHANGE ***
    // Create an array of course/bundle IDs from the selected items.
    const itemIds = selectedItems.map(item => item._id);

    try {
      // Pass the array of IDs to your backend.
      const { data } = await axios.post(`${BASE_URL}/payment/create`, {
        id: itemIds, 
        currency: 'INR',
        name:user?.name,
        phoneNo: user?.mobilenumber,
        email:user?.email,
        route:"loggedIn"
      });
      const order = data.message;
      
      const options = {
        key: 'rzp_test_faQqIMZ9VW1OTO', // IMPORTANT: Replace with your LIVE key in production
        amount: order.amount,
        currency: order.currency,
        name: 'Joshguru Pvt Ltd',
        description: `Payment for ${selectedItems.length} item(s)`,
        order_id: order.id,
        handler: function (response) {
          setPaymentSuccess(true);
          setTimeout(() => navigate('/dashboard'), 3000);
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.mobilenumber,
        },
        theme: {
          color: '#F97316', 
        },
        modal: {
          ondismiss: function() {
            setPaymentProcessing(false); 
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment Error:', error);
      alert(error?.response?.data?.message || 'An error occurred. Please try again.');
      setPaymentProcessing(false);
    }
  };

  // --- 6. UI Rendering ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader className="animate-spin text-orange-500" size={48} />
      </div>
    );
  }

  if (!loading && selectedItems.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-center px-4">
        <FiAlertTriangle className="text-yellow-500 text-6xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">Nothing to Purchase</h2>
        <p className="text-gray-600 mt-2">Your cart is empty or the selected item is not available.</p>
        <Link to="/courses" className="mt-6 px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors">
          Explore Courses
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <motion.div
        className="max-w-2xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {paymentSuccess ? (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
              <FiCheckCircle className="text-green-500 text-7xl mb-4" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Your Order is Confirmed!</h1>
            <p className="text-gray-600 mt-2">Thank you for your purchase. You'll be redirected to your dashboard.</p>
            <Loader className="animate-spin text-gray-400 mt-6" />
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-orange-500 to-yellow-400 text-transparent bg-clip-text">
              Order Summary
            </h1>

            <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 mb-8">
              {selectedItems.map((item) => (
                <div key={item._id || item.title} className="flex items-center gap-4 p-4">
                  <img
                    src={item.image || item.bundleImage || '/placeholder.jpg'}
                    alt={item.title || item.bundleName}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">{item.title || item.bundleName}</h3>
                  </div>
                  <p className="font-semibold text-gray-900 text-lg">{formatPrice(item.price)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8">
               <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
               <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-xl text-gray-900">
                <span>Total Amount</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={paymentProcessing}
              className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed"
            >
              {paymentProcessing ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <FiCreditCard size={20} />
                  <span>Pay Securely</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
              Secure payments powered by Razorpay.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Payment;