import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/utils";

const Disclaimer = () => {
  const [disclaimer, setDisclaimer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisclaimer = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/privacy/getPrivacy?contentType=disclaimer`,
          { withCredentials: true }
        );
        if (res.data) {
          setDisclaimer(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching disclaimer:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDisclaimer();
  }, []);

  return (
    <div className="bg-white min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        {/* <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-black mb-12 text-center">
          Disclaimer
        </h1> */}

        {loading ? (
          <p className="text-center text-gray-500">Loading disclaimer...</p>
        ) : (
          <div
            className="space-y-6 text-base sm:text-lg text-black"
            dangerouslySetInnerHTML={{ __html: disclaimer?.renderedContent }}
          />
        )}
      </div>
    </div>
  );
};

export default Disclaimer;
