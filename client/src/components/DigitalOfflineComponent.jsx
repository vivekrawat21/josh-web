import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const DigitalOfflineComponent = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-orange-50 px-4 py-8">
      <div className="max-w-lg w-full bg-white/95 shadow-2xl rounded-3xl p-6 sm:p-10 flex flex-col items-center gap-6">
        <FaMapMarkerAlt className="text-orange-500 text-4xl mb-2" />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-black text-center mb-2">
          Offline Course Information
        </h1>
        <p className="text-lg text-gray-800 text-center font-semibold">
           The <span className="text-orange-600">Selected course</span> is an <span className="font-bold">offline course</span>.
        </p>
        <p className="text-gray-700 text-center">
          For purchasing or further assistance, please contact our team directly using the details below:
        </p>
        <div className="flex flex-col gap-3 w-full items-center">
          <div className="flex items-center gap-3 bg-orange-100 rounded-xl px-4 py-3 w-full max-w-xs">
            <FaEnvelope className="text-orange-600 text-xl" />
            <a
              href="mailto:support@joshguru.com"
              className="text-base text-orange-700 font-medium hover:underline break-all"
            >
              support@joshguru.com
            </a>
          </div>
          <div className="flex items-center gap-3 bg-orange-100 rounded-xl px-4 py-3 w-full max-w-xs">
            <FaPhoneAlt className="text-orange-600 text-xl" />
            <a
              href="tel:+918191980334"
              className="text-base text-orange-700 font-medium hover:underline"
            >
              +91-8191980334
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-500 text-sm">
          Our team will guide you through the process and answer any questions you may have.
        </div>
      </div>
    </div>
  );
};

export default DigitalOfflineComponent;
