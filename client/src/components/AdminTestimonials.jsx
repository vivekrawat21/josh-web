import React, { useEffect, useState } from "react";
import { FaStar, FaTrash, FaPlus, FaVideo, FaImage } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import CustomToast from "@/components/CustomToast"; // Make sure this exists

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
  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/studenttestimonials`,{withCredentials: true});
      setTestimonials(res.data?.data?.testimonials || []);
    } catch (e) {
      setToastMessage({ type: "error", message: "Failed to fetch testimonials" });
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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

  // Add new testimonial
  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", form.name);
      data.append("course", form.course);
      data.append("testimonialText", form.testimonialText);
      data.append("rating", form.rating);
      data.append("isVideo", form.isVideo);
      data.append("videoUrl", form.videoUrl);
      if (!form.isVideo && form.image) {
        data.append("imageFile", form.image);
      }

      await axios.post(`${BASE_URL}/studenttestimonials/create`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm(initialForm);
      setImgPreview("");
      setAdding(false);
      setToastMessage({ type: "success", message: "Testimonial added successfully!" });
      setShowToast(true);
      fetchTestimonials();
    } catch (e) {
      setError(e.response?.data?.error || "Failed to add testimonial");
      setToastMessage({ type: "error", message: e.response?.data?.error || "Failed to add testimonial" });
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  // Delete testimonial
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/studenttestimonials/delete/${id}`,
        { withCredentials: true }
      );
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
      setToastMessage({ type: "success", message: "Testimonial deleted successfully!" });
      setShowToast(true);
    } catch (e) {
      setError("Failed to delete testimonial");
      setToastMessage({ type: "error", message: "Failed to delete testimonial" });
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {showToast && (
        <CustomToast
          type={toastMessage.type}
          message={toastMessage.message}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Admin Testimonials</h2>
        <button
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          onClick={() => setAdding((a) => !a)}
        >
          <FaPlus /> Add Testimonial
        </button>
      </div>

      {adding && (
        <form
          className="bg-orange-50 p-6 rounded-lg shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleAdd}
          encType="multipart/form-data"
        >
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Course</label>
            <input
              type="text"
              name="course"
              value={form.course}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Testimonial Text</label>
            <textarea
              name="testimonialText"
              value={form.testimonialText}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Rating</label>
            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>{num} Star</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Video Testimonial?</label>
            <input
              type="checkbox"
              name="isVideo"
              checked={form.isVideo}
              onChange={handleChange}
              className="mr-2"
            />
            <span>{form.isVideo ? "Yes" : "No"}</span>
          </div>
          {form.isVideo ? (
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1">Video URL</label>
              <input
                type="url"
                name="videoUrl"
                value={form.videoUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="w-full border p-2 rounded"
                required
              />
            </div>
          ) : (
            <div className="md:col-span-2">
              <label className="block font-semibold mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {imgPreview && (
                <img
                  src={imgPreview}
                  alt="Preview"
                  className="h-20 rounded mt-2"
                />
              )}
            </div>
          )}
          <div className="md:col-span-2 flex gap-4 mt-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Testimonial"}
            </button>
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => {
                setAdding(false);
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
      {loading && <div>Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-xl shadow border-l-4 border-orange-500 p-4 flex flex-col justify-between relative"
          >
            <button
              className="absolute top-3 right-3 text-red-600 hover:text-red-800"
              onClick={() => handleDelete(t._id)}
              title="Delete"
            >
              <FaTrash />
            </button>
            <div className="flex items-center gap-4 mb-2">
              <img
                src={t.image?.startsWith("http") ? t.image : `${BASE_URL}/${t.image}`}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.course}</p>
              </div>
            </div>
            {t.isVideo ? (
              <div className="my-2">
                <FaVideo className="inline mr-1 text-orange-500" />
                <iframe
                  src={t.videoUrl}
                  title={t.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-40 rounded"
                />
              </div>
            ) : (
              <div className="my-2">
                <FaImage className="inline mr-1 text-orange-500" />
                <p className="italic text-gray-700">"{t.testimonialText || t.description}"</p>
              </div>
            )}
            <div className="flex items-center mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-5 h-5 ${i < t.rating ? "text-orange-500" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
