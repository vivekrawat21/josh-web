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
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-start">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Invoices</h1>
        <p className="text-gray-600 mb-4">Here are your purchased course invoices.</p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-lg shadow-sm"
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
    </div>
  );
};

export default Invoices;
