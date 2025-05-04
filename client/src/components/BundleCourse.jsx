import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@/utils/utils";
import AddBundleCourse from "./AddBundleCourse";
import RemoveBundleCourse from "./RemoveBundleCourse";
import ShimmerUI from "@/components/ShimmerUI";
import CustomToast from "@/components/CustomToast"; // Import your custom toast

const BundleCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Toast state
  const [toastMessage, setToastMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (id) fetchBundle();
  }, [id]);

  const fetchBundle = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/bundle/getBundle/${id}`, { withCredentials: true });
      setBundle(res.data.data.bundle);
    } catch (error) {
      setToastMessage({ type: "error", message: "Error fetching bundle." });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      console.error("Error fetching bundle:", error);
    } finally {
      setLoading(false);
    }
  };

  // Example: function to show a success toast (you can use this pattern elsewhere)
  const handleSuccess = (msg) => {
    setToastMessage({ type: "success", message: msg });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (loading) return <ShimmerUI />;

  if (!bundle) return <p className="text-center text-gray-500 mt-10">Bundle not found!</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl border relative">
      {/* Custom Toast */}
      {showToast && toastMessage && (
        <CustomToast
          type={toastMessage.type}
          message={toastMessage.message}
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Title and Back Button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Manage Bundle: {bundle?.bundleName || "Untitled"}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800 transition"
        >
          ← Back
        </button>
      </div>

      {/* Components side by side */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 border rounded-lg p-6 bg-gray-50 shadow-sm">
          <AddBundleCourse
            bundle={bundle}
            refreshBundle={fetchBundle}
            setToastMessage={setToastMessage}
            setShowToast={setShowToast}
          />
        </div>

        <div className="flex-1 border rounded-lg p-6 bg-gray-50 shadow-sm">
          <RemoveBundleCourse
            bundle={bundle}
            refreshBundle={fetchBundle}
            setToastMessage={setToastMessage}
            setShowToast={setShowToast}
          />
        </div>
      </div>
    </div>
  );
};

export default BundleCourse;
