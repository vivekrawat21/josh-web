import React from "react";
import {
  FaUser,
  FaRupeeSign,
  FaUsers,
  FaMoneyBillWave,
  FaBolt,
  FaCalendarWeek,
  FaCalendarAlt,
  FaGift,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import DefaultProfile from "../assets/DefaultProfile.png";

const PersonalInformation = () => {
  const user = useSelector((state) => state?.user);

  return (
    <div className="flex  justify-center bg-gray-100 p-4 ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md sm:max-w-xl"
      >
        {/* Profile Section */}
        <div className="flex items-center justify-between mb-4 p-4 bg-gray-200 rounded-lg">
          <img
            src={user?.profilePic || DefaultProfile}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="text-right flex-1 ml-4">
            <h2 className="text-base sm:text-lg font-semibold">
              <span className="text-orange-500 font-bold">Welcome </span>
              <span className="font-bold">{user?.name || "User"}</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base font-semibold">
              Referral ID: {user?.sharableReferralCode || "N/A"}
            </p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="space-y-3">
          <InfoCard
            title="My Total Team"
            value={user?.total_team || 0}
            icon={<FaUsers />}
            gradient="from-[#FFA500] to-[#FF8C00]"
          />
          <InfoCard
            title="My Total Income"
            value={user?.total_income}
            currency
            icon={<FaMoneyBillWave />}
            gradient="from-[#00BFFF] to-[#1E90FF]"
          />
          <InfoCard
            title="Today Income"
            value={user?.today_income}
            currency
            icon={<FaBolt />}
            gradient="from-[#FFA500] to-[#FF8C00]"
          />
          <InfoCard
            title="Last 7 Days Income"
            value={user?.last_7_days_income}
            currency
            icon={<FaCalendarWeek />}
            gradient="from-[#00BFFF] to-[#1E90FF]"
          />
          <InfoCard
            title="Last 30 Days Income"
            value={user?.last_30_days_income}
            currency
            icon={<FaCalendarAlt />}
            gradient="from-[#FFA500] to-[#FF8C00]"
          />
          <InfoCard
            title="Incentive"
            value={user?.incentive}
            currency
            icon={<FaGift />}
            gradient="from-[#00BFFF] to-[#1E90FF]"
          />
        </div>
      </motion.div>
    </div>
  );
};

const InfoCard = ({ title, value, icon, currency, gradient }) => {
  return (
    <div
      className={`flex items-center justify-between bg-gradient-to-r ${gradient} text-white p-3 sm:p-4 rounded-lg shadow-md text-sm sm:text-base`}
    >
      <div className="flex items-center space-x-2">
        {icon && (
          <span className="text-xl sm:text-1xl" style={{ color: "bg-gradient-to-r from-[#0090cc] to-[#1667c7]" }}>
            {icon}
          </span>
        )}
        <p className="font-bold">{title}</p>
      </div>
      <div className="font-extrabold text-white">
        {currency && <FaRupeeSign className="inline mr-1" />} {value || 0}
      </div>
    </div>
  );
};

export default PersonalInformation;
