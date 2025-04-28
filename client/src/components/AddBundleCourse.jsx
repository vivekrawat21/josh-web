import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/utils";
import CustomToast from "@/components/CustomToast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddBundleCourse = ({ bundle, refreshBundle }) => {
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', open: false });

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/course`, { withCredentials: true });
      setAllCourses(res.data.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const availableCourses = allCourses.filter(
    (course) => !bundle.courses.some((c) => c._id === course._id)
  );

  const handleSelectCourse = (courseId) => {
    if (!selectedCourses.includes(courseId)) {
      setSelectedCourses((prev) => [...prev, courseId]);
    }
  };

  const removeSelectedCourse = (courseId) => {
    setSelectedCourses((prev) => prev.filter((id) => id !== courseId));
  };

  const addCoursesToBundle = async () => {
    if (selectedCourses.length === 0) {
      setToast({ message: 'Please select at least one course.', type: 'error', open: true });
      return;
    }
    setSubmitting(true);
    try {
      await axios.patch(
        `${BASE_URL}/bundle/add-courses`,
        { bundleId: bundle._id, courses: selectedCourses },
        { withCredentials: true }
      );
      setToast({ message: 'Courses added successfully!', type: 'success', open: true });
      setSelectedCourses([]);
      await refreshBundle();
    } catch (error) {
      console.error('Error adding courses:', error);
      setToast({ message: 'Failed to add courses.', type: 'error', open: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="text-sm">
      <h2 className="text-xl font-semibold mb-4">Add Courses</h2>

      {availableCourses.length > 0 ? (
        <>
          <Select onValueChange={handleSelectCourse}>
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              {availableCourses.map((course) => (
                <SelectItem key={course._id} value={course._id} className="text-sm">
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex flex-wrap gap-2 mt-4">
            {selectedCourses.map((id) => (
              <div
                key={id}
                className="flex items-center bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs"
              >
                {allCourses.find((c) => c._id === id)?.title || id}
                <button
                  onClick={() => removeSelectedCourse(id)}
                  className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none text-lg"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">No available courses to add.</p>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={addCoursesToBundle}
          disabled={submitting}
          className="bg-black text-white rounded-md px-5 py-2 text-xs hover:bg-gray-800 disabled:opacity-50 transition-all"
        >
          {submitting ? "Adding..." : "Add Selected Courses"}
        </button>
      </div>

      {toast.open && (
        <CustomToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: '', open: false })}
        />
      )}
    </div>
  );
};

export default AddBundleCourse;
