import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import icons

const CustomToast = ({ message, type = "success", onClose }) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (message) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        onClose();
      }, 3000); // auto-close after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  useEffect(() => {
    // Store toast in localStorage when message changes
    if (message) {
      localStorage.setItem("toast", JSON.stringify({ message, type }));
    }
  }, [message, type]);

  const savedToast = JSON.parse(localStorage.getItem("toast"));

  // If there's a saved toast in localStorage, show it
  useEffect(() => {
    if (savedToast) {
      setShowToast(true);
      // Optionally call `onClose` here if you want to close the toast after loading from localStorage
    }
  }, [savedToast]);

  return (
    showToast && (
      <div
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-md flex items-center gap-2
        ${type === "success" ? "bg-green-600 z-50 text-white" : "bg-red-500 z-50 text-white"}`}
      >
        {type === "success" ? (
          <FaCheckCircle className="text-white" />
        ) : (
          <FaTimesCircle className="text-white" />
        )}
        {message}
      </div>
    )
  );
};

export default CustomToast;
