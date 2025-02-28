import React from 'react';

const MyWallet = () => {
  const balance = 1200; // Example balance
  const transactions = [
    { id: 1, description: 'Payment Received', amount: 300 },
    { id: 2, description: 'Subscription Payment', amount: -50 },
    { id: 3, description: 'Gift Card', amount: 100 },
  ];

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">My Wallet</h1>
      <div className="mb-6">
        <p className="text-lg">Current Balance:</p>
        <p className="text-3xl font-semibold text-green-600">${balance}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Transactions</h2>
        <ul className="space-y-2">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex justify-between bg-white p-3 rounded-lg shadow-sm"
            >
              <span>{transaction.description}</span>
              <span
                className={`font-semibold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.amount > 0 ? '+' : ''}
                ${transaction.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyWallet;
