import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, FileText, Award } from "lucide-react";

import { BASE_URL } from "@/utils/utils";

import axios from "axios";

import { useParams } from "react-router-dom";
const AdvanceBundle = () => {
  const [bundle , setBundle] = React.useState([])
 
  const {id} = useParams()
  console.log(id)
   const fetchBundle = async()=>{
    const res  = await axios.get(`${BASE_URL}/course/getBundle/${id}`,{withCredentials:true})
    // console.log(res.data.data)
    setBundle(res.data.data.bundle)
    console.log(res.data.data)


   }
  useEffect(() => {
    if(bundle.length === 0){

    fetchBundle()
    }
    // console.log("Bundle",bundle[0])
  }, [id])
  return (
    <div className="flex flex-col min-h-screen mb-6 mx-4">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-green-900 to-green-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">JoshGuru</h1>
        </div>
        <Button className=" bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-orange-600 transition duration-300">
      Enroll Now
    </Button>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-900 to-green-600  text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Badge className="bg-[#F5DEB3] text-green-800 mb-4">{bundle.bundleName}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Freelancing Road To 5 Lakhs Per Months</h1>
          <p className="text-xl mb-8">
            {bundle.description}
          </p>
         

          <div className="flex flex-wrap gap-8 mt-8 bg-[#F5DEB3]/80 p-4 rounded-lg text-orange-600 font-bold">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6" />
              <span>24 Skilled Courses</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6" />
              <span>Lifetime Access</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              <span>English/Hindi</span>
            </div>
          </div>
        </div>
      </section>

      <section className=" my-4 py-16 px-4 bg-gradient-to-b from-green-900 to-green-600 text-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
          Master {bundle.bundleName} & Elevate Your Career!
          <span className="block w-32 sm:w-48 h-1 bg-intermediate-bg mx-auto mt-2"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section - Course Details */}
          <div className="flex flex-col gap-6">
            {/* SEO & Content Marketing */}
            <Card className="border-orange-600 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-2 bg-intermediate-bg"></div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 bg-intermediate-bg p-2 rounded-md w-fit">
                      Learn SEO & Content Marketing
                    </h3>
                    <p className="text-sm sm:text-base">
                      Discover how to rank on search engines, optimize content, and drive organic traffic to websites.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Mastery */}
            <Card className="border-orange-600 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-2 bg-intermediate-bg"></div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 bg-intermediate-bg p-2 rounded-md w-fit">
                      Social Media Mastery
                    </h3>
                    <p className="text-sm sm:text-base">
                      Build brand awareness, engage audiences, and create high-converting campaigns on platforms like Facebook, Instagram, and LinkedIn.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* PPC & Paid Ads */}
            <Card className="border-orange-600 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-2 bg-intermediate-bg"></div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 bg-intermediate-bg p-2 rounded-md w-fit">
                      PPC & Paid Ads
                    </h3>
                    <p className="text-sm sm:text-base">
                      Master Google Ads, Facebook Ads, and LinkedIn campaigns to maximize ROI.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Course Image & Features */}
          <div className="flex flex-col items-center">
            <img
              src="https://t4.ftcdn.net/jpg/02/52/76/09/360_F_252760983_ZTCURKreID1WJkC7uiX6olt7hH0Q7v8X.jpg"
              alt="Digital Marketing Course"
              className="rounded-lg w-full h-auto max-w-xs sm:max-w-md md:max-w-lg object-cover"
            />

            {/* Course Features */}
            <ul className="mt-6 space-y-4 text-black">
              <li className="flex items-center gap-2">
                <CheckCircle className="" size={20} /> Industry-Recognized Certificate
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="" size={20} /> Live Projects & Case Studies
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="" size={20} /> Lifetime Access to Course Materials
              </li>
            </ul>

            {/* Enroll Button */}
            <Button className=" bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-orange-600 transition duration-300">
      Enroll Now
    </Button>
          </div>
        </div>
      </div>
    </section>
     
      


      <section className="py-16 px-4 ">
  <div className="container mx-auto max-w-6xl">
    <h2 className="text-3xl font-bold text-center mb-12">
      Get Access To 24 Bonus Skill Courses
      <span className="block w-48 h-1 bg-green-800 mx-auto mt-2"></span>
    </h2>

    <div className="bg-green-100 rounded-lg p-6 sm:p-8 text-black relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="space-y-6 sm:space-y-8">
          { bundle.whyBundle && bundle.whyBundle?.map((item, index) => (
            <span className="flex items-center gap-2 text-sm sm:text-base" key={index}>
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="">{item}</span>
            </span>
          ))}
        </div>

        <div className="relative w-full h-60 sm:h-80">
          <img
            src="https://www.shutterstock.com/image-photo/rear-view-man-raising-arm-600nw-2345710689.jpg"
            alt="Student learning"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<section className="py-16 px-4 bg-[#FFF8DC]">
  <div className="container mx-auto max-w-6xl">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">Explore Our Premium Courses</h2>
      <div className="w-32 h-1 bg-green-800 mx-auto mt-2"></div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
      {bundle.courses?.map((course) => (
        <div
          key={course._id}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
        >
           <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.imageUrl || "data:image/jpeg;base64,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"}
                    alt={course.title}
                    fill
                    className=" object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
          <div className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 group-hover:text-green-700 transition-colors">
              {course.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="py-16 px-4 bg-[#FFF8DC]">
  <div className="container mx-auto max-w-6xl">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-3xl font-bold mb-6">
          Before You Ask!
          <span className="block w-32 h-1 bg-green-600 mt-2"></span>
        </h2>
        <p className="text-lg mb-6 sm:mb-8">
          Yes, you'll be certified for each course after passing the tests.
        </p>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-green-600  flex items-center justify-center text-white flex-shrink-0">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <p className="font-medium text-sm sm:text-base">
              Official certificate from us to verify your achievements and increase your job prospects.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-green-600 flex items-center justify-center text-white flex-shrink-0">
              <Users className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <p className="font-medium text-sm sm:text-base">
              Easily shareable certificate for your portfolio to post on all platforms available.
            </p>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-green-600  flex items-center justify-center text-white flex-shrink-0">
              <Award className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <p className="font-medium text-sm sm:text-base">
              Use your certificate to enhance your professional credibility and stand out among your peers.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="border-4 border-green-800 rounded-lg p-3 sm:p-4 bg-[#FFF8DC] max-w-xs sm:max-w-md">
          <img
            src="https://media.istockphoto.com/id/1427207629/vector/certificate-of-appreciation-template-gold-and-green-color-clean-modern-certificate-with-gold.jpg?s=612x612&w=0&k=20&c=ZTN5SJx55fIbCEdynoE5tVb9qX9MIztBp8KYfn1DPq0="
            alt="Certificate"
            className="rounded"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<section className= " bg-gradient-to-b from-green-800  to-green-500 text-white py-6 px-4">
  <div className="container mx-auto max-w-6xl flex flex-wrap gap-4 sm:gap-0 justify-between items-center">
    <div>
      <p className="font-medium text-sm sm:text-base">Hurry Up! Seats are filling fast</p>
      <div className="flex items-center gap-2">
        <span className="text-lg sm:text-xl line-through">₹74,999</span>
        <span className="text-xl sm:text-2xl font-bold">₹{bundle.price}</span>
      </div>
    </div>
    <Button className=" bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-orange-600 transition duration-300">
      Enroll Now
    </Button>
  </div>
</section>

    </div>
  );
};

export default AdvanceBundle;