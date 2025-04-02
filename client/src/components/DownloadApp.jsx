import React from "react";
import { Link } from "react-router-dom";
const DownloadApp = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-[#fdf6ed] p-8 md:p-16 rounded-xl">
      {/* Phone Image */}
      <div className="w-64 md:w-72 lg:w-80 mb-6 md:mb-0">
        <img
          src="/mobileframe3.jpg"
          alt="Mobile App Preview"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Text and Download Buttons */}
      <div className="text-center md:text-left md:ml-12">
        <p className="text-sm text-[#d59a59] font-semibold">Join 10000+ users</p>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-2 leading-tight">
          The road to happiness <br /> begins now.
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
          <Link
            to="#"
            className="w-40 h-12 flex items-center justify-center bg-black text-white rounded-lg shadow-md hover:opacity-80 transition"
          >
            <img
              src="/applelogo.webp"
              alt="App Store"
              className="w-24"
            />
          </Link>
          <Link
            to="#"
            className="w-40 h-12 flex items-center justify-center bg-black text-white rounded-lg shadow-md hover:opacity-80 transition"
          >
            <img
              src="/google_play.webp"
              alt="Google Play"
              className="w-24"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;