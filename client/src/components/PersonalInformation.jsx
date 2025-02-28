import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaKey, FaGlobe } from "react-icons/fa";

const PersonalInfo = () => {
  const [info, setInfo] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 9876543210",
    referralCode: "ABC1234",
    country: "India",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempInfo, setTempInfo] = useState(info);
  const [saved, setSaved] = useState(false);

  const handleEdit = () => {
    if (isEditing) {
      setInfo(tempInfo);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-start">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h1>

        <div className="space-y-4">
          {[
            { label: "Full Name", value: info.fullName, icon: <FaUser />, key: "fullName" },
            { label: "Email Address", value: info.email, icon: <FaEnvelope />, key: "email" },
            { label: "Phone Number", value: info.phone, icon: <FaPhone />, key: "phone" },
            { label: "Referral Code", value: info.referralCode, icon: <FaKey />, key: "referralCode" },
            { label: "Country", value: info.country, icon: <FaGlobe />, key: "country" },
          ].map(({ label, value, icon, key }) => (
            <div key={key}>
              <label className="text-gray-600 text-sm block mb-1">{label}</label>
              <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-200 shadow-sm">
                <span className="text-gray-500 mr-2">{icon}</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={tempInfo[key]}
                    onChange={(e) => setTempInfo({ ...tempInfo, [key]: e.target.value })}
                    className="w-full bg-transparent outline-none text-gray-800"
                  />
                ) : (
                  <span className="text-gray-800">{value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <motion.button
          onClick={handleEdit}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full bg-gradient-to-r from-orange-500 to-orange-700 text-white py-3 rounded-lg font-semibold hover:opacity-90"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </motion.button>

        {saved && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 text-green-600 text-center font-medium"
          >
            ✅ Changes Saved!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PersonalInfo;
