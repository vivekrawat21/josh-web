import { FaPlus, FaMinus } from "react-icons/fa";

const AccordionItem = ({ title, child, isOpen, onClick }) => {
  return (
    <div className="border-b py-3">
      <button
        className="flex justify-between w-full text-left font-medium text-gray-900 hover:text-orange-600 text-lg"
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
           {title}
        </div>
        <span>{isOpen ? <FaMinus /> : <FaPlus />}</span>
      </button>
      {isOpen && <div className="mt-2 text-gray-700 text-base">{child}</div>}
    </div>
  );
};

export default AccordionItem;
