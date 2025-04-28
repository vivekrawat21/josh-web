import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "@/utils/utils";
import AddBundleCourse from "./AddBundleCourse";
import RemoveBundleCourse from "./RemoveBundleCourse";
import ShimmerUI from "@/components/ShimmerUI";

const BundleCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bundle, setBundle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchBundle();
  }, [id]);

  const fetchBundle = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/bundle/getBundle/${id}`, { withCredentials: true });
      setBundle(res.data.data.bundle);
    } catch (error) {
      console.error("Error fetching bundle:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ShimmerUI />;

  if (!bundle) return <p className="text-center text-gray-500 mt-10">Bundle not found!</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl border">
      {/* Title and Back Button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Manage Bundle: {bundle?.title || "Untitled"}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition"
        >
          ← Back
        </button>
      </div>

      {/* Components side by side */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 border rounded-lg p-6 bg-gray-50 shadow-sm">
          <AddBundleCourse bundle={bundle} refreshBundle={fetchBundle} />
        </div>

        <div className="flex-1 border rounded-lg p-6 bg-gray-50 shadow-sm">
          <RemoveBundleCourse bundle={bundle} refreshBundle={fetchBundle} />
        </div>
      </div>
    </div>
  );
};

export default BundleCourse;
