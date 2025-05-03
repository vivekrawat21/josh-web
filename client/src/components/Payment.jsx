import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    setTimeout(async () => {
      setPaymentSuccess(true);
      await handleFinalSubmit();
      setLoading(false);
    }, 2000);
  };

  const isCart = type === 'cart';
  const isBundle = type === 'bundle';
  const isSpecial = type === 'specialbundle';
  const isCourse = type === 'course';

  const items = Array.isArray(data) ? data : [data];

  if (!items || items.length === 0) {
    return (
      <div className="w-full mt-10 p-6 bg-white text-center">
        <p className="text-gray-500 text-lg">No {type} selected for payment.</p>
      </div>
    );
  }

  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="w-full mt-6 p-4 sm:p-6 lg:p-8 bg-white lg:shadow-xl lg:rounded-2xl">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
        {isCart
          ? 'Cart Payment'
          : isSpecial
          ? 'Special Bundle Payment'
          : isBundle
          ? 'Bundle Payment'
          : 'Course Payment'}
      </h2>

      {items.length === 1 ? (
        <div className="flex justify-center mb-6">
          {items.map((item, idx) => {
            const imgSrc =
              isBundle || isCart ? item?.bundleImage :
              isSpecial ? item?.image :
              item?.image;

            const title =
              isBundle || isCart ? item?.bundleName :
              isSpecial ? item?.title :
              item?.title;

            return (
              <div
                key={idx}
                className="border rounded-xl bg-blue-50 overflow-hidden flex flex-col items-center p-4 w-full sm:w-1/3"
              >
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-28 object-cover rounded mb-2"
                  />
                )}
                <h3 className="text-sm font-semibold text-center text-gray-800 mb-1">{title}</h3>
                <p className="text-green-700 font-bold text-sm">{formatPrice(item?.price)}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {items.map((item, idx) => {
            const imgSrc =
              isBundle || isCart ? item?.bundleImage :
              isSpecial ? item?.image :
              item?.image;

            const title =
              isBundle || isCart ? item?.bundleName :
              isSpecial ? item?.title :
              item?.title;

            return (
              <div
                key={idx}
                className="border rounded-xl bg-blue-50 overflow-hidden flex flex-col items-center p-4"
              >
                {imgSrc && (
                  <img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-28 object-cover rounded mb-2"
                  />
                )}
                <h3 className="text-sm font-semibold text-center text-gray-800 mb-1">{title}</h3>
                <p className="text-green-700 font-bold text-sm">{formatPrice(item?.price)}</p>
              </div>
            );
          })}
        </div>
      )}

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
