import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
const RefundPolicy = () => {
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
        console.error("Error fetching disclaimer:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-orange-600">Refund Policy</h1>
      {/* <p className="mb-4">
        At <strong>Joshguru</strong>, we value your satisfaction. Due to the digital nature of
        our services and courses, we maintain a no refund policy once the purchase is
        completed.
      </p>

      <p className="mb-4">
        We provide ample previews, course content details, and support to help you
        make an informed decision before enrolling.
      </p>

      <p className="mb-4">
        In rare cases of duplicate payment or incorrect transaction, we will evaluate
        the issue and refund upon verification within 7–10 business days.
      </p>

      <p className="mb-4 font-semibold text-orange-500">
        Please ensure you read all course details and FAQs before purchase.
      </p> */}
          {loading ? (
      <p>Loading...</p>
    ) : (
      <div
        className="prose prose-orange max-w-none"
        dangerouslySetInnerHTML={{ __html: policy?.renderedContent }}
      />
    )}
    </div>
  );
};

export default RefundPolicy;
