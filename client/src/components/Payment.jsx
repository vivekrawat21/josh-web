import React, { useState, useEffect } from 'react';
import { Loader, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '@/utils/utils';

// Helper function to format price
const formatPrice = (price) => {
  if (typeof price !== 'number') return '';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const Payment = ({ name, mobilenumber, email, password, referralCode, data, type, setStep, handleFinalSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Ensure 'data' is always an array and filter out any invalid items
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  const totalPrice = items.reduce((sum, item) => sum + (item?.price || 0), 0);
  const itemIds = items.map((item) => item?._id).filter(Boolean); // Filter out null/undefined IDs

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePayment = async () => {
    // Basic validation before starting the process
    if (!window.Razorpay) {
      alert('Payment gateway is not loaded. Please refresh the page and try again.');
      return;
    }
    if (itemIds.length === 0) {
      alert('Error: No valid course or bundle is selected for payment.');
      return;
    }

    setLoading(true);

    try {
      // ===================================================================
      // STEP 1: REGISTER THE USER FIRST AND WAIT FOR IT TO COMPLETE.
      // This is the most critical change to prevent the race condition.
      // ===================================================================
      console.log("Step 1: Attempting to register user...");
      const userInfo = { name, mobilenumber, email, password, referralCode };
      await axios.post(`${BASE_URL}/auth/register`, userInfo);
      console.log("Step 1 Complete: User registered successfully.");

      // ===================================================================
      // STEP 2: ONLY AFTER successful registration, create the payment order.
      // ===================================================================
      console.log("Step 2: Creating payment order for the new user...");
      const res = await axios.post(`${BASE_URL}/payment/create`, {
        id: itemIds,
        name,
        phoneNo: mobilenumber,
        email,
        route: "signup"
      });
      const order = res.data.message;
      console.log("Step 2 Complete: Payment order created:", order.id);

      // ===================================================================
      // STEP 3: CONFIGURE AND OPEN THE RAZORPAY PAYMENT POPUP.
      // ===================================================================
      const options = {
        key: "rzp_test_faQqIMZ9VW1OTO", 
        amount: order.amount,
        currency: order.currency,
        name: 'Joshguru Pvt Ltd',
        description: 'Course/Bundle Purchase',
        order_id: order.id,
        
        // The handler's job is now simple: handle the UI after a successful payment.
        // The backend webhook handles all fulfillment logic (granting access).
        handler: function (response) {
          console.log("Payment successful on frontend:", response);
          setPaymentSuccess(true);
          // Give user a moment to see the success message before redirecting
          setTimeout(() => {
            handleFinalSubmit();
          }, 2000);
        },

        prefill: {
          name,
          email,
          contact: mobilenumber,
        },
        theme: {
          color: '#FFA500',
        },
        modal: {
          // This logic handles the case where the user closes the payment popup.
          ondismiss: async function () {
            console.log("Payment popup dismissed by user. Initiating cleanup...");
            setLoading(false);
            // We must delete the user we just created, as they did not complete the payment.
            // This allows them to try signing up again with the same email.
            try {
              // You MUST create this endpoint on your backend.
              await axios.post(`${BASE_URL}/payment/delete-unpaid-user`, { email });
              console.log(`Cleanup successful: Unpaid user '${email}' has been deleted.`);
            } catch (cleanupError) {
              console.error("CRITICAL: Failed to cleanup unpaid user:", cleanupError);
              alert("An error occurred. If you try to sign up again, please use a different email or contact support.");
            }
          },
        },
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('The registration or payment creation process failed:', error);
      // This will catch errors from either the user registration or payment creation steps.
      alert(error?.response?.data?.message || 'The process failed. Please check your details and try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-6 p-4 sm:p-6 lg:p-8 bg-white lg:shadow-xl lg:rounded-2xl">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
        {type === 'cart' ? 'Cart Payment' : type === 'bundle' ? 'Bundle Payment' : 'Course Payment'}
      </h2>

      <div className={`grid ${items.length === 1 ? 'justify-center' : 'grid-cols-1 sm:grid-cols-2 gap-6 mb-6'}`}>
        {items.map((item, idx) => (
          <div key={item?._id || idx} className="border rounded-xl bg-blue-50 overflow-hidden flex flex-col items-center p-4">
            {item?.image || item?.bundleImage ? <img src={item.image || item.bundleImage} alt={item.title || item.bundleName} className="w-full h-28 object-cover rounded mb-2"/> : null}
            <h3 className="text-sm font-semibold text-center text-gray-800 mb-1">{item.title || item.bundleName}</h3>
            <p className="text-green-700 font-bold text-sm">{formatPrice(item.price)}</p>
          </div>
        ))}
      </div>

      <div className="text-center mb-4">
        <h4 className="text-lg font-semibold">Total: <span className="text-green-700">{formatPrice(totalPrice)}</span></h4>
      </div>

      {paymentSuccess ? (
        <div className="text-green-600 flex flex-col items-center gap-2">
          <CheckCircle2 size={40} />
          <p className="text-lg font-semibold">Payment Successful!</p>
          <p className='text-sm text-gray-600'>Your access is being granted. Redirecting...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <button onClick={handlePayment} disabled={loading} className="w-full sm:w-1/2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400">
            {loading ? <Loader size={20} className="animate-spin mx-auto" /> : 'Complete Registration & Pay'}
          </button>
          <button onClick={() => setStep(2)} disabled={loading} className="text-sm text-gray-600 hover:text-gray-800 underline">← Back to Selection</button>
        </div>
      )}
    </div>
  );
};

export default Payment;