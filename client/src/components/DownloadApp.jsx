import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DownloadApp = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-16 py-10  gap-10 mb-16 bg-orange-100 mx-4">
      {/* Text Section */}
      <div className="w-full lg:w-5/12 text-center lg:text-left">
        <p className="text-xl sm:text-4xl text-orange-500 font-semibold">
          Join 10,000+ users
        </p>
        <p className="text-base sm:text-lg md:text-xl text-gray-900 mt-3 leading-relaxed">
          Unlock seamless learning on the go. Get access to premium features,
          latest updates, and personalized content—available now on the App
          Store and Google Play.
          <br />
          <span className="font-medium">Your journey begins now.</span>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-6">
          <Link
            to="#"
            className="w-40 h-12 flex items-center justify-center bg-black text-white rounded-lg shadow-md hover:opacity-80 transition"
          >
            <img src="/applelogo.webp" alt="App Store" className="w-24" />
          </Link>
          <Link
            to="#"
            className="w-40 h-12 flex items-center justify-center bg-black text-white rounded-lg shadow-md hover:opacity-80 transition"
          >
            <img src="/google_play.webp" alt="Google Play" className="w-24" />
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-7/12 flex justify-center lg:justify-end overflow-hidden">
        <motion.div
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="/MobileFrame6.png"
            alt="Mobile App Preview"
            className="w-[300px] sm:w-[340px] md:w-[420px] lg:w-[480px] xl:w-[600px] h-auto object-contain rounded-lg drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default DownloadApp;
