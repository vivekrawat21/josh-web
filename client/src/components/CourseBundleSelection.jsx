import React, { useEffect } from 'react';

const SelectionBundleCourse = ({
  itemsToShow,
  selectedCourse,
  setSelectedCourse,
  typeParam,
  setStep,
}) => {
  const isSingleItem = itemsToShow.length === 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (typeParam === 'cart') return;
    if (isSingleItem && !selectedCourse) {
      setSelectedCourse(itemsToShow[0]);
    }
  }, [isSingleItem, itemsToShow, selectedCourse, setSelectedCourse, typeParam]);

  const handleContinue = () => setStep(3);
  const handleBackToSelection = () => setStep(1);

  const getTitle = (item) =>
    item?.title || item?.bundleName|| item?.name || 'Untitled';

  const getImage = (item) =>
    item?.bundleImage || item?.image || '/placeholder.png';

  const getId = (item) => item?._id || item?.id || getTitle(item); // fallback ID for specialbundle

  const renderHeading = () => {
    if (typeParam === 'cart') return 'Review Your Cart Items';
    if (isSingleItem) {
      return `Selected ${
        typeParam === 'course'
          ? 'Course'
          : typeParam === 'specialbundle'
          ? 'Special Bundle'
          : 'Bundle'
      }`;
    }
    return `Select a ${
      typeParam === 'course'
        ? 'Course'
        : typeParam === 'specialbundle'
        ? 'Special Bundle'
        : 'Bundle'
    }`;
  };

  return (
    <div className="px-4 sm:px-6">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center">{renderHeading()}</h3>

      {typeParam === 'cart' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {itemsToShow.map((item, idx) => (
            <div
              key={getId(item) + idx}
              className="border p-3 rounded-xl flex flex-col items-center bg-blue-50"
            >
              <img
                src={getImage(item)}
                alt={getTitle(item)}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <span className="font-semibold text-center text-xs sm:text-sm">
                {getTitle(item)}
              </span>
            </div>
          ))}
        </div>
      ) : isSingleItem ? (
        <div className="border p-4 rounded-xl flex flex-col items-center bg-blue-50 mx-auto w-full sm:w-1/3 h-[21vh]">
          <img
            src={getImage(itemsToShow[0])}
            alt={getTitle(itemsToShow[0])}
            className="w-full h-24 object-cover rounded mb-2"
          />
          <span className="font-semibold text-center text-xs sm:text-sm">
            {getTitle(itemsToShow[0])}
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
          {itemsToShow.map((item, idx) => (
            <label
              key={getId(item) + idx}
              className={`border p-4 rounded-xl flex flex-col items-center cursor-pointer transition ${
                getId(selectedCourse) === getId(item)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <img
                src={getImage(item)}
                alt={getTitle(item)}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <span className="font-semibold text-center text-xs sm:text-sm">
                {getTitle(item)}
              </span>
              <input
                type="radio"
                name="course"
                value={getId(item)}
                checked={getId(selectedCourse) === getId(item)}
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
