import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/utils';
import { FaTrash } from "react-icons/fa";
import CustomToast from '@/components/CustomToast';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const RemoveBundleCourse = ({ bundle, refreshBundle }) => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', type: '' });
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleRemoveCourse = async (courseId, courseTitle) => {
    try {
      setLoading(true);
      await axios.patch(
        `${BASE_URL}/bundle/remove-course`,
        { bundleId: bundle._id, courseId },
        { withCredentials: true }
      );
      setToast({ open: true, message: `Removed "${courseTitle}" successfully!`, type: 'success' });
      await refreshBundle();
    } catch (error) {
      console.error('Error removing course:', error);
      setToast({ open: true, message: 'Failed to remove course.', type: 'error' });
    } finally {
      setLoading(false);
      setSelectedCourse(null);
    }
  };

  return (
    <div className="text-sm">
      <h2 className="text-xl font-semibold mb-4">Remove Courses</h2>

      <div className="space-y-3">
        {bundle.courses.length > 0 ? (
          bundle.courses.map((course) => (
            <div
              key={course._id}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-md"
            >
              <span className="text-gray-700 text-sm">{course.title}</span>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-md text-sm"
                  >
                    <FaTrash size={14} />
                  </button>
                </AlertDialogTrigger>

                {selectedCourse?._id === course._id && (
                  <AlertDialogContent className="text-sm">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-base">Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove <strong>"{course.title}"</strong> from the bundle. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => setSelectedCourse(null)}
                        className="text-sm"
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleRemoveCourse(course._id, course.title)}
                        disabled={loading}
                        className="text-sm"
                      >
                        {loading ? 'Removing...' : 'Continue'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                )}
              </AlertDialog>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No courses in this bundle.</p>
        )}
      </div>

      {toast.open && (
        <CustomToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ open: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default RemoveBundleCourse;
