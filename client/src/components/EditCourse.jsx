import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/utils/utils';
import { Trash2 } from 'lucide-react';
import CustomToast from '@/components/CustomToast'; // Import your custom toast

const EditCourse = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Toast state
  const [toastMessage, setToastMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);

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
        whyCourse: courseData.whyCourse || [],
        stillConfused: courseData.stillConfused || [],
        reasonWhyJoshGuru: courseData.reasonWhyJoshGuru || [],
        courseHighlights: courseData.courseHighlights || [],
      });
      setVideos(courseData.videos || []);
    } catch (error) {
      setToastMessage({ type: 'error', message: 'Error fetching course data' });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
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
    if (files.length > 0) {
      setCourse((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  // Video management functions
  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...videos];
    updatedVideos[index] = { ...updatedVideos[index], [field]: value };
    setVideos(updatedVideos);
  };

  const addVideo = () => {
    setVideos([...videos, { title: '', url: '', isPreview: false }]);
  };

  const removeVideo = (index) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1);
    setVideos(updatedVideos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Add all regular fields
    for (const key in course) {
      if (
        key !== 'imageFile' &&
        key !== 'pdfFile' &&
        key !== 'certificateFile' &&
        !Array.isArray(course[key]) &&
        !(course[key] instanceof File) &&
        key !== 'videos' &&
        course[key] !== null &&
        course[key] !== undefined
      ) {
        formData.append(key, course[key]);
      }
    }

    // Handle array fields - convert to JSON strings
    ['whatYouWillLearn', 'whoShouldEnroll', 'whyCourse', 'stillConfused',
      'reasonWhyJoshGuru', 'courseHighlights'].forEach(arrayField => {
      if (course[arrayField] && Array.isArray(course[arrayField])) {
        formData.append(arrayField, JSON.stringify(course[arrayField]));
      }
    });

    // Handle videos as JSON string
    formData.append('videos', JSON.stringify(videos));

    // Handle file uploads
    if (course.imageFile instanceof File) {
      formData.append('imageFile', course.imageFile);
    }
    if (course.pdfFile instanceof File) {
      formData.append('pdfFile', course.pdfFile);
    }
    if (course.certificateFile instanceof File) {
      formData.append('certificateFile', course.certificateFile);
    }

    // Remove empty bundle to prevent errors
    if (formData.get("bundle") === "") {
      formData.delete("bundle");
    }

    try {
      let courseId = id;
      await axios.patch(`${BASE_URL}/course/${courseId}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      setToastMessage({ type: 'success', message: 'Course updated successfully!' });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setTimeout(() => navigate('/admin/courses'), 2000);
    } catch (error) {
      setToastMessage({
        type: 'error',
        message: error.response?.data?.message || 'Error updating course!'
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
    <div className="max-w-3xl mx-auto p-5 bg-white shadow-md rounded-lg text-sm relative">
      {/* Toast Message */}
      {showToast && toastMessage && (
        <CustomToast
          type={toastMessage.type}
          message={toastMessage.message}
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Top right cancel button */}
      <button
        type="button"
        onClick={() => window.history.back()}
        className="absolute top-5 right-5 bg-black text-white px-4 py-1.5 rounded hover:bg-gray-800 text-sm"
      >
        Cancel
      </button>

      <h1 className="text-2xl font-semibold mb-5 text-gray-800 border-b pb-2">Edit Course</h1>

      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-1 text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={course.title || ''}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1 text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={course.description || ''}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            rows="3"
            required
          />
        </div>

        {/* Price & Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={course.price || 0}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">Duration</label>
            <input
              type="text"
              name="duration"
              value={course.duration || ''}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Files */}
        <div>
          <label className="block text-gray-700 mb-1 text-sm font-medium">Thumbnail Image</label>
          {course.image && (
            <div className="mb-2">
              <img src={course.image} alt="Current thumbnail" className="w-24 h-24 object-cover rounded-md mb-2" />
              <p className="text-xs text-gray-500">Current image</p>
            </div>
          )}
          <input type="file" name="imageFile" accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 text-sm font-medium">Syllabus PDF</label>
          {course.pdfPath && (
            <div className="mb-2">
              <p className="text-xs text-gray-500">
                Current PDF: <a href={course.pdfPath} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View PDF</a>
              </p>
            </div>
          )}
          <input type="file" name="pdfFile" accept="application/pdf"
            onChange={handleFileChange}
            className="w-full border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 text-sm font-medium">Certificate Image</label>
          {course.certificatePath && (
            <div className="mb-2">
              <img src={course.certificatePath} alt="Current certificate" className="w-24 h-24 object-cover rounded-md mb-2" />
              <p className="text-xs text-gray-500">Current certificate</p>
            </div>
          )}
          <input type="file" name="certificateFile" accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Video Link */}
        <div>
          <label className="block text-gray-700 mb-1 text-sm font-medium">Course Introduction URL</label>
          <input
            type="text"
            name="courseIntrovideo"
            value={course.courseIntrovideo || ''}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Videos Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-700 font-medium">Course Videos</label>
            <button
              type="button"
              onClick={addVideo}
              className="text-sm px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
            >
              + Add Video
            </button>
          </div>
          {videos.length === 0 && (
            <p className="text-gray-500 italic text-xs">No videos added yet.</p>
          )}
          {videos.map((video, index) => (
            <div key={index} className="border border-gray-200 p-3 mb-3 rounded">
              <div className="mb-2">
                <label className="block text-gray-700 mb-1 text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={video.title || ''}
                  onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Video title"
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 mb-1 text-sm font-medium">URL</label>
                <input
                  type="text"
                  value={video.url || ''}
                  onChange={(e) => handleVideoChange(index, 'url', e.target.value)}
                  className="w-full border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Video URL"
                />
              </div>
              <div className="mb-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={video.isPreview || false}
                  onChange={(e) => handleVideoChange(index, 'isPreview', e.target.checked)}
                  className="h-4 w-4 rounded"
                />
                <label className="text-gray-700 text-sm">Preview (Free to access)</label>
              </div>
              <button
                type="button"
                onClick={() => removeVideo(index)}
                className="text-red-500 hover:text-red-700 p-1 text-sm"
                aria-label="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Checkboxes */}
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-gray-700 text-sm">
            <input
              type="checkbox"
              name="isOffline"
              checked={course.isOffline || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded"
            />
            Is Offline
          </label>
          <label className="flex items-center gap-2 text-gray-700 text-sm">
            <input
              type="checkbox"
              name="isTrending"
              checked={course.isTrending || false}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded"
            />
            Is Trending
          </label>
        </div>

        {/* What You Will Learn */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-gray-700 font-medium">What You Will Learn</label>
            <button
              type="button"
              onClick={() => addArrayItem('whatYouWillLearn')}
              className="text-sm px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
            >
              + Add Item
            </button>
          </div>
          {course.whatYouWillLearn.length === 0 && (
            <p className="text-gray-500 italic text-xs">No items added yet.</p>
          )}
          {course.whatYouWillLearn.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('whatYouWillLearn', index, e.target.value)}
                className="flex-1 border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={`Item #${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeArrayItem('whatYouWillLearn', index)}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Who Should Enroll */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-gray-700 font-medium">Who Should Enroll</label>
            <button
              type="button"
              onClick={() => addArrayItem('whoShouldEnroll')}
              className="text-sm px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
            >
              + Add Item
            </button>
          </div>
          {course.whoShouldEnroll.length === 0 && (
            <p className="text-gray-500 italic text-xs">No items added yet.</p>
          )}
          {course.whoShouldEnroll.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('whoShouldEnroll', index, e.target.value)}
                className="flex-1 border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={`Item #${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeArrayItem('whoShouldEnroll', index)}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Remove"
              >
             <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Still Confused */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-gray-700 font-medium">Still Confused?</label>
            <button
              type="button"
              onClick={() => addArrayItem('stillConfused')}
              className="text-sm px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
            >
              + Add Item
            </button>
          </div>
          {course.stillConfused.length === 0 && (
            <p className="text-gray-500 italic text-xs">No items added yet.</p>
          )}
          {course.stillConfused.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('stillConfused', index, e.target.value)}
                className="flex-1 border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={`Item #${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeArrayItem('stillConfused', index)}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Remove"
              >
                   <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Reason Why */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-gray-700 font-medium">Reason Why</label>
            <button
              type="button"
              onClick={() => addArrayItem('reasonWhyJoshGuru')}
              className="text-sm px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
            >
              + Add Item
            </button>
          </div>
          {course.reasonWhyJoshGuru.length === 0 && (
            <p className="text-gray-500 italic text-xs">No items added yet.</p>
          )}
          {course.reasonWhyJoshGuru.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleArrayChange('reasonWhyJoshGuru', index, e.target.value)}
                className="flex-1 border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={`Item #${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeArrayItem('reasonWhyJoshGuru', index)}
                className="text-red-500 hover:text-red-700 p-1"
                aria-label="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="text-sm px-4 py-1.5 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="text-sm px-4 py-1.5 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
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

export default EditCourse;
