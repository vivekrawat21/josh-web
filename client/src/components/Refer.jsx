import React from 'react';

const ReferAndEarn = () => {
  const referralCode = 'ABC123XYZ';
  const referralLink = `https://yourwebsite.com/refer/${referralCode}`;

  const rewards = [
    { id: 1, description: 'Friend 1 joined', reward: 100 },
    { id: 2, description: 'Friend 2 joined', reward: 150 },
    { id: 3, description: 'Friend 3 joined', reward: 200 },
  ];

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Refer & Earn</h1>
      <div className="mb-6">
        <p className="text-lg">Your Referral Code:</p>
        <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
          <span className="text-xl font-semibold">{referralCode}</span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => navigator.clipboard.writeText(referralCode)}
          >
            Copy Code
          </button>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-lg">Referral Link:</p>
        <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
          <span className="text-sm">{referralLink}</span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={() => navigator.clipboard.writeText(referralLink)}
          >
            Copy Link
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Referral Rewards</h2>
        <ul className="space-y-2">
          {rewards.map((reward) => (
            <li
              key={reward.id}
              className="flex justify-between bg-white p-3 rounded-lg shadow-sm"
            >
              <span>{reward.description}</span>
              <span className="font-semibold text-green-600">${reward.reward}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReferAndEarn;
