import React, { useEffect, useState } from "react";
import { FaStar, FaTrash, FaPlus, FaVideo, FaImage, FaArrowLeft, FaEdit } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "@/utils/utils";
import CustomToast from "@/components/CustomToast";
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

const initialForm = {
  name: "",
  location: "",
  video: "",
  thumbnail: null,
  designation: "",
  studentsImpacted: "",
  teachersUsing: "",
  improvementMetric: "",
  quote: "",
  rating: 5,
  representative: "",
  representativeImage: null,
};

const AdminInstitutionalTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState("");
  const [thumbPreview, setThumbPreview] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/testimonials`, { withCredentials: true });
      setTestimonials(res.data?.data?.testimonials || res.data?.testimonials || []);
    } catch (err) {
      setToastMessage({ type: "error", message: "Failed to fetch testimonials" });
      setShowToast(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
    // Responsive handling (optional)
    const handleResize = () => setForm((f) => ({ ...f }));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file/image changes and previews
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;
    setForm((prev) => ({ ...prev, [name]: files[0] }));
    const reader = new FileReader();
    reader.onloadend = () => {
      if (name === "representativeImage") setImgPreview(reader.result);
      if (name === "thumbnail") setThumbPreview(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  // Add or update testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (editingId) {
        await axios.patch(`${BASE_URL}/testimonials/${editingId}`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
        setToastMessage({ type: "success", message: "Testimonial updated successfully!" });
      } else {
        await axios.post(`${BASE_URL}/testimonials`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
        setToastMessage({ type: "success", message: "Testimonial added successfully!" });
      }
      setShowToast(true);
      setForm(initialForm);
      setImgPreview("");
      setThumbPreview("");
      setAdding(false);
      setEditingId(null);
      fetchTestimonials();
    } catch (err) {
      setToastMessage({ type: "error", message: "Failed to save testimonial" });
      setShowToast(true);
    }
    setLoading(false);
  };

  // Edit testimonial: prefill form and previews
  const handleEdit = (testimonial) => {
    setAdding(true);
    setEditingId(testimonial._id);
    setForm({
      name: testimonial.name || "",
      location: testimonial.location || "",
      video: testimonial.video || "",
      thumbnail: null,
      designation: testimonial.designation || "",
      studentsImpacted: testimonial.studentsImpacted || "",
      teachersUsing: testimonial.teachersUsing || "",
      improvementMetric: testimonial.improvementMetric || "",
      quote: testimonial.quote || "",
      rating: testimonial.rating || 5,
      representative: testimonial.representative || "",
      representativeImage: null,
    });
    setThumbPreview(testimonial.thumbnail ? `${BASE_URL}${testimonial.thumbnail}` : "");
    setImgPreview(testimonial.representativeImage ? `${BASE_URL}${testimonial.representativeImage}` : "");
  };

  // Delete testimonial
  const handleDelete = async () => {
    setShowDeleteDialog(false);
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/testimonials/${toDeleteId}`, { withCredentials: true });
      setToastMessage({ type: "success", message: "Testimonial deleted successfully!" });
      setShowToast(true);
      fetchTestimonials();
    } catch (err) {
      setToastMessage({ type: "error", message: "Failed to delete testimonial" });
      setShowToast(true);
    }
    setLoading(false);
    setToDeleteId(null);
  };

  // Compact Card UI for testimonials (fits 2-4 per row, mobile friendly)
  const TestimonialCard = ({ t }) => (
    <div className="bg-white rounded-xl shadow border p-2 flex flex-col items-center text-[10px] min-w-0 relative group">
      <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
        <button
          className="text-orange-500 hover:text-orange-700 p-1 rounded-full"
          onClick={() => handleEdit(t)}
          title="Edit"
        >
          <FaEdit size={12} />
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="text-red-500 hover:text-red-700 p-1 rounded-full"
              onClick={() => {
                setToDeleteId(t._id);
                setShowDeleteDialog(true);
              }}
              title="Delete"
            >
              <FaTrash size={12} />
            </button>
          </AlertDialogTrigger>
          {showDeleteDialog && toDeleteId === t._id && (
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove <strong>"{t.name}"</strong>'s testimonial. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={loading}>
                  {loading ? "Removing..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          )}
        </AlertDialog>
      </div>
      <img
        src={
          t.representativeImage
            ? t.representativeImage.startsWith("http")
              ? t.representativeImage
              : `${BASE_URL}${t.representativeImage}`
            : "/placeholder.svg"
        }
        alt={t.representative}
        className="w-7 h-7 rounded-full object-cover border mb-1"
      />
      <div className="w-full aspect-video rounded mb-1 overflow-hidden bg-gray-100">
        {t.thumbnail && (
          <img
            src={typeof t.thumbnail === "string" ? t.thumbnail : URL.createObjectURL(t.thumbnail)}
            alt="thumbnail"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="font-bold truncate w-full">{t.representative}</div>
      <div className="text-gray-500 truncate w-full">{t.designation}</div>
      <div className="text-gray-400 truncate w-full">{t.location}</div>
      <div className="italic text-gray-700 text-[9px] line-clamp-2 w-full">{t.quote}</div>
      <div className="flex justify-between w-full mt-1 text-[9px]">
        <span>🎓 {t.studentsImpacted}</span>
        <span>👩‍🏫 {t.teachersUsing}</span>
      </div>
      <div className="w-full mt-1 text-[9px] text-orange-600 font-semibold truncate">{t.improvementMetric}</div>
      <div className="flex items-center mt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar
            key={i}
            className={`w-3 h-3 ${i < (t.rating || 0) ? "text-black" : "text-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-2 bg-white min-h-screen">
      {showToast && (
        <CustomToast
          type={toastMessage.type}
          message={toastMessage.message}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
        <h2 className="text-base font-bold">Admin Institutional Testimonials</h2>
        {!adding ? (
          <button
            className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded text-xs hover:bg-gray-800 transition-all"
            onClick={() => {
              setAdding(true);
              setForm(initialForm);
              setImgPreview("");
              setThumbPreview("");
              setEditingId(null);
            }}
          >
            <FaPlus size={12} /> Add Testimonial
          </button>
        ) : (
          <button
            className="flex items-center gap-1 bg-gray-200 text-black px-3 py-1 rounded text-xs hover:bg-gray-300 transition-all"
            onClick={() => {
              setAdding(false);
              setForm(initialForm);
              setImgPreview("");
              setThumbPreview("");
              setEditingId(null);
            }}
          >
            <FaArrowLeft size={12} /> Back
          </button>
        )}
      </div>

      {adding && (
        <form
          className="bg-gray-50 p-2 rounded shadow mb-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <label className="block font-semibold mb-1">Name of Institute</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded text-xs"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded text-xs"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Designation</label>
            <input
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded text-xs"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Representative</label>
            <input
              type="text"
              name="representative"
              value={form.representative}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded text-xs"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Representative Image</label>
            <input
              type="file"
              name="representativeImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-xs"
            />
            {imgPreview && (
              <img src={imgPreview} alt="Preview" className="h-8 rounded mt-1" />
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">Video URL</label>
            <input
              type="url"
              name="video"
              value={form.video}
              onChange={handleInputChange}
              className="w-full border p-2 rounded text-xs"
              placeholder="https://youtube.com/..."
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-xs"
            />
            {thumbPreview && (
              <img src={thumbPreview} alt="Thumbnail Preview" className="h-8 rounded mt-1" />
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Quote</label>
            <textarea
              name="quote"
              value={form.quote}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded text-xs"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Students Impacted</label>
            <input
              type="number"
              name="studentsImpacted"
              value={form.studentsImpacted}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded text-xs"
              min={0}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Teachers Using</label>
            <input
              type="number"
              name="teachersUsing"
              value={form.teachersUsing}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded text-xs"
              min={0}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Improvement Metric</label>
            <input
              type="text"
              name="improvementMetric"
              value={form.improvementMetric}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded text-xs"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Rating</label>
            <select
              name="rating"
              value={form.rating}
              onChange={handleInputChange}
              className="w-full border p-2 rounded text-xs"
              required
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>{num} Star</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex gap-2 mt-2">
            <button
              type="submit"
              className="bg-black text-white rounded px-4 py-1 text-xs hover:bg-gray-800 disabled:opacity-50 transition-all"
              disabled={loading}
            >
              {loading ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update" : "Add")}
            </button>
            <button
              type="button"
              className="bg-gray-200 px-4 py-1 rounded text-xs"
              onClick={() => {
                setAdding(false);
                setForm(initialForm);
                setImgPreview("");
                setThumbPreview("");
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Compact Testimonials Gallery */}
      {loading && <div className="text-xs">Loading...</div>}
      {!loading && testimonials.length === 0 && (
        <div className="text-center text-gray-500 text-xs py-8">
          No testimonials at the moment
        </div>
      )}
      {!loading && testimonials.length > 0 && (
        <div className="
          grid 
          grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          gap-2
        ">
          {testimonials.map((t) => (
            <TestimonialCard key={t._id} t={t} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInstitutionalTestimonial;
