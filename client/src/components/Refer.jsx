import React from 'react';
import { motion } from 'framer-motion';
import { FaGift } from 'react-icons/fa';
import { FaShareSquare } from "react-icons/fa";
import { Button } from "../components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Copy } from 'lucide-react';
import { Label } from "../components/ui/label"

const ReferAndEarn = () => {
  const referralCode = 'ABC123XYZ';
  const referralLink = "https://joshguru.com/refer/referallcode"; // Add your referral link

  const rewards = [
    { id: 1, description: 'Friend 1 joined', reward: 100 },
    { id: 2, description: 'Friend 2 joined', reward: 150 },
    { id: 3, description: 'Friend 3 joined', reward: 200 },
  ];

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2 flex flex-col items-start">
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
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-orange-600"
                onClick={() => navigator.clipboard.writeText(referralCode)}
              >
                <FaShareSquare /> <span>Share</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-full sm:max-w-md p-2 sm:p-4"> {/* Add mobile responsiveness */}
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Send this link to refer your friends and earn rewards.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-x-2 sm:space-y-0"> {/* Ensure responsive flex */}
                <div className="flex-1">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue={referralLink}
                    readOnly
                    className="w-full"
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="px-3 w-full sm:w-auto" /* Full width button on mobile */
                  onClick={handleCopyReferralLink}
                >
                  <span className="sr-only">Copy</span>
                  <Copy />
                </Button>
              </div>
              <DialogFooter className="justify-start sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
