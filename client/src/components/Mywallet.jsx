import React from 'react';
import { motion } from 'framer-motion';
import { FaWallet, FaMoneyBillWave } from 'react-icons/fa';

const MyWallet = () => {
  const balance = 1200; // Example balance
  const transactions = [
    { id: 1, description: 'Payment Received', amount: 300 },
    { id: 2, description: 'Subscription Payment', amount: -50 },
    { id: 3, description: 'Gift Card', amount: 100 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 flex flex-col items-start">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <FaWallet className="text-orange-500" />
          <span>My Wallet</span>
        </h1>

        <div className="mb-6">
          <p className="text-lg text-gray-600">Current Balance:</p>
          <motion.p
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-semibold text-green-600"
          >
            ${balance}
          </motion.p>
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mb-3">Recent Transactions</h2>
        <ul className="space-y-3">
          {transactions.map((transaction) => (
            <motion.li
              key={transaction.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: transaction.id * 0.1 }}
              className="flex justify-between bg-gray-200 p-4 rounded-lg shadow-sm"
            >
              <span className="flex items-center space-x-2">
                <FaMoneyBillWave className={`text-lg ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`} />
                <span>{transaction.description}</span>
              </span>
              <span className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.amount > 0 ? '+' : ''}${transaction.amount}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default MyWallet;
