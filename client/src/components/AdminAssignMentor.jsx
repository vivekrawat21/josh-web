import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/utils';
import { Loader2, ArrowLeft, Search, X, CheckCircle, Book, Award } from 'lucide-react';

const AdminAssignMentor = () => {
  const { mentorId } = useParams();

  const [mentor, setMentor] = useState(null);
  const [mentorLoading, setMentorLoading] = useState(true);
  const [mentorCourses, setMentorCourses] = useState([]);

  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'
  
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [assigning, setAssigning] = useState(false);

  // Fetch mentor details
  const fetchMentor = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/mentors/getMentorById/${mentorId}`, {
        withCredentials: true,
      });
      setMentor(res.data.data.mentor);
      setMentorCourses(res.data.data.mentor.courses || []);
    } catch (error) {
      console.error("Error fetching mentor:", error);
      setMessage("Failed to fetch mentor details");
      setMessageType('error');
    } finally {
      setMentorLoading(false);
    }
  };

  useEffect(() => {
    fetchMentor();
  }, [mentorId]);

  // Fetch all available courses
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/course/getCourses`, {
        withCredentials: true,
      });
      
      const allCourses = res.data.data.courses || [];
      
      // Only update available courses once we have mentor courses
      if (mentorCourses.length > 0) {
        const mentorCourseIds = mentorCourses.map(course => course._id);
        const filteredCourses = allCourses.filter(
          course => !mentorCourseIds.includes(course._id)
        );
        setCourses(filteredCourses);
      } else {
        setCourses(allCourses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setMessage("Failed to fetch courses");
      setMessageType('error');
    } finally {
      setCoursesLoading(false);
    }
  };

  // When mentorCourses changes, re-fetch available courses
  useEffect(() => {
    if (!mentorLoading) {
      fetchCourses();
    }
  }, [mentorCourses, mentorLoading]);

  const filteredCourses = courses.filter((course) =>
    course?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignCourse = async () => {
    if (!selectedCourseId) {
      setMessage("Please select a course to assign");
      setMessageType('error');
      return;
    }
  
    setAssigning(true);
    setMessage('Assigning course, please wait...');
    setMessageType('info');
  
    try {
      const res = await axios.patch(
        `${BASE_URL}/mentors/addcourseToMentor`,
        {
          mentorId,
          courseId: selectedCourseId,
        },
        { withCredentials: true }
      );
      
      // Get the selected course before removing it from available courses
      const selectedCourse = courses.find(course => course._id === selectedCourseId);
      
      // Update the mentor courses list with the newly added course
      setMentorCourses(prevCourses => [...prevCourses, selectedCourse]);
      
      // Remove the assigned course from the available courses list
      setCourses(prevCourses => prevCourses.filter(course => course._id !== selectedCourseId));
      
      setMessage("Course assigned successfully!");
      setMessageType('success');
      setSelectedCourseId('');
    } catch (error) {
      console.error("Error assigning course:", error);
      setMessage("Failed to assign course. Please try again.");
      setMessageType('error');
    } finally {
      setAssigning(false);
  
      // Clear message after some time
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 4000);
    }
  };

  const handleRemoveCourse = async (courseId) => {
    if (!courseId) return;
    
    setAssigning(true);
    setMessage('Removing course assignment, please wait...');
    setMessageType('info');
    
    try {
      const res = await axios.patch(
        `${BASE_URL}/mentors/removeCourse`,
        {
          mentorId,
          courseId,
        },
        { withCredentials: true }
      );
      
      // Find the course being removed
      const removedCourse = mentorCourses.find(course => course._id === courseId);
      
      // Remove the course from mentor's courses
      setMentorCourses(prevCourses => prevCourses.filter(course => course._id !== courseId));
      
      // Add the removed course back to the available courses list
      if (removedCourse) {
        setCourses(prevCourses => [...prevCourses, removedCourse]);
      }
      
      setMessage("Course removed successfully!");
      setMessageType('success');
    } catch (error) {
      console.error("Error removing course:", error);
      setMessage("Failed to remove course. Please try again.");
      setMessageType('error');
    } finally {
      setAssigning(false);
      
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 4000);
    }
  };
  
console.log(mentor)
  if (mentorLoading || coursesLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-gray-800 mb-4" />
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <Link to="/admin/mentors" className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Mentors
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          {mentor?.profileImage && (
            <img 
              src={mentor.profileImage} 
              alt={mentor.name} 
              className="w-20 h-20 rounded-full object-cover shadow-sm" 
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">{mentor?.name}</h1>
            <p className="text-gray-600">{mentor?.position || 'Mentor'}</p>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-md text-sm flex items-center justify-between ${
            messageType === 'success'
              ? 'bg-green-100 text-green-700 border border-green-200'
              : messageType === 'error'
              ? 'bg-red-100 text-red-700 border border-red-200'
              : 'bg-blue-100 text-blue-700 border border-blue-200'
          }`}
        >
          <span>{message}</span>
          <button 
            onClick={() => { setMessage(''); setMessageType(''); }}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Mentor's Assigned Courses Section */}
      <div className="mb-10">
        <div className="flex items-center mb-4">
          <Award className="h-5 w-5 mr-2 text-blue-600" />
          <h2 className="text-xl font-semibold">Assigned Courses</h2>
        </div>
        
        {mentorCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentorCourses.map((course) => (
              <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
                <div className="h-40 overflow-hidden">
                  <img
                    src={course?.image || '/placeholder.jpg'}
                    alt={course?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-bold text-lg mb-1 truncate">{course?.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Duration: {course.duration || 'N/A'}</span>
                    <span>₹{course.price || 'Free'}</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => handleRemoveCourse(course?._id)}
                    className="w-full py-2 px-4 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="h-4 w-4" /> Remove Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
            <Book className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No courses assigned to this mentor yet.</p>
          </div>
        )}
      </div>

      {/* Available Courses Section */}
      <div>
        <div className="flex items-center mb-4">
          <Book className="h-5 w-5 mr-2 text-blue-600" />
          <h2 className="text-xl font-semibold">Available Courses</h2>
        </div>

        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full max-w-md focus:ring-blue-500 focus:border-blue-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <div 
                key={course._id} 
                className={`bg-white rounded-lg shadow-md overflow-hidden border ${
                  selectedCourseId === course._id 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-200'
                } flex flex-col`}
              >
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={course?.image || '/placeholder.jpg'}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {selectedCourseId === course._id && (
                    <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  )}
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-bold text-lg mb-1 truncate">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Duration: {course.duration || 'N/A'}</span>
                    <span>₹{course.price || 'Free'}</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedCourseId(
                      selectedCourseId === course._id ? '' : course._id
                    )}
                    className={`w-full py-2 px-4 rounded transition-colors ${
                      selectedCourseId === course._id
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {selectedCourseId === course._id ? 'Selected' : 'Select Course'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
            <p className="text-gray-500">
              {searchTerm ? 'No courses match your search.' : 'No courses available for assignment.'}
            </p>
          </div>
        )}

        {selectedCourseId && (
          <div className="mt-6 mb-12 flex justify-center">
            <button
              onClick={handleAssignCourse}
              disabled={assigning}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {assigning ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Assigning...</span>
                </>
              ) : (
                <>
                  {assigning ? (
  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
) : (
  <CheckCircle className="h-5 w-5 text-green-500" />
)}
<span>Assign Course to {mentor?.name}</span>

                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAssignMentor;