import React from "react";
import { MdDeleteOutline } from "react-icons/md";

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
    <section className="w-full min-h-screen px-4 md:px-8 lg:px-12 py-8">
      <div className="flex flex-col lg:flex-row lg:justify-center w-full lg:space-x-16 h-auto space-y-6 lg:space-y-0">
        {/* Cart Items Section */}
        <div className="w-full lg:w-6/12 xl:w-7/12 shadow-lg rounded-lg p-4 bg-white">
          <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
          <div className="">
            {cartItems.map((item) => (
              <div key={item.id} className="mb-4">
                <div className="flex items-center justify-between py-4 font-semibold">
                  <div className="flex items-center">
                    {/* First div: Image */}
                    <div className="w-20 h-20 bg-gray-300 rounded-lg">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                    </div>
                    
                    {/* Second div: Course name and description */}
                    <div className="ml-4 w-48">
                      <h3 className="text-orange-600 text-lg lg:text-xl">{item.title}</h3>
                      <p className="text-sm lg:text-md">{item.type}</p>
                    </div>
                  </div>

                  {/* Third div: Price and Delete button */}
                  <div className="flex items-center space-x-4">
                    <p className="text-md lg:text-xl">₹{item.price}</p>
                    <button className="hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-full  cursor-pointer transition-transform transform hover:scale-105 shadow-lg flex items-center justify-center duration-300">
                      <MdDeleteOutline className="w-6 h-6 lg:w-8 lg:h-8" />
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-3/12 xl:w-4/12 shadow-lg rounded-lg p-6 bg-white h-[450px]">
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
      <button className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-3 rounded-lg w-full font-bold">
        Apply Coupon
      </button>
    </div>
  </div>

  <div className="mt-4">
    <button className="font-bold bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-3 rounded-lg w-full">
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
