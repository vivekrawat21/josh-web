import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { motion } from "framer-motion";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      title: "Full-Stack Development",
      price: 900,
      type: "video",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Digital Marketing",
      price: 550,
      type: "video + notes",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Data Science",
      price: 650,
      type: "video + projects",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "DevOps",
      price: 800,
      type: "video + projects",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section className="w-full min-h-screen px-4 md:px-8 lg:px-12 py-8 bg-gray-100">
      <div className="flex flex-col lg:flex-row lg:justify-center w-full lg:space-x-10 space-y-6 lg:space-y-0">
        {/* Cart Items Section */}
        <motion.div
          className="w-full lg:w-7/12 shadow-xl rounded-lg p-6 bg-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4">Cart Items</h2>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              className="flex items-center justify-between py-4 border-b"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 md:w-20 md:h-20 rounded-lg" />
                <div>
                  <h3 className="text-md md:text-lg font-semibold text-gray-700">{item.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500">{item.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-md md:text-lg font-semibold">₹{item.price}</p>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="text-red-orange hover:text-white hover:bg-orange-500 p-2 rounded-full transition"
                >
                  <MdDeleteOutline className="w-5 h-5 md:w-6 md:h-6" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Order Summary Section */}
        <motion.div
          className="w-full lg:w-4/12 shadow-xl rounded-lg p-6 bg-white"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-orange-500 mb-4">Order <span className="text-black">Summary</span></h2>
          <div className="space-y-4">
            <div className="flex justify-between text-md md:text-lg">
              <span>Subtotal:</span>
              <span className="font-semibold">₹3000</span>
            </div>
            <div className="flex justify-between text-md md:text-lg text-green-500 font-semibold">
              <span>Discount:</span>
              <span>-₹1500</span>
            </div>
            <div className="flex justify-between text-lg md:text-xl font-bold">
              <span>Total:</span>
              <span>₹1500</span>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="border px-4 py-2 rounded-lg w-full text-sm md:text-base"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-3 rounded-lg w-full"
            >
              Apply Coupon
            </motion.button>
          </div>
          <div className="mt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-3 rounded-lg w-full"
            >
              Proceed to Checkout
            </motion.button>
          </div>
          <p className="mt-4 text-xs md:text-sm text-gray-500 text-center">
            Need help? Contact our support team at support@joshguru.com
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Cart;
