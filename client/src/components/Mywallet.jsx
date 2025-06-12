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

// --- Shimmer Component for Loading State ---
const ShimmerCard = () => (
  <div className="h-24 bg-gray-200 rounded-2xl animate-pulse"></div>
);

const MyWalletShimmer = () => (
  <div className="w-full max-w-3xl mx-auto">
    {/* Profile Shimmer */}
    <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm animate-pulse">
      <div className="w-20 h-20 rounded-full bg-gray-300"></div>
      <div className="flex-1 space-y-3">
        <div className="h-5 w-3/4 bg-gray-300 rounded-md"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>
      </div>
    </div>
    {/* Cards Shimmer */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
      <ShimmerCard />
    </div>
  </div>
);


const MyWallet = () => {
  const user = useSelector((state) => state?.user);

  // If user data is not yet loaded, show the shimmer.
  if (!user) {
    return (
      <div className="flex justify-center bg-orange-50 min-h-screen p-4 sm:p-6 lg:p-8 ">
        <MyWalletShimmer />
      </div>
    );
  }

  const getIncomeBreakdown = (incomeHistory = []) => {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  
    let todayIncome = 0;
    let income7Days = 0;
    let income30Days = 0;
  
    incomeHistory.forEach((entry) => {
      const entryDate = new Date(entry.date);
      if (entryDate >= startOfToday) {
        todayIncome += entry.amount;
      }
      if (entryDate >= last7Days) {
        income7Days += entry.amount;
      }
      if (entryDate >= last30Days) {
        income30Days += entry.amount;
      }
    });
  
    return { todayIncome, income7Days, income30Days };
  };

  const { todayIncome, income7Days, income30Days } = getIncomeBreakdown(user.incomeHistory);
  
  const cardData = [
    {
      title: "My Total Team",
      value: user?.totalTeam || 0,
      icon: <FaUsers />,
      gradient: "from-[#FFA500] to-[#FF8C00]",
    },
    {
      title: "My Total Income",
      value: (user?.total_income || 0).toFixed(2),
      currency: true,
      icon: <FaMoneyBillWave />,
      gradient: "from-[#00BFFF] to-[#1E90FF]",
    },
    {
      title: "Today's Income",
      value: todayIncome.toFixed(2),
      currency: true,
      icon: <FaBolt />,
      gradient: "from-[#FFA500] to-[#FF8C00]",
    },
    {
      title: "Last 7 Days",
      value: income7Days.toFixed(2),
      currency: true,
      icon: <FaCalendarWeek />,
      gradient: "from-[#00BFFF] to-[#1E90FF]",
    },
    {
      title: "Last 30 Days",
      value: income30Days.toFixed(2),
      currency: true,
      icon: <FaCalendarAlt />,
      gradient: "from-[#FFA500] to-[#FF8C00]",
    },
    {
      title: "Incentive",
      value: (user?.incentive || 0).toFixed(2),
      currency: true,
      icon: <FaGift />,
      gradient: "from-[#00BFFF] to-[#1E90FF]",
    },
  ];

  return (
    <div className="flex justify-center bg-orange-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        {/* Profile Section */}
        <div className="flex items-center gap-4 sm:gap-6 bg-white p-5 rounded-2xl shadow-lg border border-orange-100 mb-6 md:mt-6">
          <img
            src={user?.profilePic || DefaultProfile}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-orange-200"
          />
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              <span className="font-light">Welcome, </span>
              {user?.name || "User"}
            </h2>
            {user?.canRefer && (
               <p className="mt-1 text-gray-500 text-sm sm:text-base font-medium bg-orange-100 text-orange-700 px-3 py-1 rounded-full inline-block">
                Referral ID: <span className="font-bold">{user?.sharableReferralCode || "N/A"}</span>
             </p>
            )}
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cardData.map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              currency={card.currency}
              gradient={card.gradient}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const InfoCard = ({ title, value, icon, currency, gradient }) => {
  return (
    <div
      className={`flex items-center justify-between bg-gradient-to-br ${gradient} text-white p-5 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="flex items-center space-x-4">
        {icon && <span className="text-3xl opacity-80">{icon}</span>}
        <p className="font-semibold text-base sm:text-lg">{title}</p>
      </div>
      <div className="font-bold text-xl sm:text-2xl flex items-center">
        {currency && <FaRupeeSign className="inline-block h-5 w-5 mr-1 opacity-90" />}
        {value}
      </div>
    </div>
  );
};

export default MyWallet;