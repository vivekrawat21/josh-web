import React, { use } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
const Cart = () => {
  // const cartItems = [
  //   {
  //     id: 1,
  //     title: "Full-Stack Development",
  //     price: 900,
  //     type: "video",
  //     image: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 2,
  //     title: "Digital Marketing",
  //     price: 550,
  //     type: "video + notes",
  //     image: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 3,
  //     title: "Data Science",
  //     price: 650,
  //     type: "video + projects",
  //     image: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 4,
  //     title: "DevOps",
  //     price: 800,
  //     type: "video + projects",
  //     image: "https://via.placeholder.com/150",
  //   },
  // ];
  const cartItems = useSelector((state) => state.cart.cart);
  const subtotal= cartItems.reduce((acc, item) => acc + item.price, 0);
  const discount = 0;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const total = subtotal - discount;
  console.log(total);
  console.log(cartItems);
  const removeItem = (id) => {
    dispatch(removeFromCart(id));
    console.log("Item removed from cart");
  }
  return (
    <section className="w-full min-h-screen px-4 md:px-8 lg:px-12 py-8 bg-gray-100">
      <div className="flex flex-col lg:flex-row lg:justify-center w-full lg:space-x-10 space-y-6 lg:space-y-0">
        {/* Cart Items Section */}
        <motion.div
          className="w-full h-full lg:w-7/12 shadow-xl rounded-lg p-6 bg-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4">Cart Items</h2>
          {cartItems?.length === 0 && (
           < div className="flex items-center justify-center h-full" >
              <p className="text-lg font-semibold text-gray-500">Your cart is empty</p>
            </div>
            )}
          {cartItems?.map((item) => (
            <motion.div
              key={item._id}
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
                onClick={ () =>{
                  removeItem(item._id);
                }}
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
        { cartItems?.length > 0 &&
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
              <span className="font-semibold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-md md:text-lg text-green-500 font-semibold">
              <span>Discount:</span>
              <span>-₹{discount}</span>
            </div>
            <div className="flex justify-between text-lg md:text-xl font-bold">
              <span>Total:</span>
              <span>₹{total}</span>
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
            <Link to={!user?"/signup?type=cart":"/payment"} >
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-3 rounded-lg w-full"
            >
              Proceed to Checkout
            </motion.button>
            </Link>
          </div>  
        

          <p className="mt-4 text-xs md:text-sm text-gray-500 text-center">
            Need help? Contact our support team at support@joshguru.com
          </p>
        </motion.div>
}
      </div>
    </section>
  );
};

export default Cart;
