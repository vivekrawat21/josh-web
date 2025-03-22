import React from "react";
import { FaUser, FaRupeeSign } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import DefaultProfile from "../assets/DefaultProfile.png";


const PersonalInformation = () => {
  const user = useSelector((state) => state?.user);


  return (
    <div className=" flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md md:max-w-2xl"
      >
        <div className="flex items-center justify-between mb-4 p-4 bg-gray-200 rounded-lg">
          <img
            src={user?.profilePic || DefaultProfile}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div className="text-right">
            <h2 className="md:text-lg  font-semibold"><b className="text-orange-500">
              Welcome </b>{user?.name}</h2>
            <p className="text-gray-600 md:text-lg text-sm">Referral ID: {user?.sharableReferralCode}</p>
          </div>
        </div>

        <div className="space-y-3">
          <InfoCard title="My Total Team" value={user?.total_team||0} icon={<FaUser />} gradient="from-yellow-400 to-yellow-600" />
          <InfoCard title="My Total Income" value={user?.total_income} currency gradient="from-orange-400 to-orange-600" />
          <InfoCard title="Today Income" value={user?.today_income} currency gradient="from-yellow-400 to-yellow-600" />
          <InfoCard title="Last 7 Days Income" value={user?.last_7_days_income} currency gradient="from-orange-400 to-orange-600" />
          <InfoCard title="Last 30 Days Income" value={user?.last_30_days_income} currency gradient="from-yellow-400 to-yellow-600" />
          <InfoCard title="Incentive" value={user?.incentive} currency gradient="from-orange-400 to-orange-600" />
        </div>
      </motion.div>
    </div>
  );
};

const InfoCard = ({ title, value, icon, currency, gradient }) => {
  return (
    <div className={`flex items-center justify-between bg-gradient-to-r ${gradient} text-white p-4 rounded-lg shadow-md text-lg` }>
      <div className="flex items-center space-x-2">
        {icon && <span className="text-xl">{icon}</span>}
        <p className="text-base font-medium">{title}</p>
      </div>
      <div className="font-bold">
        {currency && <FaRupeeSign className="inline" />} {value}
      </div>
    </div>
  );
};

export default PersonalInformation;
