import React from "react";
import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

const goalsData = [
  {
    id: 1,
    title: "Advance to a higher role",
    features: [
      "Climb the corporate ladder",
      "Take on leadership responsibilities",
      "Enhance management skills",
      "Get promoted"
    ]
  },
  {
    id: 2,
    title: "Earn a professional certificate",
    features: [
      "Boost your qualifications",
      "Enhance expertise in a specific field",
      "Increase job opportunities",
      "Access advanced learning resources"
    ]
  },
  {
    id: 3,
    title: "Transition to a new career field",
    features: [
      "Acquire new skills",
      "Understand industry trends",
      "Get professional guidance",
      "Explore job opportunities in a different field"
    ]
  },
  {
    id: 4,
    title: "Pursue entrepreneurship",
    features: [
      "Start your own business",
      "Develop a business plan",
      "Learn to secure funding",
      "Manage a startup"
    ]
  },
  {
    id: 5,
    title: "Free Course",
    features: [
      "No-cost learning opportunities",
      "Access valuable resources",
      "Flexible study schedule",
      "Earn a certificate upon completion"
    ]
  },
  {
    id: 6,
    title: "Gear up for your first job",
    features: [
      "Prepare a strong resume",
      "Improve interview skills",
      "Understand workplace expectations",
      "Build professional connections"
    ]
  },
  {
    id: 7,
    title: "Ace interview skills",
    features: [
      "Master common interview questions",
      "Learn communication techniques",
      "Handle difficult interview scenarios",
      "Impress potential employers"
    ]
  },
  {
    id: 8,
    title: "Get ready for Government exams",
    features: [
      "Prepare for competitive exams",
      "Access study materials",
      "Learn time management techniques",
      "Stay updated on government job notifications"
    ]
  }
];

const Goals = () => {
  const { id } = useParams(); // Get the 'id' from the URL
  const goalId = parseInt(id); // Convert the id to an integer

  // Find the goal object based on the id
  // console.log(goalId)
  const goal = goalsData.find((g) => g.id === goalId);

  // If the goal is not found, display a message
  if (!goal) {
    return <div>Goal not found</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-gray-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 relative overflow-hidden">
        {/* Left Content */}
        <div className="flex flex-col gap-6 md:w-3/5">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {goal.title} {/* Dynamically display the title */}
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Stay ahead in your career by mastering the skills that matter.
              Gain industry-recognised expertise and step up to leadership
              roles.
            </p>
          </div>

          <ul className="space-y-4">
            {goal.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 bg-red-100 rounded-full p-1">
                  <Check className="h-4 w-4 text-red-500" />
                </div>
                <span className="text-gray-700">{feature}</span> {/* Dynamically display the features */}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 rounded-md text-lg font-medium">
              Talk to Career Expert
            </Button>
            <div className="flex items-center gap-2 mt-6 text-gray-600">
              <Phone className="h-4 w-4" />
              <span>For enquiries call: 1800 210 2020</span>
            </div>
          </div>
        </div>

        {/* Right Content with img and Stats */}
        <div className="md:w-2/5 relative">
          <div className="h-full">
            <img
              src="/goal_person.jpg"
              alt="Professional man in business attire"
              width={500}
              height={600}
              className="object-cover object-center h-full"
            />

            {/* Stats Boxes */}
            <div className="absolute top-10 right-4 bg-white rounded-lg p-3 shadow-md">
              <p className="text-sm text-gray-600">No. of promotions</p>
              <p className="text-2xl font-bold">7,174</p>
            </div>

            <div className="absolute top-1/2 right-8 bg-white rounded-lg p-3 shadow-md">
              <p className="text-sm text-gray-600">Avg. salary hike</p>
              <p className="text-2xl font-bold">39%</p>
            </div>

            <div className="absolute bottom-20 right-4 bg-white rounded-lg p-3 shadow-md">
              <p className="text-sm text-gray-600">Career transitions</p>
              <p className="text-2xl font-bold">27,132</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
