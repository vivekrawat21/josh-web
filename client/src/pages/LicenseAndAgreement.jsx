import React from "react";
import { useEffect , useState } from "react";
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
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">License & Agreements</h1>
      {/* <p className="text-gray-700">
        All content and software provided through our platform is licensed, not sold.
        You are granted a limited, non-exclusive, non-transferable license to use the services
        as per the terms specified in your agreement with us.
      </p> */}
      {loading ? (
       <p>Loading...</p>
    ) : (
      <div
        className="prose prose-orange max-w-none"
        dangerouslySetInnerHTML={{ __html: license?.renderedContent }}
      />
    )}
    </section>
  );
};

export default LicenseAndAgreement;