import { BASE_URL } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomToast from '@/components/CustomToast';

const EditBundle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bundle, setBundle] = useState({
    bundleName: '',
    description: '',
    price: '',
    discount: '',
    bundleImage: '',
    hasDiscount: false,
    isSpecial: false,
    whyBundle: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchBundleData();
    // eslint-disable-next-line
  }, [id]);

  const fetchBundleData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/bundle/getBundle/${id}`, {
        withCredentials: true,
      });
      const data = res.data.data.bundle;
      setBundle({
        bundleName: data.bundleName || '',
        description: data.description || '',
        price: data.price || '',
        discount: data.discount || '',
        bundleImage: data.bundleImage || '',
        hasDiscount: data.hasDiscount || false,
        isSpecial: data.isSpecial || false,
        whyBundle: data.whyBundle || []
      });
      setError(null);
    } catch (error) {
      setError('Failed to load bundle data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBundle({ ...bundle, [name]: type === 'checkbox' ? checked : value });
  };

  const handleWhyChange = (index, value) => {
    const updatedWhy = [...bundle.whyBundle];
    updatedWhy[index] = value;
    setBundle({ ...bundle, whyBundle: updatedWhy });
  };

  const addWhyPoint = () => {
    setBundle({ ...bundle, whyBundle: [...bundle.whyBundle, ''] });
  };

  const removeWhyPoint = (index) => {
    const updatedWhy = [...bundle.whyBundle];
    updatedWhy.splice(index, 1);
    setBundle({ ...bundle, whyBundle: updatedWhy });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBundle({ ...bundle, bundleImage: file });
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('bundleName', bundle.bundleName);
      formData.append('description', bundle.description);
      formData.append('price', bundle.price);
      formData.append('discount', bundle.discount);
      formData.append('hasDiscount', bundle.hasDiscount);
      formData.append('isSpecial', bundle.isSpecial);
      formData.append('whyBundle', JSON.stringify(bundle.whyBundle));
      if (bundle.bundleImage instanceof File) {
        formData.append('bundleImage', bundle.bundleImage);
      }

      await axios.patch(`${BASE_URL}/bundle/${id}`, formData, {
        withCredentials: true,
      });

      setToastMessage({ type: 'success', message: 'Bundle updated successfully!' });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate(-1, { state: { refresh: true } });
      }, 1500);
    } catch (error) {
      setError('Failed to update bundle. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !bundle.bundleName) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-3xl mx-auto bg-white shadow-md rounded-lg text-sm relative">
      {/* Toast */}
      {showToast && (
        <CustomToast
          type={toastMessage.type}
          message={toastMessage.message}
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Top right back button */}
      <button
        type="button"
        onClick={() => window.history.back()}
        className="absolute top-5 right-5 bg-black text-white px-4 py-1.5 rounded hover:bg-gray-800 text-sm"
      >
        Back
      </button>

      <h2 className="text-2xl font-semibold mb-5 text-gray-800 border-b pb-2">Edit Bundle</h2>

      {error && (
        <div className="mb-3 p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={updateData} className="space-y-5">
        <div>
          <label htmlFor="bundleName" className="block text-gray-700 mb-1 text-sm font-medium">
            Bundle Name
          </label>
          <input
            id="bundleName"
            name="bundleName"
            value={bundle.bundleName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            placeholder="Enter bundle name"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 mb-1 text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={bundle.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            placeholder="Enter description"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-gray-700 mb-1 text-sm font-medium">
              Price (₹)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={bundle.price}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              min="0"
              required
            />
          </div>
          <div>
            <label htmlFor="discount" className="block text-gray-800 mb-1 text-sm font-medium">
              Discount (%)
            </label>
            <input
              id="discount"
              name="discount"
              type="number"
              value={bundle.discount}
              onChange={handleChange}
              className="w-full border border-gray-400 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900"
              min="0"
              max="100"
              step="1"
              placeholder="e.g. 10"
            />
          </div>
        </div>

        <div>
          <label htmlFor="bundleImage" className="block text-gray-700 mb-1 text-sm font-medium">
            Image
          </label>
          {bundle.bundleImage && typeof bundle.bundleImage === 'string' && (
            <img src={bundle.bundleImage} alt="Preview" className="w-24 h-24 object-cover rounded-md mb-2" />
          )}
          {bundle.bundleImage && typeof bundle.bundleImage !== 'string' && (
            <img src={URL.createObjectURL(bundle.bundleImage)} alt="Preview" className="w-24 h-24 object-cover rounded-md mb-2" />
          )}
          <input
            id="bundleImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-gray-700 text-sm">
            <input
              type="checkbox"
              name="hasDiscount"
              checked={bundle.hasDiscount}
              onChange={handleChange}
              className="h-4 w-4 rounded"
            />
            Has Discount
          </label>
          <label className="flex items-center gap-2 text-gray-700 text-sm">
            <input
              type="checkbox"
              name="isSpecial"
              checked={bundle.isSpecial}
              onChange={handleChange}
              className="h-4 w-4 rounded"
            />
            Special Bundle
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-gray-800 font-medium text-sm">Bundle Benefits</h3>
            <button
              type="button"
              onClick={addWhyPoint}
              className="text-xs px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
            >
              + Add Benefit
            </button>
          </div>
          {bundle.whyBundle.length === 0 && (
            <p className="text-gray-500 italic text-xs">No benefits added yet.</p>
          )}
          {bundle.whyBundle.map((point, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={point}
                onChange={(e) => handleWhyChange(index, e.target.value)}
                className="flex-1 border border-gray-400 px-3 py-1 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-900"
                placeholder={`Benefit #${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeWhyPoint(index)}
                className="text-red-600 hover:text-red-800 text-lg px-2"
                aria-label="Remove"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <div className="pt-4 flex justify-between">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="text-sm px-4 py-1.5 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="text-sm px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <div className="animate-spin h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></div>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBundle;
