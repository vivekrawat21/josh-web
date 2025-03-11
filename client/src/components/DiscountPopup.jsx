import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function OfferPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("seenOfferPopup");
    if (hasSeenPopup) return;
    
    axios.get("/api/latest-offer").then((response) => {
      if (response.data && response.data.hasDiscount) {
        setOffer(response.data);
        setShowPopup(true);
      }
    });
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem("seenOfferPopup", "true");
  };

  return (
    <Dialog open={showPopup} onOpenChange={handleClose}>
      <DialogContent className="p-6 rounded-2xl shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
        <h2 className="text-2xl font-bold">Exclusive Offer!</h2>
        {offer && (
          <p className="my-2 text-lg">
            Get a special discount on <strong>{offer.courseName}</strong>.
          </p>
        )}
        <Button 
          onClick={() => window.location.href = `/bundles/${offer?.id}`} 
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold">
          View Bundle
        </Button>
      </DialogContent>
    </Dialog>
  );
}
