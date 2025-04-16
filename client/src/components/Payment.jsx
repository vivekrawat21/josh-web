import React, { useState } from 'react';
import { Loader, CheckCircle2 } from 'lucide-react';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const Payment = ({ data, type = 'bundle', setStep, handleFinalSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    setTimeout(async () => {
      setPaymentSuccess(true);
      await handleFinalSubmit(); // <-- Call API/create here
      setLoading(false);
    }, 2000); // simulate payment delay
  };

  if (!data) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-xl text-center">
        <p className="text-gray-500 text-lg">No {type} selected for payment.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {type === 'bundle' ? 'Bundle Payment' : 'Course Payment'}
      </h2>

      <div className="flex flex-col items-center gap-4 mb-6">
        <img
          src={data?.bundleImage || data?.image}
          alt={data?.bundleName || data?.title}
          className="w-32 h-32 object-cover rounded-lg shadow-md"
        />
        <h3 className="text-lg font-semibold text-gray-700">
          {data?.bundleName || data?.title}
        </h3>
        <p className="text-xl font-bold text-green-700">
          {formatPrice(data?.price)}
        </p>
      </div>

      {paymentSuccess ? (
        <div className="text-green-600 flex flex-col items-center gap-2">
          <CheckCircle2 size={40} />
          <p className="text-lg font-semibold">Payment Successful!</p>
        </div>
      ) : (
        <>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {loading ? <Loader size={20} className="animate-spin mx-auto" /> : 'Pay Now'}
          </button>

          <button
            onClick={() => setStep(2)}
            className="mt-4 text-sm text-gray-600 hover:text-gray-800 underline"
          >
            ← Back to Selection
          </button>
        </>
      )}
    </div>
  );
};

export default Payment;
