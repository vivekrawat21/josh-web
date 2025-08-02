import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/utils";

const Terms = () => {
  const [terms, setTerms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchterms = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/privacy/getPrivacy?contentType=terms`, {
          withCredentials: true,
        });
        if (res.data) {
          setTerms(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching terms:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchterms();
  }, []);

  return (
    <section className="bg-gray-100 min-h-screen px-6 py-16 sm:px-8 lg:px-12">
      <div className=" mx-auto">
        {/* <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Terms & Conditions
        </h1> */}

        {loading ? (
          <div className="text-center text-gray-600">Loading terms and conditions...</div>
        ) : (
          <div
            className="space-y-6 text-base sm:text-lg text-black"
            dangerouslySetInnerHTML={{ __html: terms?.renderedContent }}
          />
        )}
      </div>
    </section>
  );
};

export default Terms;
