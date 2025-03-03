import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes, FaLifeRing } from "react-icons/fa";

const HelpSupport = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-start">
      {/* Main Help Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Help & Support</h1>
        <p className="text-gray-600 mb-4">We're here to assist you with any issues or questions. Check out the frequently asked questions or reach out to us directly.</p>
        
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Frequently Asked Questions</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="border-b pb-2">📌 How do I reset my password?</li>
          <li className="border-b pb-2">📌 Where can I view my invoices?</li>
          <li className="border-b pb-2">📌 How do I contact customer support?</li>
        </ul>
        
        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Contact Us</h2>
        <p className="text-gray-600">📧 Email: <span className="text-orange-600">support@example.com</span></p>
        <p className="text-gray-600">📞 Phone: +1 234 567 890</p>
      </motion.div>
      
      {/* Floating Help Button (Right Aligned) */}
      <div className="fixed bottom-5 right-5">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-5 py-3 rounded-full shadow-xl flex items-center space-x-2 hover:shadow-2xl"
          onClick={() => setOpen(!open)}
        >
          <FaLifeRing className="text-lg" />
          <span>Help & Support</span>
        </motion.button>
      
        {/* Help Modal */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-20 right-5 bg-white shadow-2xl rounded-lg p-5 w-72"
          >
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Need Assistance?</h2>
              <button onClick={() => setOpen(false)}>
                <FaTimes className="text-gray-600 hover:text-red-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Our support team is here to help! Reach out via email or chat with us.
            </p>
            <div className="text-sm font-medium text-gray-800">
              📧 Email: <span className="text-orange-600">support@example.com</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 w-full bg-gradient-to-r from-orange-500 to-orange-700 text-white py-2 rounded-lg font-semibold"
              onClick={() => setOpen(false)}
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HelpSupport;
