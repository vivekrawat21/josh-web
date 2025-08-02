import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/utils";

const RefundAndPolicy = () => {
  const [policy, setPolicy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/privacy/getPrivacy?contentType=refund`, {
          withCredentials: true,
        });
        if (res.data) {
          setPolicy(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching refund policy:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  return (
    <div className="bg-white min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto ">
        {/* Optional Title */}
        {/* <h1 className="text-3xl font-bold mb-4 text-orange-600">Refund Policy</h1> */}
        
        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-500">Loading refund policy...</p>
        ) : (
          // Render the fetched policy content
          <div
            className="space-y-6 text-base sm:text-lg text-black"
            dangerouslySetInnerHTML={{ __html: policy?.renderedContent }}
          />
        )}
      </div>
    </div>
  );
};

export default RefundAndPolicy;
