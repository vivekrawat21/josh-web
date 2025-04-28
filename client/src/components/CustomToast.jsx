import { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import icons

const CustomToast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto close after 3 sec
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-md flex items-center gap-2
      ${type === "success" ? "bg-green-600 z-50 text-white" : "bg-red-500 text-white z-"}`}>
      {type === "success" ? (
        <FaCheckCircle className="text-white" />
      ) : (
        <FaTimesCircle className="text-white" />
      )}
      {message}
    </div>
  );
};

export default CustomToast;
