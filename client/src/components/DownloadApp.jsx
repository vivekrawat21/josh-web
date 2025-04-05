import React from "react";
import { Link } from "react-router-dom";

const DownloadApp = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-16 py-10 rounded-xl gap-10 mb-16">
      {/* Text and Download Buttons */}
      <div className="w-full lg:w-5/12 text-center lg:text-left">
        <p className="text-xl sm:text-2xl text-orange-500 font-semibold">
          Join 10,000+ users
        </p>
        <p className="text-sm sm:text-base md:text-lg text-gray-900 mt-3 leading-relaxed">
          Unlock seamless learning on the go. Get access to premium features, latest updates, and personalized content—available now on the App Store and Google Play.
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

      {/* Phone Image */}
      <div className="w-full lg:w-7/12 flex justify-center lg:justify-end">
        <img
          src="/MobileFrame6.png"
          alt="Mobile App Preview"
          className="w-[220px] sm:w-[280px] md:w-[360px] lg:w-[450px] xl:w-[500px] h-auto object-contain rounded-lg drop-shadow-[0_10px_10px_rgba(0,0,0,0.25)]"
        />
      </div>
    </div>
  );
};

export default DownloadApp;
