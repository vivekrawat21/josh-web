import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { motion } from "framer-motion";

const PrivacyAndSecurity = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="max-w-[70rem] mx-8 p-6 text-gray-600 text-sm"
    >
      <motion.h1 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5 }}
        className="text-5xl font-extrabold text-gray-900 mr-3 mb-14"
      >
        Privacy Policy
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        The <a href="https://joshguru.com" className="text-blue-600">https://joshguru.com</a> website ("Website") is owned and operated by Josh Guru Inc. ("we," "us," or "our"). This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our website and services ("Platform").
      </motion.p>
      
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6"
      >
        We provide a platform offering educational resources, professional insights, and industry connections. This Privacy Policy sets out the terms under which we process any personal information collected through:
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6"
      >
        {[
          "The Website",
          "Any software or mobile applications we make available",
          "Interactions with industry partners and contractors",
          "Communication via telephone, email, or other physical mediums (such as referral forms)"
        ].map((item, index) => (
          <motion.p 
            key={index} 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.3, delay: 0.1 * index }}
            className="flex items-center mb-2"
          >
            <AiOutlineCheckCircle className="text-orange-500 mr-2" /> {item}
          </motion.p>
        ))}
      </motion.div>
      
      <motion.section className="mb-6">
        <h2 className="text-xl font-bold text-gray-600 mb-2">Information We Collect</h2>
        <p>We collect various types of data, including:</p>
        <div className="mt-2">
          <p className="flex items-center"><AiOutlineCheckCircle className="text-orange-500 mr-2" /><strong>Personal Information:</strong> Name, email, phone number, and profile details</p>
          <p className="flex items-center"><AiOutlineCheckCircle className="text-orange-500 mr-2" /><strong>Usage Data:</strong> Device information, pages visited, and cookies</p>
          <p className="flex items-center"><AiOutlineCheckCircle className="text-orange-500 mr-2" /><strong>Third-Party Information:</strong> Data from social media logins</p>
        </div>
      </motion.section>
      
      <motion.section className="mb-6">
        <h2 className="text-xl font-bold text-gray-600 mb-2">How We Use Your Information</h2>
        <p>We use your data to:</p>
        <div className="mt-2">
          <p className="flex items-center"><AiOutlineCheckCircle className="text-orange-500 mr-2" /> Operate and improve our Platform</p>
          <p className="flex items-center"><AiOutlineCheckCircle className="text-orange-500 mr-2" /> Enhance user experience</p>
          <p className="flex items-center"><AiOutlineCheckCircle className="text-orange-500 mr-2" /> Respond to inquiries and provide support</p>
          <p className="flex items-center"><AiOutlineCheckCircle className="text-orange-500 mr-2" /> Send updates and promotional content</p>
          <p className="flex items-center"><AiOutlineCheckCircle className="text-orange-500 mr-2" /> Ensure security and prevent fraud</p>
        </div>
      </motion.section>
      
      <motion.section className="mb-6">
        <h2 className="text-xl font-bold text-gray-600 mb-2">Sharing Your Information</h2>
        <p>We do <strong>not</strong> sell your data. However, we may share it with:</p>
        <div className="mt-2">
          <p className="flex items-center"><AiOutlineCheckCircle className="text-orange-500 mr-2" /> Service providers (e.g., payment processors)</p>
          <p className="flex items-center"><AiOutlineCheckCircle className="text-orange-500 mr-2" /> Legal authorities when required</p>
          <p className="flex items-center"><AiOutlineCheckCircle className="text-orange-500 mr-2" /> Potential buyers in business transfers</p>
        </div>
      </motion.section>
      
      <motion.section className="mb-6">
        <h2 className="text-xl font-bold text-gray-600 mb-2">Data Security</h2>
        <p>We implement industry-standard security measures, but no online platform is 100% secure.</p>
      </motion.section>
      
      <motion.section className="mb-6">
        <h2 className="text-xl font-bold text-gray-600 mb-2">Your Rights & Choices</h2>
        <p>You have the right to:</p>
        <div className="mt-2">
          <p className="flex items-center"><AiOutlineCheckCircle className="text-orange-500 mr-2" /> Access, update, or delete your data</p>
          <p className="flex items-center"><AiOutlineCheckCircle className="text-orange-500 mr-2" /> Opt-out of marketing communications</p>
          <p className="flex items-center"><AiOutlineCheckCircle className="text-orange-500 mr-2" /> Request data portability</p>
        </div>
      </motion.section>
      
      <motion.section className="mb-6">
        <h2 className="text-xl font-bold text-gray-600 mb-2">Contact Us</h2>
        <p>If you have questions, reach out at:</p>
        <p>Email: <a href="mailto:privacy@joshguru.com" className="text-blue-600">privacy@joshguru.com</a></p>
      </motion.section>
    </motion.div>
  );
};

export default PrivacyAndSecurity;