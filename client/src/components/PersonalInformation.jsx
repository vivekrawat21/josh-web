import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "@/utils/utils";
import CustomToast from "@/components/CustomToast";
import { Mail, User, Phone, Share2 } from "lucide-react";

const PersonalInformationShimmer = () => (
  <div className="min-h-[60vh] bg-orange-50/40 flex items-center justify-center p-4">
    <div className="max-w-lg w-full mx-auto rounded-xl shadow-lg bg-white p-6 sm:p-8 animate-pulse">
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-300"></div>
        <div className="mt-4 h-6 w-32 bg-gray-300 rounded-md"></div>
      </div>
      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-7 h-7 bg-gray-200 rounded-md"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/4 bg-gray-200 rounded-md"></div>
              <div className="h-5 w-3/4 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

function getInitials(name = "") {
  if (!name) return "";
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0][0]?.toUpperCase() || "";
  }
  return (
    (words[0][0] || "") + (words[words.length - 1][0] || "")
  ).toUpperCase();
}

const PersonalInformation = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    mobilenumber: user?.mobilenumber || "",
    sharableReferralCode: user?.sharableReferralCode || user?.referalcode || "",
  });
  const [loading, setLoading] = useState(!user);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!user?._id) {
      setLoading(true);
      const fetchUser = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/user`, {
            withCredentials: true,
          });
          const fetchedUser = res.data.data.user;
          setFormData({
            name: fetchedUser.name || "",
            email: fetchedUser.email || "",
            mobilenumber: fetchedUser.mobilenumber || "",
            sharableReferralCode: fetchedUser.sharableReferralCode || fetchedUser.referalcode || "",
          });
        } catch (err) {
          setError("Failed to fetch user information.");
          setShowToast(true);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobilenumber: user.mobilenumber || "",
        sharableReferralCode: user.sharableReferralCode || user.referalcode || "",
      });
      setLoading(false);
    }
  }, [user, dispatch]);

  const infoFields = [
    {
      label: "Full Name",
      value: formData.name,
      icon: <User className="text-orange-500 w-6 h-6" />,
    },
    {
      label: "Email Address",
      value: formData.email,
      icon: <Mail className="text-orange-500 w-6 h-6" />,
    },
    {
      label: "Mobile Number",
      value: formData.mobilenumber,
      icon: <Phone className="text-orange-500 w-6 h-6" />,
    },
  ];

  if (user?.canRefer) {
    infoFields.push({
      label: "Referral Code",
      value: formData.sharableReferralCode,
      icon: <Share2 className="text-orange-500 w-6 h-6" />,
    });
  }

  if (loading) {
    return <PersonalInformationShimmer />;
  }

  return (
    <div className="min-h-[60vh] bg-orange-50 flex items-start sm:items-center justify-center p-4">
      <div className="max-w-[35rem] w-full mx-auto rounded-xl shadow-xl border border-orange-100 bg-white p-6 sm:p-8">
        <div className="flex flex-col items-center mb-8">
          <div
            className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 text-white text-4xl font-bold select-none shadow-lg"
          >
            {getInitials(formData?.name)}
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {formData?.name || "User Profile"}
          </h2>
        </div>

        <div className="space-y-5">
          {infoFields.map((field, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex-shrink-0">{field.icon}</div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-500">
                  {field.label}
                </label>
                <div className="text-lg font-semibold text-gray-800">
                  {field.value || (
                    <span className="text-gray-400 text-base font-normal">
                      Not set
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
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