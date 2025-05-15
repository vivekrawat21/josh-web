import React, { useEffect, useState } from "react";
import { FaStar, FaTrash, FaPlus, FaVideo, FaImage, FaEdit, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import CustomToast from "@/components/CustomToast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Responsive font size utility
const getFontSize = (size) => {
  const sizes = {
    mobile: {
      base: "text-[13px]",
      heading: "text-base",
      subheading: "text-sm",
      input: "text-xs",
      button: "text-xs",
    },
    desktop: {
      base: "text-[16px]",
      heading: "text-2xl",
      subheading: "text-lg",
      input: "text-sm",
      button: "text-sm",
    },
  };
  if (typeof window !== "undefined" && window.innerWidth < 640) return sizes.mobile[size];
  return sizes.desktop[size];
};

// Custom Checkbox for consistent style
const CustomCheckbox = ({ checked, onChange, id }) => (
  <label className="inline-flex items-center cursor-pointer select-none relative">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="appearance-none w-5 h-5 border border-gray-400 rounded-md bg-white checked:bg-black checked:border-black transition-all focus:ring-2 focus:ring-black"
      style={{ verticalAlign: "middle" }}
    />
    <span
      className={`ml-2 ${getFontSize("input")} ${checked ? "font-semibold text-black" : "text-gray-700"}`}
    >
      {checked ? "Yes" : "No"}
    </span>
    {checked && (
      <span className="absolute left-1 top-0.5 text-white text-xs pointer-events-none select-none">
        ✓
      </span>
    )}
  </label>
);

const initialForm = {
  name: "",
  course: "",
  testimonialText: "",
  image: null,
  videoUrl: "",
  isVideo: false,
  rating: 5,
};

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null); // id of testimonial being edited
  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const [allCourses, setAllCourses] = useState([]);

  // Fetch testimonials and courses
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/studenttestimonials`, { withCredentials: true });
      setTestimonials(res.data?.data?.testimonials || []);
    } catch (e) {
      setToastMessage({ type: "error", message: "Failed to fetch testimonials" });
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/course`, { withCredentials: true });
      setAllCourses(res.data.data.courses || []);
    } catch (e) {
      // ignore error
    }
  };

  useEffect(() => {
    fetchTestimonials();
    fetchCourses();
    // Responsive font size recalculation
    const handleResize = () => setForm((f) => ({ ...f }));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Select change for course
  const handleCourseSelect = (value) => {
    setForm((prev) => ({ ...prev, course: value }));
  };

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImgPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Add or update testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("course", form.course);
      data.append("testimonialText", form.testimonialText);
      data.append("rating", form.rating);
      data.append("isVideo", form.isVideo);
      data.append("videoUrl", form.videoUrl);
      if (form.image) {
        data.append("imageFile", form.image);
      }

      if (editing) {
        await axios.patch(
          `${BASE_URL}/studenttestimonials/${editing}`,
          data,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setToastMessage({ type: "success", message: "Testimonial updated successfully!" });
      } else {
        await axios.post(`${BASE_URL}/studenttestimonials/create`, data, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
        setToastMessage({ type: "success", message: "Testimonial added successfully!" });
      }

      setShowToast(true);
      setForm(initialForm);
      setImgPreview("");
      setAdding(false);
      setEditing(null);
      fetchTestimonials();
    } catch (e) {
      setError(e.response?.data?.error || "Failed to save testimonial");
      setToastMessage({ type: "error", message: e.response?.data?.error || "Failed to save testimonial" });
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  // Start editing
  const handleEdit = (t) => {
    setEditing(t._id);
    setAdding(true);
    setForm({
      name: t.name,
      course: t.course,
      testimonialText: t.testimonialText,
      image: null,
      videoUrl: t.videoUrl,
      isVideo: t.isVideo,
      rating: t.rating,
    });
    setImgPreview(t.image?.startsWith("http") ? t.image : `${BASE_URL}/${t.image}`);
  };

  // Delete testimonial
  const handleDelete = async () => {
    setShowDeleteDialog(false);
    if (!toDeleteId) return;
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/studenttestimonials/delete/${toDeleteId}`, { withCredentials: true });
      setTestimonials((prev) => prev.filter((t) => t._id !== toDeleteId));
      setToastMessage({ type: "success", message: "Testimonial deleted successfully!" });
      setShowToast(true);
    } catch (e) {
      setError("Failed to delete testimonial");
      setToastMessage({ type: "error", message: "Failed to delete testimonial" });
      setShowToast(true);
    } finally {
      setLoading(false);
      setToDeleteId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen">
      {showToast && (
        <CustomToast
          type={toastMessage.type}
          message={toastMessage.message}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
        <h2 className={`${getFontSize("heading")} font-bold`}>Admin Testimonials</h2>
        {!adding ? (
          <button
            className={`flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg ${getFontSize("button")} hover:bg-gray-800 transition-all`}
            onClick={() => {
              setAdding(true);
              setEditing(null);
              setForm(initialForm);
              setImgPreview("");
            }}
          >
            <FaPlus size={16} /> Add Testimonial
          </button>
        ) : (
          <button
            className={`flex items-center gap-2 bg-gray-200 text-black px-4 py-2 rounded-lg ${getFontSize("button")} hover:bg-gray-300 transition-all`}
            onClick={() => {
              setAdding(false);
              setEditing(null);
              setForm(initialForm);
              setImgPreview("");
            }}
          >
            <FaArrowLeft size={16} /> Back
          </button>
        )}
      </div>

      {adding && (
        <form
          className="bg-gray-50 p-4 rounded-xl shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <label className={`block font-semibold mb-1 ${getFontSize("input")}`}>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={`w-full border p-3 rounded-lg ${getFontSize("input")}`}
            />
          </div>
          <div>
            <label className={`block font-semibold mb-1 ${getFontSize("input")}`}>Course</label>
            <Select onValueChange={handleCourseSelect} value={form.course}>
              <SelectTrigger className={`w-full ${getFontSize("input")}`}>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {allCourses.map((course) => (
                  <SelectItem key={course._id} value={course.title} className={getFontSize("input")}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <label className={`block font-semibold mb-1 ${getFontSize("input")}`}>Testimonial Text</label>
            <textarea
              name="testimonialText"
              value={form.testimonialText}
              onChange={handleChange}
              required
              className={`w-full border p-3 rounded-lg ${getFontSize("input")}`}
            />
          </div>
          <div>
            <label className={`block font-semibold mb-1 ${getFontSize("input")}`}>Rating</label>
            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              className={`w-full border p-3 rounded-lg ${getFontSize("input")}`}
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>{num} Star</option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block font-semibold mb-1 ${getFontSize("input")}`}>Video Testimonial?</label>
            <CustomCheckbox
              checked={form.isVideo}
              onChange={(e) => setForm((prev) => ({ ...prev, isVideo: e.target.checked }))}
              id="isVideo"
            />
          </div>
          {form.isVideo && (
            <div className="md:col-span-2">
              <label className={`block font-semibold mb-1 ${getFontSize("input")}`}>Video URL</label>
              <input
                type="url"
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className={`w-full border p-3 rounded-lg ${getFontSize("input")}`}
                required
              />
            </div>
          )}
          <div className="md:col-span-2">
            <label className={`block font-semibold mb-1 ${getFontSize("input")}`}>Image (Reviewer Photo)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full ${getFontSize("input")}`}
            />
            {imgPreview && (
              <img
                src={imgPreview}
                alt="Preview"
                className="h-16 rounded mt-2"
              />
            )}
          </div>
          <div className="md:col-span-2 flex gap-3 mt-2">
            <button
              type="submit"
              className={`bg-black text-white rounded-lg px-6 py-2 ${getFontSize("button")} hover:bg-gray-800 disabled:opacity-50 transition-all`}
              disabled={loading}
            >
              {loading ? (editing ? "Updating..." : "Adding...") : (editing ? "Update" : "Add")}
            </button>
            <button
              type="button"
              className={`bg-gray-200 px-6 py-2 rounded-lg ${getFontSize("button")}`}
              onClick={() => {
                setAdding(false);
                setEditing(null);
                setForm(initialForm);
                setImgPreview("");
              }}
            >
              Cancel
            </button>
          </div>
          {error && (
            <div className="md:col-span-2 text-red-600 mt-2">{error}</div>
          )}
        </form>
      )}

      {/* Testimonials Gallery */}
      {loading && <div className={getFontSize("base")}>Loading...</div>}

      {/* Show message if no testimonials */}
      {!loading && testimonials.length === 0 && (
        <div className="text-center text-gray-500 text-lg py-12">
          No testimonials at the moment
        </div>
      )}

      {/* Show testimonials if available */}
      {!loading && testimonials.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className={`bg-white rounded-2xl shadow border-l-4 border-black p-6 flex flex-col justify-between relative ${getFontSize("base")}`}
            >
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  className="text-gray-500 hover:text-black p-2 rounded-full"
                  onClick={() => handleEdit(t)}
                  title="Edit"
                >
                  <FaEdit size={16} />
                </button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="text-red-500 hover:text-red-700 p-2 rounded-full"
                      onClick={() => {
                        setToDeleteId(t._id);
                        setShowDeleteDialog(true);
                      }}
                      title="Delete"
                    >
                      <FaTrash size={16} />
                    </button>
                  </AlertDialogTrigger>
                  {showDeleteDialog && toDeleteId === t._id && (
                    <AlertDialogContent className={getFontSize("input")}>
                      <AlertDialogHeader>
                        <AlertDialogTitle className={getFontSize("subheading")}>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently remove <strong>"{t.name}"</strong>'s testimonial. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => setShowDeleteDialog(false)}
                          className={getFontSize("button")}
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          disabled={loading}
                          className={getFontSize("button")}
                        >
                          {loading ? 'Removing...' : 'Delete'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  )}
                </AlertDialog>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className={`font-semibold ${getFontSize("subheading")}`}>{t.name}</h3>
                  <p className="text-gray-500">{t.course}</p>
                </div>
              </div>
              {t.isVideo ? (
                <div className="my-2">
                  <FaVideo className="inline mr-1 text-black" />
                  <iframe
                    src={t.videoUrl}
                    title={t.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-32 rounded-lg"
                  />
                </div>
              ) : (
                <div className="my-2">
                  <FaImage className="inline mr-1 text-black" />
                  <div className="bg-gray-100 rounded-lg p-3 mt-2">
                    <p className={`italic text-gray-700 ${getFontSize("base")}`}>{t.testimonialText || t.description}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-5 h-5 ${i < t.rating ? "text-black" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
