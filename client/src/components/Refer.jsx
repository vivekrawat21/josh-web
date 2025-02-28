import React from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaGift } from 'react-icons/fa';

const ReferAndEarn = () => {
  const referralCode = 'ABC123XYZ';

  const rewards = [
    { id: 1, description: 'Friend 1 joined', reward: 100 },
    { id: 2, description: 'Friend 2 joined', reward: 150 },
    { id: 3, description: 'Friend 3 joined', reward: 200 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-start">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Refer & Earn</h1>
        <p className="text-gray-600 mb-4">Invite your friends and earn rewards when they join!</p>

        <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Referral Code</h2>
        <div className="flex items-center justify-between bg-gray-200 p-4 rounded-lg shadow-sm">
          <span className="text-lg font-semibold">{referralCode}</span>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600"
            onClick={() => navigator.clipboard.writeText(referralCode)}
          >
            <FaCopy /> <span>Copy</span>
          </button>
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mt-6 mb-4">Your Rewards</h2>
        <ul className="space-y-3">
          {rewards.map((reward) => (
            <motion.li
              key={reward.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: reward.id * 0.1 }}
              className="flex justify-between bg-gray-200 p-4 rounded-lg shadow-sm"
            >
              <span className="flex items-center space-x-2">
                <FaGift className="text-orange-500" />
                <span>{reward.description}</span>
              </span>
              <span className="font-semibold text-green-600">${reward.reward}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default ReferAndEarn;
