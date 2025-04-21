import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/utils/utils';

const EditCourse = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [showToast, setShowToast] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchCourse(id);
  }, [id]);

  const fetchCourse = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/course/${id}`, {
        withCredentials: true,
      });
      const courseData = res.data.data.course;
      setCourse({
        ...courseData,
        whatYouWillLearn: courseData.whatYouWillLearn || [],
        whoShouldEnroll: courseData.whoShouldEnroll || [],
      });
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCourse((prev) => ({ ...prev, [name]: checked }));
  };

  const handleArrayChange = (name, index, value) => {
    const updatedArray = [...course[name]];
    updatedArray[index] = value;
    setCourse((prev) => ({ ...prev, [name]: updatedArray }));
  };

  const addArrayItem = (name) => {
    setCourse((prev) => ({ ...prev, [name]: [...prev[name], ''] }));
  };

  const removeArrayItem = (name, index) => {
    const updatedArray = [...course[name]];
    updatedArray.splice(index, 1);
    setCourse((prev) => ({ ...prev, [name]: updatedArray }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
   
    
    for (const key in course) {
      if (Array.isArray(course[key])) {
        course[key].forEach((item, index) => {
          formData.append(`${key}[${index}]`, item || '');
        });
      } else if (course[key] instanceof File) {
        formData.append(key, course[key]); // file input
      } else {
        formData.append(key, course[key] ?? '');
      }
    }
  
    // Debug properly
    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ':', pair[1]);
    // }
   if (formData.get("bundle") === "") {
      formData.delete("bundle");
    }
    console.log(formData)
    try {
      await axios.patch(`${BASE_URL}/course/${id}`, formData, {
        withCredentials: true,
        // let axios auto set Content-Type
      });
      
      setToast({ message: 'Course updated successfully!', type: 'success' });
      setShowToast(true);
      setTimeout(() => navigate('/admin/courses'), 2000);
    } catch (error) {
      console.error('Error updating course:', error);
      setToast({ message: 'Error updating course!', type: 'error' });
      setShowToast(true);
    }
  };
  

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Loading course data...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-8">
        <p>No course found with the provided ID.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Course</h1>

      {showToast && (
        <div
          className={`mb-4 p-3 rounded text-white ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {toast.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={course.title || ''}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={course.description || ''}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            rows="4"
          />
        </div>

        {/* Price & Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={course.price || 0}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Duration</label>
            <input
              type="text"
              name="duration"
              value={course.duration || ''}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Files */}
        <div>
          <label className="block mb-2 font-medium">Thumbnail Image</label>
          <input type="file" name="imageFile" accept="image/*" onChange={handleFileChange} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Syllabus PDF</label>
          <input type="file" name="pdfFile" accept="application/pdf" onChange={handleFileChange} />
        </div>
        <div>
          <label className="block mb-2 font-medium">Certificate Image</label>
          <input type="file" name="certificateFile" accept="image/*" onChange={handleFileChange} />
        </div>

        {/* Video Link */}
        <div>
          <label className="block mb-2 font-medium">Course Introduction URL</label>
          <input
            type="text"
            name="courseIntrovideo"
            value={course.courseIntrovideo || ''}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isOffline"
              checked={course.isOffline || false}
              onChange={handleCheckboxChange}
            />
            Is Offline
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isTrending"
              checked={course.isTrending || false}
              onChange={handleCheckboxChange}
            />
            Is Trending
          </label>
        </div>

        {/* What You Will Learn */}
        <div>
          <label className="block text-xl font-semibold mb-2">What You Will Learn</label>
          {course.whatYouWillLearn.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('whatYouWillLearn', index, e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('whatYouWillLearn', index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('whatYouWillLearn')}
            className="bg-blue-500 text-white px-3 py-2 rounded mt-2"
          >
            Add Item
          </button>
        </div>

        {/* Who Should Enroll */}
        <div>
          <label className="block text-xl font-semibold mb-2">Who Should Enroll</label>
          {course.whoShouldEnroll.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('whoShouldEnroll', index, e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={() => removeArrayItem('whoShouldEnroll', index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('whoShouldEnroll')}
            className="bg-blue-500 text-white px-3 py-2 rounded mt-2"
          >
            Add Item
          </button>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
