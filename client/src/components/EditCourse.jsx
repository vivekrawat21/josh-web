import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/utils/utils';
import { useNavigate } from 'react-router-dom';
const EditCourse = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [showToast, setShowToast] = useState(false);
  const { id } = useParams();
  const navigator = useNavigate();
  const fetchCourse = async(id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/course/${id}`, { withCredentials: true });
      console.log(res.data.data.course);
      setCourse(res.data.data.course);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course:", error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if(id) {
      fetchCourse(id);
    }
  }, [id]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCourse(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleArrayChange = (name, index, value) => {
    const newArray = [...course[name]];
    newArray[index] = value;
    setCourse(prev => ({
      ...prev,
      [name]: newArray
    }));
  };

  const addArrayItem = (name) => {
    setCourse(prev => ({
      ...prev,
      [name]: [...prev[name], '']
    }));
  };

  const removeArrayItem = (name, index) => {
    const newArray = [...course[name]];
    newArray.splice(index, 1);
    setCourse(prev => ({
      ...prev,
      [name]: newArray
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${BASE_URL}/course/${id}`, course, { 
        withCredentials: true 
      });
      console.log("Course updated successfully:", res.data);
      setToast({ message: 'Course updated successfully!', type: 'success' });
      setShowToast(true);
      navigator(`/admin/courses`);
      // You might want to add a success message or redirect here
    } catch (error) {
      console.error("Error updating course:", error);
      // Add error handling here
    }
  };
  
  console.log("Current course state:", course);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {loading ? (
        <div className="text-center py-8">
          <div className="spinner"></div>
          <p className="mt-4">Loading course data...</p>
        </div>
      ) : !course ? (
        <div className="text-center py-8">
          <p>No course found with the provided ID.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold p-6 border-b">Edit Course</h1>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={course.title || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={course.description || ''}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={course.price || 0}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={course.duration || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={course.image || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Course Introduction URL</label>
                <input
                  type="text"
                  name="image"
                  value={course.courseIntrovideo || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className='flex items-center mb-4 px-4 gap-4'>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="isOffline"
                  checked={course.isOffline || false}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label className="text-gray-700">Is Offline</label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="isTrending"
                  checked={course.isTrending || false}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label className="text-gray-700">Is Trending</label>
              </div>
              </div>
            </div>
            
            {/* What You Will Learn */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">What You Will Learn</h2>
              
              {course.whatYouWillLearn && course.whatYouWillLearn.map((item, index) => (
                <div key={`learn-${index}`} className="flex mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('whatYouWillLearn', index, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('whatYouWillLearn', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('whatYouWillLearn')}
                className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Item
              </button>
            </div>
            
            {/* Course Highlights */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Course Highlights</h2>
              
              {course.courseHighlights && course.courseHighlights.map((item, index) => (
                <div key={`highlight-${index}`} className="flex mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('courseHighlights', index, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('courseHighlights', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('courseHighlights')}
                className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Item
              </button>
            </div>
            
            {/* Who Should Enroll */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Who Should Enroll</h2>
              
              {course.whoShouldEnroll && course.whoShouldEnroll.map((item, index) => (
                <div key={`enroll-${index}`} className="flex mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('whoShouldEnroll', index, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('whoShouldEnroll', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('whoShouldEnroll')}
                className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Item
              </button>
            </div>
            
            {/* Why Choose JoshGuru */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Why Choose JoshGuru</h2>
              
              {course.reasonWhyJoshGuru && course.reasonWhyJoshGuru.map((item, index) => (
                <div key={`reason-${index}`} className="flex mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('reasonWhyJoshGuru', index, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('reasonWhyJoshGuru', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('reasonWhyJoshGuru')}
                className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Item
              </button>
            </div>
            
            {/* Still Confused */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Still Confused?</h2>
              
              {course.stillConfused && course.stillConfused.map((item, index) => (
                <div key={`confused-${index}`} className="flex mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('stillConfused', index, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('stillConfused', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('stillConfused')}
                className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Item
              </button>
            </div>
            
            {/* Why This Course */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Why This Course</h2>
              
              {course.whyCourse && course.whyCourse.map((item, index) => (
                <div key={`why-${index}`} className="flex mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange('whyCourse', index, e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('whyCourse', index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem('whyCourse')}
                className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Item
              </button>
            </div>
            
            {/* How Will This Help You */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">How Will This Help You</h2>
              
              <div className="mb-4">
                <textarea
                  name="HowWillHelpYou"
                  value={course.HowWillHelpYou || ''}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>
            {/* {showToast && (
              <div className={`toast toast-${toast.type}`}>
                <div className="toast-message">{toast.message}</div>
                <button onClick={() => setShowToast(false)} className="toast-close">X</button>
              </div>
            )} */}
            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
              >
                Update Course
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditCourse;