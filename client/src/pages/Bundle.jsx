import { useParams } from "react-router-dom";

const bundleData = {
  "marketing-mastery": {
    title: "Marketing Mastery",
    banner:
      "https://www.bizgurukul.com/Biz/img/biz_image/bundle_img/finance_banner_desk.jpg",
    highlights: {
      courses: 3,
      hours: "15+",
      students: "200k+",
      certificate: "Bizgurukul Certificate",
    },
    courses: [
      {
        title: "Digital Marketing",
        mentor: "Anmol Duggal",
        description:
          "Learn the basics of online marketing and create your own website without coding.",
      },
      {
        title: "SEO Mastery",
        mentor: "John Doe",
        description:
          "Master search engine optimization and rank websites on Google.",
      },
      {
        title: "Social Media Ads",
        mentor: "Jane Smith",
        description:
          "Learn to run profitable ads on Facebook, Instagram, and YouTube.",
      },
    ],
  },
};

const Bundle = () => {
  let { bundleId } = useParams();
  const bundle = bundleData[bundleId] || bundleData["marketing-mastery"];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Banner Section */}
      <div className="relative w-full h-72 rounded-xl overflow-hidden shadow-lg">
        <img
          src={bundle.banner}
          alt={bundle.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900">{bundle.title}</h1>
      
      {/* Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {Object.entries(bundle.highlights || {}).map(([key, value]) => (
          <div key={key} className="p-5 bg-gray-100 rounded-xl shadow">
            <p className="text-xl font-semibold text-gray-800">{value}</p>
            <p className="text-sm capitalize text-gray-600">{key}</p>
          </div>
        ))}
      </div>

      {/* Courses Section */}
      <h2 className="text-3xl font-semibold text-gray-800">Courses in this Bundle</h2>
      <div className="grid gap-6">
        {bundle.courses?.map((course, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-lg rounded-xl border border-gray-200"
          >
            <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
            <p className="text-gray-700">By {course.mentor}</p>
            <p className="text-gray-600 mt-2">{course.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-8">
        <button className="px-8 py-3 bg-orange-500 text-white rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-md">
          Buy this bundle
        </button>
      </div>
    </div>
  );
};

export default Bundle;