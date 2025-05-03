import React from "react";
import { useEffect , useState } from "react";
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
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Terms & Conditions</h1>
      {loading ? (
      <p>Loading...</p>
    ) : (
      <div
        className="prose prose-orange max-w-none"
        dangerouslySetInnerHTML={{ __html: terms?.renderedContent }}
      />
    )}
    </section>
  );
};

export default Terms;