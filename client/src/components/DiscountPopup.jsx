import { useState, useEffect } from "react";
import { X } from "lucide-react"; // Modern close button icon

const DiscountPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 4 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 4000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 relative text-center">
          {/* Close Button */}
          <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>

          {/* Discount Message */}
          <h2 className="text-2xl font-bold text-gray-800">🔥 Exclusive Offer! 🔥</h2>
          <p className="mt-2 text-lg text-gray-600">Unlock our top courses at a special discount!</p>

          {/* Price Section */}
          <div className="mt-4 flex items-center justify-center space-x-3">
            <span className="text-gray-500 text-lg line-through">₹4999</span> {/* Old Price */}
            <span className="text-blue-500 text-2xl font-bold">₹2499</span> {/* New Price */}
          </div>

          {/* Call-to-Action Button */}
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
            Enroll Now
          </button>

          {/* Limited Time Badge */}
          <p className="mt-2 text-sm text-red-500 font-medium">Offer valid for a limited time only!</p>
        </div>
      </div>
    )
  );
};

export default DiscountPopup;
