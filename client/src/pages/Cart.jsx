import React from "react";
import { MdDeleteForever } from "react-icons/md";

import { MdOutlineDeleteOutline } from "react-icons/md";


const Cart = () => {
  const cartItems = [
    {
      id: 1,
      title: "Full Stack Development",
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
    <section className="w-full min-h-screen mx-4">
      <div className="flex flex-col md:flex-row md:justify-center w-full space-x-8">
        {/* Cart Items Section */}
        <div className="w-full md:w-6/12 shadow-lg rounded-lg p-4 my-6">
          <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
          <div>
            {cartItems.map((item) => (
              <div key={item.id}>
                <div className="flex items-center justify-between py-4 font-semibold">
                  <div className="flex items-center">
                    {/* First div: Image placeholder */}
                    <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                    
                    {/* Second div: Course name and description */}
                    <div className="ml-4">
                      <h3 className="text-orange-600 text-2xl">{item.title}</h3>
                      <p className="text-xl">{item.type}</p>
                    </div>
                  </div>
                  
                  {/* Third div: Price and Delete button */}
                  <div className="flex items-center space-x-4">
                    <p className="text-xl">₹{item.price}</p>
                    <button className="bg-red-600 p-2 rounded-full text-white cursor-pointer transition-transform transform  shadow-lg  flex items-center justify-center">
                      <MdOutlineDeleteOutline className="w-8 h-8" />
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
    
        {/* Order Summary Section */}
        <div className="w-full md:max-w-md shadow-lg rounded-lg p-6 my-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">₹3000</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-green-500 font-semibold">Discount:</span>
              <span className="font-semibold text-green-500">-₹1500</span>
            </div>
            
            <div className="flex justify-between text-lg">
              <span>Total:</span>
              <span className="font-semibold">₹1500</span>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex flex-col items-start space-y-4">
              <input 
                type="text" 
                placeholder="Enter coupon code" 
                className="border border-gray-400 px-4 py-2 rounded-lg w-full"
              />
              <button className="bg-black text-white px-4 py-3 bg-gradient-to-r from-orange-400 to-orange-600  rounded-lg w-full font-bold ">
                Apply Coupon
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="font-bold bg-gradient-to-r from-orange-400 to-orange-600  text-white px-4 py-3 rounded-lg w-full ">
              Proceed to Checkout
            </button>
          </div>
          
          <p className="mt-4 text-sm text-gray-500">
            Need help? Contact our support team at support@joshguru.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default Cart;
