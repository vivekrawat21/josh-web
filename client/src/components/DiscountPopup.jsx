import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "@/utils/utils";
import { Link } from "react-router-dom";

export default function DiscountPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      axios.get(`${BASE_URL}/popup`)
        .then((response) => {
          const activeOffers = response.data?.data?.popup?.filter(offer => offer.isActive) || [];
          if (activeOffers.length > 0) {
            setOffers(activeOffers);
            setShowPopup(true);
          }
        })
        .catch(error => console.error("Error fetching offers:", error));
    }, 500);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <Dialog open={showPopup} onOpenChange={handleClose}>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.9 }} 
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-[90%] sm:max-w-md mx-auto"
          >
            <DialogContent className="p-5 sm:p-6 rounded-xl shadow-xl bg-gradient-to-r from-orange-500 to-red-600 text-white text-center border-4 border-orange-300">
              
              {/* Accessible Dialog Title */}
              <DialogTitle className="text-2xl sm:text-3xl font-bold mb-4">🔥 Exclusive Offers! 🔥</DialogTitle>

              {offers.length > 0 && offers.map((offer) => {
               
                const discountAmount = (offer.bundle.price - offer.bundle.discountedPrice).toFixed(1);
                const discountPercentage = offer.bundle.discount.toFixed(1);
                const offertext = offer.text.trim()==""?`${offer.bundle.bundleName} has ${discountPercentage}% discount!`:offer.text;

                return (
                  <motion.div 
                    key={offer._id} 
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                    className="mb-4 p-4 sm:p-5 bg-white text-black rounded-lg shadow-md border border-gray-300"
                  >
                    <p className="text-lg sm:text-xl font-bold text-orange-600">{offer.bundle.bundleName}</p>
                    <p className="text-xs sm:text-sm text-gray-700 mt-1">
                   {offertext}
                    </p>
                    <p className="text-md sm:text-lg font-bold text-red-600 mt-2">
                      <span className="line-through text-gray-500 mr-1">${offer.bundle.price}</span>
                      <span className="text-green-600">${offer.bundle.discountedPrice}</span>
                    </p>
                    <p className="text-md sm:text-lg font-extrabold mt-1">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
                        Save ${discountAmount} ({discountPercentage}%)
                      </span>
                    </p>
                    <Link to={/bundle/+offer?.bundle?._id} >
                    <Button  
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold mt-4 w-full transition-all duration-300 transform hover:scale-105 shadow-md">
                      🚀 Grab This Deal
                    </Button>
                    </Link>
                  </motion.div>
                );
              })}
            </DialogContent>
          </motion.div>
        </div>
      )}
    </Dialog>
  );
}
