import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/utils";

const LicenseAndAgreement = () => {
  const [license, setLicense] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchlicense = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/privacy/getPrivacy?contentType=license`, {
          withCredentials: true,
        });
        if (res.data) {
          setLicense(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching license:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchlicense();
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen px-6 py-16 sm:px-8 lg:px-12">
      <div className=" mx-auto">
        {/* <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          License & Agreements
        </h1> */}

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-gray-600">Loading license and agreement...</div>
        ) : (
          // Render the fetched license content
          <div
            className="space-y-6 text-base sm:text-lg text-black"
            dangerouslySetInnerHTML={{ __html: license?.renderedContent }}
          />
        )}
      </div>
    </section>
  );
};

export default LicenseAndAgreement;
