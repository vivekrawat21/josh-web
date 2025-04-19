import { BASE_URL } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditBundle = () => {
  const { id } = useParams();
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
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchBundleData();
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
      console.error('Error fetching bundle data:', error);
      setError('Failed to load bundle data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setBundle({ ...bundle, [name]: newValue });
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

  const updateData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.put(`${BASE_URL}/bundle/updateBundle/${id}`, bundle, {
        withCredentials: true,
      });
      console.log('Bundle updated:', res.data);
      setSuccessMessage('Bundle updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating bundle:', error);
      setError('Failed to update bundle. Please try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !bundle.bundleName) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Edit Bundle</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}
      
      <form onSubmit={updateData} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="bundleName" className="block text-sm font-medium text-gray-700">
            Bundle Name
          </label>
          <input
            id="bundleName"
            type="text"
            name="bundleName"
            value={bundle.bundleName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter bundle name"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={bundle.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter bundle description"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={bundle.price}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter price"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
              Discount ($)
            </label>
            <input
              id="discount"
              type="number"
              name="discount"
              value={bundle.discount}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter discount amount"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="bundleImage" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            id="bundleImage"
            type="text"
            name="bundleImage"
            value={bundle.bundleImage}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter image URL"
          />
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="hasDiscount"
              checked={bundle.hasDiscount}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">Has Discount</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isSpecial"
              checked={bundle.isSpecial}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700">Special Bundle</span>
          </label>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-700">Bundle Benefits</h3>
            <button
              type="button"
              onClick={addWhyPoint}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
            >
              <span className="text-xl">+</span> Add Benefit
            </button>
          </div>
          
          {bundle.whyBundle.length === 0 && (
            <p className="text-gray-500 italic text-sm">
              No benefits added. Click the button above to add your first benefit.
            </p>
          )}
          
          {bundle.whyBundle.map((point, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={point}
                onChange={(e) => handleWhyChange(index, e.target.value)}
                className="flex-1 border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Benefit #${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeWhyPoint(index)}
                className="p-2 text-red-500 hover:text-red-700 focus:outline-none"
                aria-label="Remove benefit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="pt-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full"></span>
                <span>Updating...</span>
              </>
            ) : (
              'Update Bundle'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBundle;