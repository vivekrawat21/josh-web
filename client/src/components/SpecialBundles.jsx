import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/utils";

const SpecialBundles = () => {
  const bookDetails = [
    {
      title: "Freelancing Road To 1 lakhs",
      image: "/specialBundle1.png",
      titleColor: "#F2B46F",
      link: "basicBundle",
    },
    {
      title: "Freelancing Road To 3 Lakhs",
      image: "/specialBundle2.png",
      titleColor: "#88BD9F",
      link: "intermediateBundle",
    },
    {
      title: "Freelancing Road To 5 Lakhs",
      image: "/specialBundle3.png",
      titleColor: "#7C42B0",
      link: "advanceBundle",
    },
  ];

  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/digitalBundle/getDigitalBundles`);
        console.log("digital bundles response:", response.data.data.bundles);
        
        setBundles(response.data.data.bundles); // pick first 3 bundles only
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
        console.error("Error fetching bundles:", error);
      }
    };
    fetchBundles();
  }, []);

  // Combine first 3 bundles with static details (by index)
  const mergedBundles = [...bundles].reverse().map((bundle, index) => ({
    ...bookDetails[index],
    ...bundle,
    _id: bundle._id || `fallback-${index}`,
  }));

  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl lg:text-5xl font-semibold text-center my-8 text-gray-900">
        Digital <span className="text-orange-500">Learning Bundles</span>
      </h2>

      {loading && <p className="text-center text-lg">Loading bundles...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-20 gap-6 max-w-[95%] mx-auto">
          {mergedBundles.map((book, index) => (
            <Link to={`/digitallearningbundles/${book.link}/${book._id}`} key={index}>
              <div className="text-center relative">
                <div
                  className="flex justify-center items-center rounded-t-md mb-1"
                  style={{ background: book.titleColor }}
                >
                  <h3 className="my-2 text-xl font-semibold text-gray-700">
                    {book.title}
                  </h3>
                </div>
                <div className="relative">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-[80%] max-w-full object-contain border"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default SpecialBundles;
