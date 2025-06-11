import React, { useState, useEffect } from 'react';
import { Loader, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '@/utils/utils';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/userSlice';
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const Payment = ({ name, mobilenumber, email,password,referralCode, data, type = 'bundle', setStep, handleFinalSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const dispatch = useDispatch();

  const items = Array.isArray(data) ? data : [data];
  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0), 0);
  const itemIds = items.map((item) => item._id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePayment = async () => {

    if (!window.Razorpay) {
      alert('Razorpay SDK not loaded. Please try again.');
      return;
    }

    setLoading(true);


    try {
      const userInfo = {
            name,
            mobilenumber,
            email,
            password,
            referralCode,
          };
      
        
      const response = await axios.post(`${BASE_URL}/auth/register`, userInfo);
      
      const user = response.data?.data?.user;
      const res = await axios.post(`${BASE_URL}/payment/create`, {
        currency: 'INR',
        id: itemIds,
        name,
        phoneNo: mobilenumber,
        email,
      });
      const order = res.data.message;
      console.log(order)
      const options = {
        key: 'rzp_test_faQqIMZ9VW1OTO', 
        amount: order.amount, 
        currency: order.currency,
        name: 'Joshguru Pvt Ltd',
        description: 'Payment for selected item(s)',
        order_id: order.id,
        handler: async function () {
          try {
            setPaymentSuccess(true);
            console.log(user)
            dispatch(setUser(user));
            handleFinalSubmit(user);
          } catch (err) {
            console.error('Error after payment success:', err);
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name,
          email,
          contact: mobilenumber,
        },
        theme: {
          color: '#FFA500',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment creation failed:', error);
      alert(error?.response?.data?.message || 'Payment failed. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-6 p-4 sm:p-6 lg:p-8 bg-white lg:shadow-xl lg:rounded-2xl">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
        {type === 'cart'
          ? 'Cart Payment'
          : type === 'specialbundle'
          ? 'Special Bundle Payment'
          : type === 'bundle'
          ? 'Bundle Payment'
          : 'Course Payment'}
      </h2>

      <div className={`grid ${items.length === 1 ? 'justify-center' : 'grid-cols-1 sm:grid-cols-2 gap-6 mb-6'}`}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className="border rounded-xl bg-blue-50 overflow-hidden flex flex-col items-center p-4"
          >
            {item?.image || item?.bundleImage ? (
              <img
                src={item.image || item.bundleImage}
                alt={item.title || item.bundleName}
                className="w-full h-28 object-cover rounded mb-2"
              />
            ) : null}
            <h3 className="text-sm font-semibold text-center text-gray-800 mb-1">
              {item.title || item.bundleName}
            </h3>
            <p className="text-green-700 font-bold text-sm">{formatPrice(item.price)}</p>
          </div>
        ))}
      </div>

      <div className="text-center mb-4">
        <h4 className="text-lg font-semibold">
          Total: <span className="text-green-700">{formatPrice(totalPrice)}</span>
        </h4>
      </div>

      {paymentSuccess ? (
        <div className="text-green-600 flex flex-col items-center gap-2">
          <CheckCircle2 size={40} />
          <p className="text-lg font-semibold">Payment Successful!</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full sm:w-1/2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {loading ? <Loader size={20} className="animate-spin mx-auto" /> : 'Pay Now'}
          </button>
          <button
            onClick={() => setStep(2)}
            className="text-sm text-gray-600 hover:text-gray-800 underline"
          >
            ← Back to Selection
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;