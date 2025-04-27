import React, { useEffect } from 'react';

const SelectionBundleCourse = ({
  itemsToShow,
  selectedCourse,
  setSelectedCourse,
  typeParam,
  setStep,
}) => {
  const isSingleItem = itemsToShow.length === 1;

  // Scroll to top when the page is loaded
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (typeParam === 'cart') return; // no need to set selectedCourse for cart
    if (isSingleItem && !selectedCourse) {
      setSelectedCourse(itemsToShow[0]);
    }
  }, [isSingleItem, itemsToShow, selectedCourse, setSelectedCourse, typeParam]);

  const handleContinue = () => {
    setStep(3);
  };

  const handleBackToSelection = () => {
    setStep(1);
  };

  return (
    <div className="px-4 sm:px-6">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">
        {typeParam === 'cart'
          ? 'Review Your Cart Items'
          : isSingleItem
          ? `Selected ${typeParam === 'course' ? 'Course' : 'Bundle'}`
          : `Select a ${typeParam === 'course' ? 'Course' : 'Bundle'}`}
      </h3>

      {typeParam === 'cart' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {itemsToShow.map((item) => (
            <div
              key={item._id}
              className="border p-3 rounded-xl flex flex-col items-center bg-blue-50"
            >
              <img
                src={item?.image || item?.bundleImage}
                alt={item?.title || item?.bundleName}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <span className="font-semibold text-center text-xs sm:text-sm">
                {item?.title || item?.bundleName}
              </span>
            </div>
          ))}
        </div>
      ) : isSingleItem ? (
        <div className="border p-4 rounded-xl flex flex-col items-center bg-blue-50 mx-auto w-full sm:w-1/3 h-[21vh]">
          <img
            src={itemsToShow[0]?.bundleImage || itemsToShow[0]?.image}
            alt={itemsToShow[0]?.bundleName || itemsToShow[0]?.title}
            className="w-full h-24 object-cover rounded mb-2"
          />
          <span className="font-semibold text-center text-xs sm:text-sm">
            {itemsToShow[0]?.bundleName || itemsToShow[0]?.title}
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {itemsToShow.map((item) => (
            <label
              key={item._id}
              className={`border p-4 rounded-xl flex flex-col items-center cursor-pointer transition ${
                selectedCourse?._id === item._id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <img
                src={item?.bundleImage || item?.image}
                alt={item?.bundleName || item?.title}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <span className="font-semibold text-center text-xs sm:text-sm">
                {item?.bundleName || item?.title}
              </span>
              <input
                type="radio"
                name="course"
                value={item._id}
                checked={selectedCourse?._id === item._id}
                onChange={() => setSelectedCourse(item)}
                className="mt-2"
              />
            </label>
          ))}
        </div>
      )}

      <button
        className="mt-6 w-full bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition"
        onClick={handleContinue}
        disabled={typeParam !== 'cart' && !selectedCourse}
      >
        Continue
      </button>

      <button
        className="mt-3 w-full text-xs sm:text-sm text-gray-600 hover:text-gray-800 underline"
        onClick={handleBackToSelection}
      >
        ← Back to Info
      </button>
    </div>
  );
};

export default SelectionBundleCourse;
