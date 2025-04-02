import {
  FaCertificate,
  FaInfinity,
  FaShoppingCart,
  FaBook,
  FaLaptopCode,
  FaRegClock,
  FaRegArrowAltCircleRight,
  FaChevronDown,
  FaChevronUp,
  FaPlay,
  FaClock,
  FaFileAlt,
  FaAccessibleIcon,
  FaLock,
} from "react-icons/fa";
import { useState } from "react";
import { Youtube, Linkedin } from "lucide-react"


const Course = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const courseData = {
    courseTitle: "Personality Development",
    courseDescription:
      "This course is designed to help you develop your personality and improve your interpersonal skills.",
    courseIntroVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
    sections: [
      {
        id: "01",
        title: "Complete HTML Course",
        lessons: "15 Lessons",
        free: true,
        items: [
          "HTML and VSCode - getting started",
          "Core structure of HTML and Meta tags",
          "Heading, paragraph and reading docs",
          "Formatting style and Global attributes",
          "Value of colors and CSS format",
          "Links and Images with Map",
          "Tables in HTML in HINDI",
          "List, inline and Block element",
          "Class ID and iframe",
          "Head Tag in HTML",
          "HTML semantics",
          "HTML forms and forms attributes",
          "Types of input forms",
          "HTML MEDIA and API",
          "HTML series over, what next",
        ],
      },
      {
        id: "02",
        title: "HTML Quizzes",
        lessons: "1 Test",
        badge: "HTML",
        free: false,
        items: [],
      },
    ],
    authors: [
      {
        name: "Josh Guru",
        description:
          "Josh Guru is a passionate educator and web developer with a knack for making complex concepts simple and engaging. With years of experience in the industry, he is dedicated to helping learners unlock their potential in the world of web development.",
        linkedInId: "https://www.linkedin.com/in/josh-guru",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5So9WLEXMlzxzkllW3q0o1pn1GSNO3.png",
        youtubeId: "https://www.youtube.com/@JoshGuru",
      },
    ],
    courseIntroLine: "Welcome to the HTML course!",
    courseBrifeDescription:
      "This course is designed to help you develop your personality and improve your interpersonal skills.",
    whatWillYouLearn: [
      "Learn the basics of HTML and how to create a website",
      "Understand the structure of HTML documents",
      "Learn how to use HTML tags and attributes",
      "Create forms and tables in HTML",
      "Learn how to add images and links to your website",
      ],
    courseHighlights: [
      "Learn HTML from scratch",
      "Hands-on projects and exercises",
      "Interactive quizzes and assessments",
      "Access to a supportive community",
      "Lifetime access to course materials",
      ],
    whoShouldEnroll:"This course is perfect for beginners who want to start their journey into web development by mastering HTML.No prior programming experience is required – just bring your curiosity and enthusiasm to learn!",
    why: "Just like enjoying a cup of chai while contemplating life, HTML is the starting point of your web development journey. By the end of this course, you'll have a solid understanding of HTML fundamentals and be ready to explore more advanced web technologies.",
    couresThumbnail:"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5So9WLEXMlzxzkllW3q0o1pn1GSNO3.png",
    coursePrice: "₹499",
    courseDuration: "Valid for 365 days",
    benifit: [
      "Lifetime access to course materials",
      "Hands-on projects and exercises",
      "Interactive quizzes and assessments",
    ]
  };

  const [expandedSections, setExpandedSections] = useState({
    "01": true, // First section is open by default
  });

  const toggleSection = (section) => {
    if (!section.free && !isEnrolled) {
      setShowModal(true); // Show pop-up if locked
    } else {
      setExpandedSections((prev) => ({
        ...prev,
        [section.id]: !prev[section.id],
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section */}
          <div className="lg:w-2/3">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{courseData.courseTitle}</h1>
              <p className="text-gray-600 text-lg">{courseData.courseDescription}</p>
              <div className="md:block sm:block lg:hidden mt-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
                  <div className="relative">
                    <img
                      src={courseData.couresThumbnail}
                      alt="Course Thumbnail"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-3xl font-bold text-black">{courseData.courseTitle}</h2>
                      <div className="w-16 h-1 bg-orange-500 mt-2"></div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <FaClock className="mr-2" />
                      <span>{courseData.courseDuration}</span>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium text-lg mb-4">What's included</h3>

                      <div className="space-y-3">
                        {courseData.benifit.map((benefit, index) => (
                          <div key={index} className="flex items-center text-gray-600">
                            <FaFileAlt className="mr-2" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded font-medium transition-colors">
                        BUY THIS COURSE
                      </button>

                      <button className="w-full bg-transparent border border-gray-300 hover:bg-gray-100 text-black text-center py-3 rounded font-medium transition-colors">
                        TRY FREE TRIAL
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Video Section */}
              <div className="mt-4 w-full">
                <video 
                  className="w-full max-w-full rounded-lg shadow-md" 
                  controls
                >
                  <source src={courseData.courseIntroVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div className=" bg-white text-black px-6 pt-6">
              <h2 className="text-2xl font-bold mb-6">Syllabus</h2>

              <div className="space-y-4">
                {courseData.sections.map((section) => (
                  <div
                    key={section.id}
                    className={`bg-white rounded-md shadow-md overflow-hidden ${
                      !section.free && !isEnrolled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                    onClick={() => toggleSection(section)}
                  >
                    {/* Section Header */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-medium">{section.id}</span>
                        <div>
                          <h3 className="font-medium">{section.title}</h3>
                          <p className="text-sm text-gray-600">{section.lessons}</p>
                        </div>
                        {!section.free && !isEnrolled && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
                            <FaLock /> Locked
                          </span>
                        )}
                      </div>
                      <div>
                        {expandedSections[section.id] ? (
                          <FaChevronUp className="text-gray-600" />
                        ) : (
                          <FaChevronDown className="text-gray-600" />
                        )}
                      </div>
                    </div>

                    {/* Lesson List */}
                    {expandedSections[section.id] && section.items.length > 0 && (
                      <div className="border-t border-gray-300">
                        {section.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-3 p-4 hover:bg-gray-100 transition-colors">
                            <FaPlay className="text-gray-600 text-xs" />
                            <div>
                              <p className="font-medium">{item}</p>
                              <p className="text-sm text-gray-600">Video</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Enrollment Pop-up */}
              {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
                    <h2 className="text-xl font-semibold mb-4">Enroll to Unlock</h2>
                    <p className="text-gray-600 mb-4">You need to enroll in the course to access this module.</p>
                    <button
                      onClick={() => {
                        setIsEnrolled(true);
                        setShowModal(false);
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg mr-2"
                    >
                      BUY COURSE
                    </button>
                    <button onClick={() => setShowModal(false)} className="bg-gray-300 py-2 px-4 rounded-lg">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white text-black min-h-screen p-6 md:p-8">
              {/* Author Section */}
              <section className="mb-12">
                <h1 className="text-3xl font-bold mb-6">Author</h1>
                {courseData.authors.map((author, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={author.image}
                        alt={author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{author.name}</h2>
                      <div className="flex gap-2 mt-2">
                        <a href={author.youtubeId} aria-label="YouTube" className="text-black hover:text-gray-700">
                          <Youtube size={20} />
                        </a>
                        <a href={author.linkedInId} aria-label="LinkedIn" className="text-black hover:text-gray-700">
                          <Linkedin size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="mt-4">{courseData.authors[0].description}</p>
              </section>

              {/* About This Course Section */}
              <section>
                <h1 className="text-3xl font-bold mb-6">About This Course</h1>
                <p className="mb-4">{courseData.courseIntroLine}</p>

                <h3 className="text-xl font-semibold mt-6 mb-2">Course Description:</h3>
                <p className="mb-4">{courseData.courseBrifeDescription}</p>

                <h3 className="text-xl font-semibold mt-6 mb-2">What You'll Learn:</h3>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  {courseData.whatWillYouLearn.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-2">Course Highlights:</h3>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                  {courseData.courseHighlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-2">Who Should Enroll:</h3>
                <p className="mb-6">{courseData.whoShouldEnroll}</p>

                <h3 className="text-xl font-semibold mt-6 mb-2">Why This Course?</h3>
                <p className="mb-6">{courseData.why}</p>
              </section>
            </div>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/3 hidden sm:hidden lg:block md:hidden">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
              <div className="relative">
                <img
                  src={courseData.couresThumbnail}
                  alt="Course Thumbnail"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-3xl font-bold text-black">{courseData.courseTitle}</h2>
                  <div className="w-16 h-1 bg-orange-500 mt-2"></div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <FaClock className="mr-2" />
                  <span>{courseData.courseDuration}</span>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-4">What's included</h3>

                  <div className="space-y-3">
                    {courseData.benifit.map((benefit, index) => (
                      <div key={index} className="flex items-center text-gray-600">
                        <FaFileAlt className="mr-2" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded font-medium transition-colors">
                    BUY THIS COURSE
                  </button>

                  <button className="w-full bg-transparent border border-gray-300 hover:bg-gray-100 text-black text-center py-3 rounded font-medium transition-colors">
                    TRY FREE TRIAL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default Course;
