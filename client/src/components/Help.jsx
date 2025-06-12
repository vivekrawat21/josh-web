import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaLifeRing } from "react-icons/fa";
import { Link } from "react-router-dom";

const HelpSupport = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-lg bg-orange-50 flex justify-center py-6 px-2 sm:px-4">
      {/* Main Help Section */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white/95 shadow-2xl rounded-3xl p-5 sm:p-10 flex flex-col gap-6"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
          Help & Support
        </h1>
        <p className="text-gray-700 text-base sm:text-lg mb-2">
          We're here to assist you with any issues or questions. Check out the frequently asked questions or reach out to us directly.
        </p>
        
        <div>
          <h2 className="text-xl font-semibold text-black mb-3">Frequently Asked Questions</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="border-b pb-2">📌 How do I reset my password?</li>
            <li className="border-b pb-2">📌 Where can I view my invoices?</li>
            <li className="border-b pb-2">📌 How do I contact customer support?</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-black mt-6 mb-3">Contact Us</h2>
          <div className="flex flex-col gap-2 text-base">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">📧 Email:</span>
              <a href="mailto:support@joshguru.com" className="text-orange-600 hover:underline break-all">
                support@joshguru.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">📞 Phone:</span>
              <a href="tel:+918191980334" className="text-orange-600 hover:underline">
                +91-8191980334
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">🌐 Website:</span>
              <a
                href="https://www.joshguru.com"
                className="text-orange-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.joshguru.com
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Help Button (Right Aligned) */}
      <div className="fixed bottom-5 right-5 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-orange-500 to-orange-700 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2 hover:shadow-2xl font-semibold"
          onClick={() => setOpen(!open)}
        >
          <FaLifeRing className="text-lg" />
          <span>Help & Support</span>
        </motion.button>

        {/* Help Modal */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="fixed bottom-24 right-5 w-80 max-w-[90vw] bg-white shadow-2xl rounded-2xl p-6 z-50"
            >
              <div className="flex justify-between items-center border-b pb-2 mb-3">
                <h2 className="text-lg font-semibold text-black">Need Assistance?</h2>
                <button onClick={() => setOpen(false)} aria-label="Close">
                  <FaTimes className="text-gray-600 hover:text-red-500" />
                </button>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Our support team is here to help! Reach out via email, phone, or visit our website.
              </p>
              <div className="text-sm font-medium text-gray-800 space-y-2">
                <div>
                  📧 Email:{" "}
                  <a href="mailto:support@joshguru.com" className="text-orange-600 hover:underline break-all">
                    support@joshguru.com
                  </a>
                </div>
                <div>
                  📞 Phone:{" "}
                  <a href="tel:+918191980334" className="text-orange-600 hover:underline">
                    +91-8191980334
                  </a>
                </div>
                <div>
                  🌐 Website:{" "}
                  <a
                    href="https://www.joshguru.com"
                    className="text-orange-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.joshguru.com
                  </a>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-5 w-full bg-gradient-to-r from-orange-500 to-orange-700 text-white py-2 rounded-lg font-semibold shadow"
                onClick={() => setOpen(false)}
              >
                Close
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HelpSupport;
