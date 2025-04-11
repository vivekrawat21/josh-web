import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, CheckCircle, Users, Award } from "lucide-react"
import { Link } from "react-router-dom";

import { BASE_URL } from "@/utils/utils";

import axios from "axios";

import { useParams } from "react-router-dom";
const BasicBundle = ({ page = "page2" }) => {
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

    const [openIndex, setOpenIndex] = useState(0)
    const [selected, setSelected] = useState("english")
  
    // Define color themes for each page
    const themes = {
      page1: { // Orange theme
        primary: "#FFA500",
        primaryLight: "#FFE0B2",
        primaryDark: "#E65100",
        secondary: "#FFB74D",
        secondaryLight: "#FFE9CA",
        secondaryDark: "#CC5500",
        accent: "#FFCC80",
        accentLight: "#FFF3E0",
        accentDark: "#EF6C00",
        background: "#FFF8F2",
        text: "#333333",
        textLight: "#666666",
        border: "#FFB74D",
        buttonGradientFrom: "#FFA500",
        buttonGradientTo: "#E65100",
        cardBorder: "#FFCC80",
        timelineDot: "#FFA500",
        mentorHighlight: "#FFE0B2",
        footerBackground: "#CC5500",
        footerBorder: "#FFCC80",
        footerText: "#FFF3E0",
        gradientStart: "#FFE0B2",
        gradientMiddle: "#FFCC80",
        gradientEnd: "#FFB74D",
        timelineGradientStart: "#FFE9CA",
        timelineGradientEnd: "#FFCC80",
        moduleNumberGradientStart: "#FFCC80",
        moduleNumberGradientEnd: "#FFB74D",
        ctaGradientStart: "#FFE0B2",
        ctaGradientEnd: "#FFA500",
        bgHeroSectionImage:"/Freelancing_Road_To_1_Lakhs heading image.png",
        fifteenMImage: "/15M.png",
        oneBImage: "/1B.png",
        twentyLImage: "/20L.png",
      },
      page2: { // Green theme
        primary: "#4CAF50",
        primaryLight: "#C8E6C9",
        primaryDark: "#388E3C",
        secondary: "#81C784",
        secondaryLight: "#E8F5E9",
        secondaryDark: "#66BB6A",
        accent: "#A5D6A7",
        accentLight: "#F1F8E9",
        accentDark: "#43A047",
        background: "#F1F8E9",
        text: "#333333",
        textLight: "#666666",
        border: "#81C784",
        buttonGradientFrom: "#66BB6A",
        buttonGradientTo: "#388E3C",
        cardBorder: "#A5D6A7",
        timelineDot: "#4CAF50",
        mentorHighlight: "#C8E6C9",
        footerBackground: "#4CAF50",
        footerBorder: "#A5D6A7",
        footerText: "#E8F5E9",
        gradientStart: "#C8E6C9",
        gradientMiddle: "#A5D6A7",
        gradientEnd: "#81C784",
        timelineGradientStart: "#E8F5E9",
        timelineGradientEnd: "#A5D6A7",
        moduleNumberGradientStart: "#A5D6A7",
        moduleNumberGradientEnd: "#81C784",
        ctaGradientStart: "#81C784",
        ctaGradientEnd: "#4CAF50",
        bgHeroSectionImage:"/herolandingpage2.png",
        fifteenMImage: "/15Mpage2.png",
        oneBImage: "/1Bpage2.png",
        twentyLImage: "/20Lpage2.png",
      },
      page3: { // Purple theme
        primary: "#9C27B0",
        primaryLight: "#E1BEE7",
        primaryDark: "#6A1B9A",
        secondary: "#AB47BC",
        secondaryLight: "#F3E5F5",
        secondaryDark: "#8E24AA",
        accent: "#CE93D8",
        accentLight: "#F8F0FB",
        accentDark: "#7B1FA2",
        background: "#F3E5F5",
        text: "#333333",
        textLight: "#666666",
        border: "#AB47BC",
        buttonGradientFrom: "#8E24AA",
        buttonGradientTo: "#6A1B9A",
        cardBorder: "#CE93D8",
        timelineDot: "#9C27B0",
        mentorHighlight: "#E1BEE7",
        footerBackground: "#9C27B0",
        footerBorder: "#CE93D8",
        footerText: "#F3E5F5",
        gradientStart: "#E1BEE7",
        gradientMiddle: "#CE93D8",
        gradientEnd: "#AB47BC",
        timelineGradientStart: "#F3E5F5",
        timelineGradientEnd: "#CE93D8",
        moduleNumberGradientStart: "#CE93D8",
        moduleNumberGradientEnd: "#AB47BC",
        ctaGradientStart: "#AB47BC",
        ctaGradientEnd: "#9C27B0",
        bgHeroSectionImage:"/herolandingpage3.png",
        fifteenMImage: "/15Mpage3.png",
        oneBImage: "/1Bpage3.png",
        twentyLImage: "/20Lpage3.png",
      },
    }
  
    // Get the current theme based on the page prop
    const colors = themes[page] || themes.page1
  
    const toggleQuestion = (index) => {
      setOpenIndex(openIndex === index ? null : index)
    }
  
    const bonusSkills = [
      {
        id: 1,
        name: "WordPress",
        imageUrl: "/wordpress.svg",
      },
      {
        id: 2,
        name: "Photoshop",
        imageUrl: "/ps.svg",
      },
      {
        id: 3,
        name: "JavaScript",
        imageUrl: "/javascript.svg",
      },
      {
        id: 4,
        name: "Mobile Video Editing",
        imageUrl: "/mobile_video_editing.svg",
      },
      {
        id: 5,
        name: "Launch E-Course",
        imageUrl: "/launch_e_course.svg",
      },
      {
        id: 6,
        name: "Google Ads",
        imageUrl: "/google_ads.svg",
      },
      {
        id: 7,
        name: "Taxation",
        imageUrl: "/taxation.svg",
      },
      {
        id: 8,
        name: "Public Relations",
        imageUrl: "/pr.svg",
      },
      {
        id: 9,
        name: "Content Writing",
        imageUrl: "/content_writing.svg",
      },
      {
        id: 10,
        name: "Copy Writing",
        imageUrl: "/copy_writing.svg",
      },
      {
        id: 11,
        name: "Printify",
        imageUrl: "/printify.svg",
      },
      {
        id: 12,
        name: "Shipping",
        imageUrl: "/shipping.svg",
      },
    ]
  
    const goldenAgeData = [
      {
        id: 1,
        title: "Unstoppable Growth",
        description:
          "The freelance economy is expanding faster than ever, with businesses shifting to remote, flexible talent.",
      },
      {
        id: 2,
        title: "Endless Earnings",
        description: "Say goodbye to fixed salaries—charge what you're worth and scale your income on your terms.",
      },
      {
        id: 3,
        title: "Freedom & Flexibility",
        description: "Work from anywhere, choose your projects, and create a lifestyle that suits you.",
      },
    ]
  
    const ModulesData = [
      {
        id: 1,
        title: "Foundation",
        descriptionTitle: "Start Strong, Succeed",
        description:
          "Master the fundamentals of freelancing, including mindset, client acquisition, and essential skills.",
      },
      {
        id: 2,
        title: "Positioning",
        descriptionTitle: "Stand Out, Get Noticed",
        description: "Learn how to position yourself as a premium freelancer who charges top rates.",
      },
      {
        id: 3,
        title: "Showcasing",
        descriptionTitle: "Showcase Your Talent",
        description: "Create a portfolio that highlights your skills and attracts high-paying clients.",
      },
      {
        id: 4,
        title: "Networking",
        descriptionTitle: "Connect, Collaborate, Thrive",
        description: "Build a network of fellow freelancers, mentors, and potential clients to help you grow.",
      },
      {
        id: 5,
        title: "Outreach",
        descriptionTitle: "Get Found, Get Hired",
        description: "Learn how to effectively reach out to potential clients and pitch your services.",
      },
      {
        id: 6,
        title: "Managing",
        descriptionTitle: "Stay Organized, Stay Productive",
        description: "Master time management, project management, and client communication skills.",
      },
      {
        id: 7,
        title: "Scaling",
        descriptionTitle: "Grow Your Business",
        description: "Learn how to scale your freelancing business, including hiring a team and creating a brand.",
      },
    ]
  
    const questions = [
      {
        question: "How do I enroll in the course?",
        answer:
          "You can enroll directly from this page by clicking the button. Once you complete your purchase, you'll receive confirmation via WhatsApp and email.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment gateway.",
      },
      {
        question: "Is there a refund policy?",
        answer:
          "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with the course, you can request a full refund within 30 days of purchase.",
      },
      {
        question: "How long do I have access to the course materials?",
        answer:
          "Once enrolled, you have lifetime access to all course materials, including future updates and additional resources.",
      },
      {
        question: "Are there any prerequisites for this course?",
        answer:
          "No specific prerequisites are required. The course is designed to accommodate beginners while also providing value to those with some experience.",
      },
      {
        question: "Can I access the course on mobile devices?",
        answer:
          "Yes, our platform is fully responsive. You can access all course materials on desktop, tablet, and mobile devices.",
      },
      {
        question: "Is there a community or support available?",
        answer:
          "You'll get access to our private community where you can connect with other students and instructors. We also provide dedicated support via email.",
      },
    ]
  
    const cards = [
      {
        title: "Apt High-Ticket Framework",
        description:
          "Learn how to position yourself as a premium freelancer who charges top rates. This framework helps you stand out from the crowd, attract high-paying clients, and deliver work that justifies premium pricing. Stop working more for less—start earning big for the value you bring.",
        img: "/member2.jpg",
      },
      {
        title: "Master High-Income Skills",
        description:
          "Freelancing success starts with skills that businesses are desperate for. Learn in-demand, high-paying skills like marketing, content, and AI tools—the ones that drive business results. Master what pays, so clients always need you. Stay ahead of the curve with future-proof skills that keep your income growing.",
        img: "/member2.jpg",
      },
      {
        title: "Automate Client Acquisition",
        description:
          "Forget begging for work—let clients come to you. Build a personal brand that positions you as the go-to expert, so clients see your value upfront. Learn to use AI tools, social proof, and content to attract high-paying leads consistently—without chasing anyone. Turn your profile into a client magnet that works 24/7.",
        img: "/member4.jpg",
      },
    ]
  
    const heroSectionData = [
      {
        title: "Freelancing Road To 5 Lakhs Per Month",
        subtitle: "Unlock High-Ticket Freelancing Success – Land Premium Clients, Scale Fast, and Work on Your Terms!",
        numberOfCourses: "24 Skilled Courses",
      },
    ]


  return (
    <div className="relative w-full overflow-x-hidden">
      {/* page nav bar */}
      <div className="relative w-full h-auto py-3 md:h-[71.78px] bg-white/10 backdrop-blur-[12.5px] flex justify-between items-center px-4 md:px-6 lg:px-20 xl:px-56 shadow-[0_4px_4px_-2px_rgba(0,0,0,0.1)] mx-auto">
        <Link to="/">
        <img src="/logo1.png" alt="joshguru" className="w-[60px] md:w-[90px] h-[60px] object-cover" />  
        </Link>
        <button className="px-4 md:px-6 py-2 bg-transparent text-white font-semibold border-2 border-white shadow-[0_4px_4px_-2px_rgba(0,0,0,0.1)] transition-all duration-200 hover:bg-white hover:text-blue-600 text-sm md:text-base">
          Enroll Now
        </button>
      </div>

      {/* Optional hero section */}
      <div className="absolute top-0 left-0 w-full h-full -z-40">
        <img
          src={colors.bgHeroSectionImage}
          alt="hero"
          className="w-full h-[950px] object-cover md:object-fill"
        />
      </div>

      {/* hero section */}
      <div className="relative w-full max-w-[1140px] px-4 mx-auto pt-[110px] pb-[50px] md:pb-[100px] flex flex-col items-center">
        {/* Heading 6 */}
        <div className="w-[215.23px] h-[32.8px] bg-white/20 rounded-full flex items-center justify-center mb-4">
          <p className="text-white text-[13.23px] font-medium">Digital Freelancing Bundle</p>
        </div>

        {/* Main Heading */}
        <h1 className="w-full max-w-[893.39px] text-2xl md:text-3xl lg:text-[44.38px] font-black text-white text-center leading-tight md:leading-[55px] mb-2 md:mb-4">
          {heroSectionData[0].title}
        </h1>

        {/* Subtitle */}
        <p className="w-full max-w-[720.34px] text-sm md:text-[14.87px] text-white text-center mb-6 md:mb-10">
          {heroSectionData[0].subtitle}
        </p>

        {/* Language Tabs */}
        <div className="flex gap-3 mb-6 md:mb-10">
          <button
            className={`w-[84.16px] h-[34.5px] rounded-full flex items-center justify-center text-white text-[13.94px] ${
              selected === "english"
                ? `bg-gradient-to-r from-${colors.primaryLight} to-${colors.primary}`
                : "bg-white/10"
            }`}
            style={{
              background:
                selected === "english" ? `linear-gradient(to right, ${colors.primaryLight}, ${colors.primary})` : "",
            }}
            onClick={() => setSelected("english")}
          >
            English
          </button>
          <button
            className={`w-[84.16px] h-[34.5px] rounded-full flex items-center justify-center text-[#333333] text-[14.18px] ${
              selected === "hindi" ? `bg-gradient-to-r from-${colors.primaryLight} to-${colors.primary}` : "bg-white/10"
            }`}
            style={{
              background:
                selected === "hindi" ? `linear-gradient(to right, ${colors.primaryLight}, ${colors.primary})` : "",
            }}
            onClick={() => setSelected("hindi")}
          >
            Hindi
          </button>
        </div>

        {/* Info Strip */}
        <div
          className="w-full max-w-[800px] bg-transparent rounded-[12px] md:rounded-b-none md:rounded-t-[12px] flex flex-col md:flex-row items-center justify-around px-4 md:px-6 py-4 md:h-[68px] mb-4 md:mb-0"
          style={{
            border: `3px solid ${colors.primaryDark}`,
            borderBottom: "md:0",
          }}
        >
          <div className="flex items-center gap-2 py-2 md:py-0 w-full md:w-auto">
            <img src="/all_course.svg" alt="courses" className="w-[34px] h-[34px]" />
            <p className="text-[#333333] text-sm md:text-[15px] font-medium text-left md:text-center">
              {heroSectionData[0].numberOfCourses}
            </p>
          </div>

          <div className="hidden md:block w-[1.16px] h-[35px] bg-black opacity-30" />

          <div className="flex items-center gap-2 py-2 md:py-0 w-full md:w-auto">
            <img src="/lifetime_access.svg" alt="access" className="w-[34px] h-[34px]" />
            <p className="text-[#333333] text-sm md:text-[14.63px] font-medium text-left md:text-center">
              Lifetime Access
            </p>
          </div>

          <div className="hidden md:block w-[1.16px] h-[35px] bg-black opacity-30" />

          <div className="flex items-center gap-2 py-2 md:py-0 w-full md:w-auto">
            <img src="/english_hindi.svg" alt="language" className="w-[34px] h-[34px]" />
            <p className="text-[#333333] text-sm md:text-[15.12px] font-medium text-left md:text-center">
              English/Hindi
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full max-w-[950px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] bg-gradient-to-b from-[#bfbebe] to-[#929190] rounded-[12px] overflow-hidden">
          <div className="w-full h-full p-[3px]">
            <div className="w-full h-full bg-[#0F0F0F] rounded-[10px] overflow-hidden">
              <video
                src={
                  selected === "english"
                    ? "https://www.w3schools.com/html/mov_bbb.mp4"
                    : "https://www.w3schools.com/html/mov_bbb.mp4"
                }
                controls
                className="w-full h-full object-cover rounded-[10px]"
              ></video>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-12">
          <button
            className="h-[51px] rounded px-6 md:px-10 text-white text-base md:text-[16.7344px] leading-[27px] font-medium w-[250px] md:w-[350px] flex items-center justify-center"
            style={{
              background: `linear-gradient(to right, ${colors.buttonGradientFrom}, ${colors.buttonGradientTo})`,
            }}
          >
            Start Learning
          </button>
        </div>
      </div>

      {/*Bonus Skills */}
      <div className="relative w-full py-2 md:py-2">
        <p className="text-center text-xl md:text-2xl lg:text-[30px] font-bold mb-8 md:mb-16 px-4">
          Level Up With These Exclusive{" "}
          <span style={{ borderBottom: `4px solid ${colors.primaryDark}` }}>Bonus Skills</span>
        </p>
        <div className="relative flex overflow-hidden rounded-lg group">
          {/* Left blurred gradient */}
          <div
            className="absolute inset-y-0 left-0 w-16 z-10 blur-5xl pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${colors.background}, ${colors.background}, transparent)`,
            }}
          ></div>

          {/* Scrolling content */}
          <div className="flex space-x-8 md:space-x-16 animate-loop-scroll h-28 my-4">
            {bonusSkills.map((bonusSkill) => (
              <img
                src={bonusSkill.imageUrl || "/placeholder.svg"}
                alt={bonusSkill.name}
                key={bonusSkill.id}
                className="w-12 h-8 md:w-16 md:h-10 lg:w-24 lg:h-10 mx-4 md:mx-8 max-w-32 object-contain"
              />
            ))}
          </div>

          {/* Duplicate scrolling content */}
          <div className="flex space-x-8 md:space-x-16 animate-loop-scroll my-6" aria-hidden="true">
            {bonusSkills.map((bonusSkill) => (
              <img
                src={bonusSkill.imageUrl || "/placeholder.svg"}
                alt={bonusSkill.name}
                key={bonusSkill.id}
                className="w-12 h-8 md:w-16 md:h-10 lg:w-24 lg:h-10 mx-4 md:mx-8 max-w-32 object-contain"
              />
            ))}
          </div>

          {/* Right blurred gradient */}
          <div
            className="absolute inset-y-0 right-0 w-16 z-10 blur-5xl pointer-events-none"
            style={{
              background: `linear-gradient(to left, ${colors.background}, ${colors.background}, transparent)`,
            }}
          ></div>
        </div>
      </div>

      {/*Golden Age */}
      <div style={{ backgroundColor: colors.accentLight }} className="w-full py-12 md:py-16 lg:py-20">
        {/* Container */}
        <div className="w-full max-w-[1140px] mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span>The</span>
              <span className="relative mx-2">
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "3px",
                    backgroundColor: colors.border,
                    borderRadius: "0.375rem",
                  }}
                ></span>
              </span>
              <span>Golden Age To Freelancing Is Here!</span>
            </h2>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Info Cards Container */}
            <div className="flex flex-col gap-4 md:gap-5 lg:w-1/2">
              {goldenAgeData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: colors.background,
                    border: `2px solid ${colors.accentDark}`,
                  }}
                  className="rounded-[12px] p-5 md:p-6"
                >
                  <div style={{ backgroundColor: colors.accentLight }} className="rounded-[4px] p-2 mb-4 relative">
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "0.5rem",
                        height: "100%",
                        backgroundColor: colors.border,
                        borderTopRightRadius: "0.375rem",
                        borderBottomRightRadius: "0.375rem",
                      }}
                    ></div>
                    <h5 className="pl-4 font-medium">{item.title}</h5>
                  </div>
                  <p className="text-sm md:text-base">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Image on right */}
            <div className="lg:w-1/2 flex justify-center items-center mt-6 lg:mt-0">
              <img src="/golden_age.png" alt="Golden Age" className="max-w-full h-auto max-h-[480px] object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/*India Rank*/}
      <div className="w-full py-12 md:py-16 lg:py-20">
        <div className="w-full max-w-[1140px] mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span>And</span>
              <span className="relative mx-2">
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "3px",
                    backgroundColor: colors.border,
                    borderRadius: "0.375rem",
                  }}
                ></span>
              </span>
              <span>India Ranks #2 in the Freelance Market</span>
            </h2>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div
              style={{
                backgroundColor: colors.background,
                borderColor: colors.textLight,
              }}
              className="border rounded-[12px] shadow-[0px_4px_30px_rgba(0,0,0,0.15)] p-5"
            >
              <div
                className="w-[80px] h-[80px] bg-cover mb-5"
                style={{ backgroundImage: `url(${colors.fifteenMImage})` }}
              ></div>
              <h3 className="font-bold text-lg mb-3">Freelancers</h3>
              <p className="text-sm md:text-base">
                India is the second-largest freelance market, with over 15 million working independently.
              </p>
            </div>

            <div
              style={{
                backgroundColor: colors.background,
                borderColor: colors.textLight,
              }}
              className="border rounded-[12px] shadow-[0px_4px_30px_rgba(0,0,0,0.15)] p-5"
            >
              <div
                className="w-[80px] h-[80px] bg-cover mb-5"
                style={{ backgroundImage: `url(${colors.oneBImage})` }}
              ></div>
              <h3 className="font-bold text-lg mb-3">Market</h3>
              <p className="text-sm md:text-base">
                Freelancers in India contribute over $1 billion to the global economy across multiple industries.
              </p>
            </div>

            <div
              style={{
                backgroundColor: colors.background,
                borderColor: colors.textLight,
              }}
              className="border rounded-[12px] shadow-[0px_4px_30px_rgba(0,0,0,0.15)] p-5 md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:mx-0 lg:max-w-none"
            >
              <div
                className="w-[80px] h-[80px] bg-cover mb-5"
                style={{ backgroundImage: `url(${colors.twentyLImage})` }}
              ></div>
              <h3 className="font-bold text-lg mb-3">Earners</h3>
              <p className="text-sm md:text-base">
                23% of Indian freelancers earn over ₹20 lakh a year, making freelancing a rewarding career.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              style={{
                background: `linear-gradient(to right, ${colors.buttonGradientFrom}, ${colors.buttonGradientTo})`,
              }}
              className="w-[280px] md:w-[360px] h-[51px] rounded-[4px] text-white text-base md:text-[17.0156px] leading-[27px] font-medium"
            >
              Claim your spot
            </button>
          </div>
        </div>
      </div>

      {/*Add Up*/}
      <div
        style={{
          background: `linear-gradient(125.79deg, ${colors.gradientEnd} 0%, ${colors.gradientMiddle} 36.84%, ${colors.gradientStart} 86.11%)`,
        }}
        className="relative w-full py-12 md:py-16 lg:py-20"
      >
        {/* Heading Container */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            <span>You Can Also</span>
            <span style={{ borderBottom: `4px solid ${colors.primaryLight}` }} className="pb-0 ml-2">
              Add Up
            </span>
            <span className="ml-2">To This With</span>
          </h2>
        </div>

        {/* Cards Container */}
        <div className="relative w-full lg:w-[850px] h-[300px] md:h-[900px] overflow-y-auto mx-auto px-4 hide-scrollbar">
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="sticky top-0 w-full max-w-[1100px] mx-auto border-[3px] rounded-[12px] p-4 md:p-8 shadow-xl transition-all duration-300"
                style={{
                  zIndex: cards.length + index,
                  opacity: 1,
                  backgroundColor: colors.background,
                  borderColor: colors.cardBorder,
                  borderWidth: "3px",
                }}
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  <img
                    src={card.img || "/placeholder.svg"}
                    alt="card-img"
                    className="w-full md:w-[300px] h-[200px] object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg md:text-xl font-bold mb-2">{card.title}</h2>
                    <p className="text-xs md:text-sm ">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom CSS for hiding scrollbar but allowing scroll */}
        <style jsx global>{`
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;  /* Chrome, Safari and Opera */
          }
        `}</style>
      </div>

      {/* Success Is Here */}
      <div className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
        {/* Background elements */}
        <div
          style={{ backgroundImage: `url('/#${colors.secondaryLight}.png')` }}
          className="absolute left-0 top-[700px] w-full max-w-[1034px] h-[100px] opacity-50"
        ></div>
        <div className="hidden lg:block absolute right-1/4 top-0 w-[1.8px] h-full bg-[url('/v-line.png')]"></div>
        <div
          style={{
            background: `linear-gradient(to bottom right, ${colors.timelineGradientStart}, ${colors.timelineGradientEnd})`,
            borderRadius: "9999px",
            opacity: 0.6,
            filter: "blur(120px)",
          }}
          className="absolute left-0 top-1/4 w-full max-w-[1034px] h-full max-h-[1231px]"
        ></div>

        <div className="container mx-auto max-w-[1140px] px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left side with heading */}
            <div className="lg:col-span-4 w-full lg:sticky lg:top-24 self-start">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-gray-900 mb-6">
                Your Framework For Freelance Success Is Here!
              </h2>
              <p className="text-base md:text-lg text-gray-700 mb-8">
                Follow this proven roadmap to build a thriving freelance business that gives you the freedom, income,
                and impact you desire.
              </p>
              <div className="hidden lg:block">
                <button
                  style={{
                    background: `linear-gradient(to right, ${colors.ctaGradientStart}, ${colors.ctaGradientEnd})`,
                  }}
                  className="px-6 py-3 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Started Today
                </button>
              </div>
            </div>

            {/* Center timeline */}
            <div className="hidden lg:flex lg:col-span-1 justify-center">
              <div className="relative">
                <div
                  style={{
                    background: `linear-gradient(to bottom, ${colors.timelineGradientStart}, ${colors.timelineGradientEnd})`,
                  }}
                  className="absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2"
                ></div>

                {/* Timeline dots */}
                {ModulesData.map((_, index) => (
                  <div
                    key={`dot-${index}`}
                    style={{
                      top: `${index * 180 + 75}px`,
                      borderColor: colors.timelineDot,
                    }}
                    className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-white border-4 z-10"
                  ></div>
                ))}
              </div>
            </div>

            {/* Right side with modules */}
            <div className="lg:col-span-7 space-y-10 md:space-y-16 relative">
              {ModulesData.map((module, index) => (
                <div
                  key={module.id}
                  style={{ backgroundColor: colors.background }}
                  className="relative rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Module Number Badge */}
                  <div className="absolute left-4 lg:-left-6 top-0 transform -translate-y-1/2 flex items-center flex-wrap">
                    <div
                      style={{
                        background: `linear-gradient(to bottom right, ${colors.moduleNumberGradientStart}, ${colors.moduleNumberGradientEnd})`,
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <span className="text-white font-bold text-base md:text-lg">{module.id}</span>
                    </div>
                    <div
                      style={{ backgroundColor: colors.background }}
                      className="py-1 px-2 md:py-2 md:px-4 rounded-r-lg shadow-md ml-1"
                    >
                      <h3 className="text-sm md:text-base font-bold text-gray-800">{module.title}</h3>
                    </div>
                  </div>

                  {/* Module Content */}
                  <div className="p-4 md:p-6 pt-6 md:pt-8 mt-4">
                    <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
                      {module.descriptionTitle}
                    </h4>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">{module.description}</p>
                  </div>

                  {/* Connecting line to timeline (mobile only) */}
                  <div
                    style={{
                      background: `linear-gradient(to bottom, ${colors.secondaryLight}, transparent)`,
                    }}
                    className="lg:hidden absolute left-4 top-full w-0.5 h-8 md:h-12"
                  >
                    {index !== ModulesData.length - 1 && (
                      <div
                        style={{ backgroundColor: colors.secondaryLight }}
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full"
                      ></div>
                    )}
                  </div>

                  {/* Horizontal connecting line (desktop only) */}
                  <div
                    style={{ backgroundColor: colors.secondary }}
                    className="hidden lg:block absolute right-full top-1/2 w-8 h-0.5"
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile CTA button */}
          <div className="mt-10 md:mt-16 text-center lg:hidden">
            <button
              style={{
                background: `linear-gradient(to right, ${colors.ctaGradientStart}, ${colors.ctaGradientEnd})`,
              }}
              className="px-6 py-3 text-white font-medium rounded-lg shadow-lg"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>

      {/* Mentor */}
      <section style={{ backgroundColor: colors.secondaryDark }} className="w-full py-10 md:py-16 lg:py-20">
        <div className="container mx-auto max-w-[1140px] px-4">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            {/* Mentor Image */}
            <img src="/member2.jpg" alt="Mentor" className="w-[200px] md:w-[250px] h-auto object-cover" />

            {/* Text Content */}
            <div className="text-white">
              {/* Heading */}
              <h3 className="font-bold text-2xl md:text-[28.48px] mb-4 md:mb-5">Meet Your Mentor</h3>

              {/* Highlight background and name */}
              <div className="relative">
                {/* Background Block */}
                <div
                  style={{ backgroundColor: colors.mentorHighlight }}
                  className="absolute left-0 top-0 w-[102.97px] h-[20px] z-0"
                />
                {/* Name */}
                <span className="relative z-10 text-[#333333] font-normal text-sm md:text-[14.25px]">
                  Lakshit Sethiya
                </span>

                {/* Inline text after name */}
                <span className="ml-1 text-white text-sm md:text-[14.75px]">
                  , the founder of Social Sellar Academy, is a seasoned freelancer and social media marketing expert who has helped thousands of freelancers transform their businesses. Starting from scratch, Lakshit built a thriving freelance career by mastering the art of driving revenue through strategic digital marketing. With his freelancing experience, Lakshit has developed a proven system that enables freelancers to leverage social media to build profitable personal brands, attract high paying clients, and generate sustainable income.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* certificate */}
      <section className="py-10 px-4 bg-white mt-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Before You Ask!
            <span className="block w-32 h-1 bg- mt-2" style={{ backgroundColor: colors.primaryLight }}></span>
          </h2>
          <p className="text-lg mb-6 sm:mb-8">
            Yes, you'll be certified for each course after passing the tests.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center text-white flex-shrink-0"
          style={{ backgroundColor: colors.secondary}}>
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <p className="font-medium text-sm sm:text-base">
            Official certificate from us to verify your achievements and increase your job prospects.
          </p>
            </div>

            <div className="flex gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center text-white flex-shrink-0"
          style={{ backgroundColor: colors.secondary}}>
            <Users className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <p className="font-medium text-sm sm:text-base">
            Easily shareable certificate for your portfolio to post on all platforms available.
          </p>
            </div>

            <div className="flex gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md flex items-center justify-center text-white flex-shrink-0"
          style={{ backgroundColor: colors.secondary}}>
            <Award className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <p className="font-medium text-sm sm:text-base">
            Use your certificate to enhance your professional credibility and stand out among your peers.
          </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div
            className="border-4 rounded-lg p-3 sm:p-4 bg-[#FFF8DC] max-w-xs sm:max-w-md"
            style={{ borderColor: colors.primary }}
          >
            <img
          src="https://media.istockphoto.com/id/1427207629/vector/certificate-of-appreciation-template-gold-and-blue-color-clean-modern-certificate-with-gold.jpg?s=612x612&w=0&k=20&c=ZTN5SJx55fIbCEdynoE5tVb9qX9MIztBp8KYfn1DPq0="
          alt="Certificate"
          className="rounded"
            />
          </div>
        </div>
          </div>
        </div>
      </section>

        {/* Question */}
      <div className="w-full py-12 md:py-16 lg:py-20 mb-16">
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Questions? We've got you covered</h2>
            <div
              style={{ backgroundColor: colors.primaryLight }}
              className="w-[100px] md:w-[200px] h-[3px] rounded mx-auto"
            />
          </div>

          <div className="space-y-3 md:space-y-4">
            {questions.map((item, index) => (
              <div
                key={index}
                style={{ borderColor: colors.primary }}
                className="border-2 rounded-xl overflow-hidden shadow-md"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  style={{ backgroundColor: colors.background }}
                  className="w-full flex items-center justify-between p-3 md:p-5 text-left hover:bg-[#F6F3F7] transition-colors"
                >
                  <span className="font-medium text-gray-800 text-sm md:text-base">{item.question}</span>
                  <ChevronDown
                    style={{ color: colors.primary }}
                    className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 ${
                      openIndex === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  style={{ backgroundColor: colors.background }}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-40 py-3 px-3 md:py-4 md:px-5" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 text-sm md:text-base">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: colors.footerBackground,
          borderColor: colors.footerBorder,
        }}
        className="fixed w-full h-[120px] md:h-[90px] bottom-0 z-50 border-t-2 box-border lg:px-48 flex items-center"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <div style={{ color: colors.footerText }} className="text-xs md:text-[15px] font-medium">
              Hurry Up! Seats are filling in fast
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-1 md:mt-2">
              <span className="text-white text-base md:text-[18.5938px] font-bold line-through">₹74,999</span>
              <span className="text-white text-base md:text-[18.5938px] font-bold">₹49,999</span>
            </div>
          </div>
          <button className="w-full md:w-auto px-4 py-2 md:px-6 md:py-3 bg-white/10 border border-white rounded-[4px] mt-3 md:mt-0">
            <span className="text-white text-sm md:text-[15.125px]">Enroll Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicBundle;