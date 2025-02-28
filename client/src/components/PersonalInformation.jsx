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
      setTimeout(() => setSaved(false), 2000); // Reset saved state after 2 sec
    }
    setIsEditing(!isEditing);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-10 bg-gray-100 min-h-screen flex flex-col items-start"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Profile</h1>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg"
      >
        {[
          { label: "Full Name", value: info.fullName, icon: <FaUser />, key: "fullName" },
          { label: "Email Address", value: info.email, icon: <FaEnvelope />, key: "email" },
          { label: "Phone Number", value: info.phone, icon: <FaPhone />, key: "phone" },
          { label: "Referral Code", value: info.referralCode, icon: <FaKey />, key: "referralCode" },
          { label: "Country", value: info.country, icon: <FaGlobe />, key: "country" }
        ].map(({ label, value, icon, key }) => (
          <div className="mb-4" key={key}>
            <label className="text-gray-600 text-sm block mb-1">{label}</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <span className="text-gray-500 mr-2">{icon}</span>
              {isEditing ? (
                <input
                  type="text"
                  value={tempInfo[key]}
                  onChange={(e) => setTempInfo({ ...tempInfo, [key]: e.target.value })}
                  className="w-full bg-transparent outline-none"
                />
              ) : (
                <span className="text-gray-700">{value}</span>
              )}
            </div>
          </div>
        ))}
        <motion.button
          onClick={handleEdit}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full bg-gradient-to-r from-orange-500 to-orange-700 text-white py-3 rounded-lg font-semibold"
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
    </motion.div>
  );
};

export default PersonalInfo;
