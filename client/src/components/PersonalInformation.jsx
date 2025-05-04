import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "@/utils/utils";
import CustomToast from "@/components/CustomToast"; // Adjust path as needed
// import { setUser, logoutUser } from "@/store/userSlice"; // Uncomment and adjust if you want to update Redux

function getInitials(name = "") {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0][0]?.toUpperCase() || "";
  }
  return (
    (words[0][0] || "") +
    (words[words.length - 1][0] || "")
  ).toUpperCase();
}

const PersonalInformation = () => {
  const user = useSelector((state) => state?.user);
  // const dispatch = useDispatch(); // Uncomment if you want to update Redux state

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    sharableReferralCode: user?.sharableReferralCode || user?.referalcode || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // If name is missing, fetch user info from backend using your logic
    if (!formData.name) {
      setLoading(true);
      const fetchUser = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/user`, {
            withCredentials: true,
          });
          const u = res.data.data.user;
          setFormData({
            name: u.name || "",
            email: u.email || "",
            phone: u.phone || "",
            sharableReferralCode: u.sharableReferralCode || u.referalcode || "",
          });
          // dispatch(setUser(u)); // Uncomment if you want to update Redux
        } catch {
          setError("Failed to fetch user information.");
          setShowToast(true);
          // dispatch(logoutUser && logoutUser()); // Uncomment if you want to update Redux
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [formData.name]);

  return (
    <div className="min-h-[75vh] px-2">
      <div
        className="
           max-w-2xl mx-auto 
          rounded-2xl shadow-xl border border-orange-200 
          bg-white 
          px-6 py-8
          relative
          mt-8
          md:mt-12
        "
      >
        <div className="flex flex-col items-center mb-8">
          <div
            className="flex items-center justify-center w-20 h-20 rounded-full bg-orange-500 shadow text-white text-3xl font-bold select-none"
            style={{
              userSelect: "none",
              letterSpacing: "2px",
            }}
          >
            {getInitials(formData.name)}
          </div>
          <div className="mt-3 text-lg font-semibold text-orange-700">
            {loading ? (
              <span className="text-gray-400">Loading...</span>
            ) : (
              formData.name || <span className="text-gray-400">Not set</span>
            )}
          </div>
        </div>

        <div className="space-y-7">
          <div>
            <label className="block text-base font-semibold text-orange-700 mb-1">Name</label>
            <div className="text-base text-gray-900 px-2 py-1">
              {loading
                ? <span className="text-gray-400">Loading...</span>
                : formData.name || <span className="text-gray-400">Not set</span>}
            </div>
          </div>
          <div>
            <label className="block text-base font-semibold text-orange-700 mb-1">Email</label>
            <div className="text-base text-gray-900 px-2 py-1">
              {loading
                ? <span className="text-gray-400">Loading...</span>
                : formData.email || <span className="text-gray-400">Not set</span>}
            </div>
          </div>
          <div>
            <label className="block text-base font-semibold text-orange-700 mb-1">Phone</label>
            <div className="text-base text-gray-900 px-2 py-1">
              {loading
                ? <span className="text-gray-400">Loading...</span>
                : formData.phone || <span className="text-gray-400">Not set</span>}
            </div>
          </div>
          <div>
            <label className="block text-base font-semibold text-orange-700 mb-1">Referral Code</label>
            <div className="text-base text-gray-900 px-2 py-1">
              {loading
                ? <span className="text-gray-400">Loading...</span>
                : formData.sharableReferralCode || <span className="text-gray-400">Not set</span>}
            </div>
          </div>
        </div>

        {showToast && error && (
          <CustomToast
            message={error}
            type="error"
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PersonalInformation;
