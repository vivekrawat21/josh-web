import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGift } from 'react-icons/fa';
import { Copy, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useSelector } from 'react-redux';

const Refer = () => {
  const user = useSelector((state) => state.user);
  const [incomeHistory, setIncomeHistory] = useState([]);
  const [copy, setCopy] = useState(false);

  const referralHeader = 'https://joshguru.com/signup?referralCode=';
  const referralLink = `${referralHeader}${user?.sharableReferralCode}`;

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

  useEffect(() => {
    if (user?.incomeHistory && Array.isArray(user?.incomeHistory)) {
      const updatedIncome = user.incomeHistory.map((item) => ({
        id: item._id,
        amount: item.amount,
        person: item.from?.name || 'Unknown',
      }));
      setIncomeHistory(updatedIncome);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center py-8 px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white/90 shadow-2xl rounded-3xl p-5 sm:p-10 flex flex-col gap-8"
      >
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-1">
            Refer & Earn
          </h1>
          <p className="text-gray-600 text-base sm:text-lg text-center max-w-xl">
            Invite your friends and earn rewards when they join! Share your unique referral link below.
          </p>
        </div>

        {/* Referral Section */}
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-10 items-stretch">
          {user?.canRefer ? (
            <div className="flex-1 flex flex-col gap-4 bg-orange-100 border border-orange-200 rounded-2xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-orange-700 mb-2">Your Referral Link</h2>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                <Input
                  id="link"
                  value={referralLink}
                  readOnly
                  className="flex-1 bg-white border-orange-200"
                />
                <Button
                  type="button"
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 flex items-center gap-2"
                  onClick={handleCopyReferralLink}
                >
                  {copy ? (
                    <span className="text-white font-semibold">Copied!</span>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      size="sm"
                      className="bg-orange-400 hover:bg-orange-500 text-white px-3 flex items-center gap-2"
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[95%] sm:max-w-md p-4 sm:p-6 mx-auto">
                    <DialogHeader>
                      <DialogTitle>Share your referral link</DialogTitle>
                      <DialogDescription>
                        Send this code to your friends and earn rewards when they sign up.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4">
                      <Input id="link" value={referralLink} readOnly className="w-full" />
                      <Button
                        type="button"
                        size="sm"
                        className="px-3 sm:w-auto"
                        onClick={handleCopyReferralLink}
                      >
                        {copy ? <span className="text-gray-50">Copied!</span> : <Copy size={16} />}
                      </Button>
                    </div>
                    <DialogFooter className="justify-start sm:justify-end mt-4">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="secondary"
                          className="bg-gray-300 text-gray-700 hover:bg-gray-400"
                        >
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Share this link with your friends and start earning!
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center bg-orange-100 border border-orange-200 rounded-2xl p-5 shadow-sm">
              <p className="text-center text-orange-600 font-semibold">
                You need to buy a Trending Course or Bundle to Refer.
              </p>
            </div>
          )}
        </div>

        {/* Rewards Section */}
        <div className="w-full">
          <h2 className="text-lg font-semibold text-orange-700 mb-3">Your Rewards</h2>
          <ul className="space-y-3">
            {incomeHistory.length === 0 ? (
              <li className="text-gray-400 text-base italic text-center">
                No rewards yet. Start referring!
              </li>
            ) : (
              incomeHistory.map((reward, index) => (
                <motion.li
                  key={reward.id || index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex justify-between items-center bg-orange-50 border border-orange-200 p-4 rounded-xl shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 text-sm sm:text-base text-gray-700">
                    <FaGift className="text-orange-500 text-lg" />
                    <span className="truncate">{reward?.person} joined</span>
                  </div>
                  <span className="text-green-600 font-bold text-sm sm:text-base whitespace-nowrap">
                    ₹{parseFloat(reward?.amount).toFixed(2)}
                  </span>
                </motion.li>
              ))
            )}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Refer;
