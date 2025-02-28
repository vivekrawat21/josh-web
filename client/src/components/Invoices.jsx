import React from "react";
import { motion } from "framer-motion";

const Invoices = () => {
  const invoices = [
    { id: 1, course: "React Mastery", type: "Single", total: "₹3,500" },
    { id: 2, course: "Full Stack Bootcamp", type: "Bundle", total: "₹12,000" },
    { id: 3, course: "Data Science Pro", type: "Single", total: "₹5,000" },
    { id: 4, course: "UI/UX Design Essentials", type: "Bundle", total: "₹7,500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 min-h-screen bg-gray-100"
    >
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-800 mb-6"
      >
        Invoices
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6 overflow-hidden"
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="p-4 text-left">Course Name</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Total (INR)</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <motion.tr 
                key={invoice.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <td className="p-4 text-gray-700 font-medium">{invoice.course}</td>
                <td className="p-4 text-gray-600">{invoice.type}</td>
                <td className="p-4 font-semibold text-orange-600">{invoice.total}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default Invoices;
