import React, { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {BASE_URL} from "../utils/utils";
import axios from "axios"

const Upgrade = () => {
  const bundles = useSelector((state) => state.bundle.bundles[0]) || [];
  const [selectedBundles, setSelectedBundles] = useState([]);
  const [enrolledBundle, setEnrolledBundle] = useState([])
  // const {_id} = useParams();
  
  const handleSelect = (bundleId) => {
    setSelectedBundles((prevSelected) =>
      prevSelected.includes(bundleId)
        ? prevSelected.filter((id) => id !== bundleId)
        : [...prevSelected, bundleId]
    );
  };
  const [loading, setLoading] = useState(true);
  const user = useSelector((state)=> state.user);
  const handleContinue = () => {
    // console.log("Selected Bundles:", selectedBundles);
  };
 useEffect(() => {
     if (!user?._id) return;
     const fetchEnrolledCourses = async () => {
       try {
         const response = await axios.get(`${BASE_URL}/user/${user._id}/getBundles`, {
           withCredentials: true,
         });
        
         setEnrolledBundle(response.data?.data?.user?.bundles || []);
       } catch (error) {
         // Optionally handle error UI here
       } finally {
         setLoading(false);
       }
     };
     fetchEnrolledCourses();
   }, [user]);
  // const isLoading = bundles.length === 0;
  // if(loading ){
  //     return (
  //       <div className=" flex items-center justify-center min-h-screen">
  //         loading ....
  //       </div>
  //     )
  // }
  const upgradingBundles = bundles.filter((bundle)=>{
    return !enrolledBundle.some((enrolled)=> {
      return enrolled._id === bundle._id
    })
  })
  console.log(upgradingBundles)
  const sortedBundles = upgradingBundles.sort((a, b) => a.price - b.price); 
  console.log(sortedBundles)
//   console.log("bundles")
//   console.log(bundles)
//   console.log("enrolledBundles")
//  console.log(enrolledBundle)
//  console.log("upgrading bundles")
//  console.log(upgradingBundles)
  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 py-8 bg-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
        Choose Your Upgrade Bundle
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 animate-pulse shadow-md"
              >
                <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/4 mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-full"></div>
              </div>
            ))
          : sortedBundles.map((bundle) => (
              <div
                key={bundle._id}
                className={`bg-white rounded-xl shadow-md overflow-hidden border transition duration-300 hover:shadow-lg flex flex-col ${
                  selectedBundles.includes(bundle._id)
                    ? "border-blue-500 ring-2 ring-blue-400"
                    : ""
                }`}
                onClick={() => handleSelect(bundle._id)}
              >
                <img
                  src={bundle.bundleImage || "/default-bundle-image.png"}
                  alt={bundle.bundleName}
                  className="h-40 w-full object-cover"
                />

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {bundle.bundleName}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {bundle.description || "No description available"}
                    </p>
                  </div>

                  <div className="mt-4 text-green-600 font-bold text-lg">
                    ₹ {bundle.price || 0}
                  </div>
                </div>

                <div className="p-4">
                  <button
                    className={`w-full py-2 px-4 rounded-lg transition font-medium ${
                      selectedBundles.includes(bundle._id)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {selectedBundles.includes(bundle._id)
                      ? "Selected"
                      : "Select"}
                  </button>
                </div>
              </div>
            ))}
      </div>

      {!loading && selectedBundles.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleContinue}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition"
          >
            Continue with {selectedBundles.length} Bundle
            {selectedBundles.length > 1 ? "s" : ""}
          </button>
        </div>
      )}
    </div>
  );
};

export default Upgrade;
