import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/utils';

const AdminAssignMentor = () => {
  const { mentorId } = useParams();

  const [mentor, setMentor] = useState(null);
  const [mentorLoading, setMentorLoading] = useState(true);

  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'
  
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [assigning, setAssigning] = useState(false);

  // Fetch mentor details
  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/mentors/getMentorById/${mentorId}`, {
          withCredentials: true,
        });
        setMentor(res.data.data.mentor);
      } catch (error) {
        console.error("Error fetching mentor:", error);
      } finally {
        setMentorLoading(false);
      }
    };
    fetchMentor();
  }, [mentorId]);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/course/getCourses`, {
          withCredentials: true,
        });
        setCourses(res.data.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setCoursesLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) =>
    course?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignCourse = async () => {
    if (!selectedCourseId) return;
  
    setAssigning(true);
    setMessage('Assigning course, please wait...');
    setMessageType('info');
  
    try {
      await axios.patch(
        `${BASE_URL}/mentors/assigncourseToMentor`,
        {
          mentorId,
          courseId: selectedCourseId,
        },
        { withCredentials: true }
      );
      setMessage("✅ Course assigned successfully!");
      setMessageType('success');
    } catch (error) {
      console.error("Error assigning course:", error);
      setMessage("❌ Failed to assign course. Please try again.");
      setMessageType('error');
    } finally {
      setAssigning(false);
  
      // Optionally clear message after some time
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 4000);
    }
  };
  

  if (mentorLoading || coursesLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mentor Details</h1>
      <p className="mb-2">
        Courses list of <span className="text-xl font-semibold">{mentor?.name}</span>
      </p>

      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded mb-4 w-full max-w-md"
      />
{message && (
  <div
    className={`mb-4 px-4 py-2 rounded text-sm ${
      messageType === 'success'
        ? 'bg-green-100 text-green-700'
        : messageType === 'error'
        ? 'bg-red-100 text-red-700'
        : 'bg-blue-100 text-blue-700'
    }`}
  >
    {message}
  </div>
)}

{filteredCourses.length > 0 ? (
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300 rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border">Select</th>
          <th className="py-2 px-4 border">Image</th>
          <th className="py-2 px-4 border">Title</th>
          <th className="py-2 px-4 border">Description</th>
          <th className="py-2 px-4 border">Duration</th>
          <th className="py-2 px-4 border">Price</th>
        </tr>
      </thead>
      <tbody>
        {filteredCourses.map((course) => (
          <tr key={course._id} className="border-t">
            <td className="py-2 px-4 border text-center">
              <input
                type="radio"
                name="course"
                value={course._id}
                checked={selectedCourseId === course._id}
                onChange={() => setSelectedCourseId(course._id)}
              />
            </td>
            <td className="py-2 px-4 border text-center">
              <img
                src={course?.image || '/placeholder.jpg'}
                alt={course.title}
                className="w-16 h-16 object-cover rounded"
              />
            </td>
            <td className="py-2 px-4 border">{course.title}</td>
            <td className="py-2 px-4 border">{course.description}</td>
            <td className="py-2 px-4 border">{course.duration}</td>
            <td className="py-2 px-4 border">₹{course.price || 'Free'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <p>No courses found.</p>
)}


      {selectedCourseId && (
        <div className="mt-4">
          <button
            onClick={handleAssignCourse}
            disabled={assigning}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {assigning ? "Assigning..." : "Assign Course to Mentor"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminAssignMentor;
