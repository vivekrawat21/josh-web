"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, User, Users, CheckCircle, Star, ArrowRight, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useParams } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../utils/utils"
import CubeLoader from "@/components/CubeLoader"

const WebDevelopmentWebinar = () => {
    const { webinarId } = useParams()
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [webinar, setWebinar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [registeredWebinars, setRegisteredWebinars] = useState([])

    useEffect(() => {
        const fetchWebinar = async () => {
            try {
                console.log(webinarId);
                
                const response = await axios.get(`${BASE_URL}/webinar/${webinarId}`)
                setWebinar(response.data.data.webinar)
                setLoading(false)
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch webinar")
                setLoading(false)
            }
        }

        fetchWebinar()
        setIsVisible(true)
    }, [webinarId])

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            timeZone: 'UTC',
            month: 'long',      
            day: 'numeric',     
            year: 'numeric'     
        });
    }

    const calculateDaysLeft = () => {
        if (!webinar?.date) return 0;
        
        const webinarDate = new Date(webinar.date);
        const currentDate = new Date();
        
        // Calculate difference in milliseconds
        const differenceMs = webinarDate - currentDate;
        
        // Convert milliseconds to days
        return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    };

    const formatWebinarTime = (startTime, duration) => {
        try {
            const [startHour, startMinute] = startTime.split(':').map(Number);
            
            if (isNaN(startHour)) throw new Error('Invalid start time');
            if (isNaN(duration)) throw new Error('Invalid duration');
        
            const startDate = new Date();
            startDate.setHours(startHour, startMinute || 0, 0, 0);
            
            const endDate = new Date(startDate.getTime() + duration * 60000);
            
            const options = { hour: 'numeric', minute: '2-digit', hour12: true };
            
            return `${startDate.toLocaleTimeString('en-US', options)} - ${
                endDate.toLocaleTimeString('en-US', options)
            } EST`;
            } catch (error) {
            console.error('Error formatting time:', error);
            return 'Time not available';
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("Form submitted")
        
        console.log("Selected Webinar ID:", webinarId)
        if (webinarId) {
            console.log("Selected Webinar ID:", webinarId)
            const formData = new FormData(e.target);
            const registerUserData = {
                name: formData.get('name'),
                email: formData.get('email'),
                mobile: formData.get('mobile'),
            };
            console.log("Register User Data:", registerUserData);
            
            const response = await axios.post(`${BASE_URL}/webinar/register/${webinarId}`, registerUserData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            console.log("Hello vishal")

            if (response) {
                setRegisteredWebinars([...registeredWebinars, webinarId])
                setSubmitted(true)

                setTimeout(() => {
                    setSubmitted(false)
                }, 3000)
            }else{
                console.error("Registration failed")
            }
        }
        setSubmitted(true)
    }

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
        },
    }

    if(loading){
        return (
            <CubeLoader/>
        )
    }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-48 md:pb-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-500 -z-10"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-10 -z-10"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={staggerContainer}
          className="container mx-auto px-4"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <motion.div variants={fadeIn} className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white font-medium">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                Live Webinar • <span>{formatDate(webinar.date)}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                {webinar.title}
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Master modern web development technologies and build professional-grade applications from scratch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl font-medium shadow-lg shadow-blue-900/20 border border-white/10"
                  >
                    <a href="#register" className="flex items-center gap-2">
                      Secure Your Spot <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                  <Clock className="h-4 w-4" />
                  <span>{webinar.duration} minutes + Q&A</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(webinar.date)}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                  <Users className="h-4 w-4" />
                  <span>{webinar.webinarUsers.length}+ Registered</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="relative mx-auto lg:mx-0 max-w-xl w-full">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-300 to-blue-600 rounded-2xl blur-md opacity-70"></div>
                <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-1">
                  <img
                    src={webinar.thumbnail || "/placeholder.svg"}
                    alt="Web Development Webinar"
                    width={500}
                    height={400}
                    className="rounded-xl shadow-xl object-cover w-full h-auto"
                  />
                </div>

                <div className="absolute -bottom-6 left-0 sm:-left-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="bg-white rounded-xl shadow-xl p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Starting in</p>
                        <p className="text-2xl font-bold text-blue-600">
                                {calculateDaysLeft() > 0 ? (
                                    `${calculateDaysLeft()} Days`
                                ) : calculateDaysLeft() === 0 ? (
                                    "Today"
                                ) : (
                                    "Started"
                                )}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="absolute -top-6 right-0 sm:-right-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="bg-white rounded-xl shadow-xl p-4"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm font-medium text-gray-600">4.9/5 rating</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-50/50 to-transparent"></div>

        <div className="absolute -bottom-1 left-0 right-0 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="inline-flex items-center justify-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Why Attend
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">About This Master Class</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              This comprehensive master class will take you from the fundamentals to advanced concepts in full stack web
              development. Whether you're a beginner or looking to level up your skills, you'll gain practical knowledge
              you can apply immediately.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Technologies",
                description: "Learn the latest frameworks and tools used by professional developers in the industry.",
              },
              {
                title: "Hands-on Projects",
                description: "Build real-world applications that you can add to your portfolio to impress employers.",
              },
              {
                title: "Career Guidance",
                description:
                  "Get insights on how to land your dream job or freelance opportunities in web development.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-8 shadow-xl shadow-blue-100/50 border border-blue-100/50"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <CheckCircle className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-20 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Users className="h-4 w-4" />
              Expert Instructors
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Meet Your Instructors</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Learn from industry professionals with years of experience in web development and teaching.
            </p>
          </motion.div>

          <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group items-center w-[30%]"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-blue-100/50 border border-blue-100/50 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <img
                      src={webinar.presenterImage}
                      alt="presenter Image"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-2xl font-bold text-white mb-1">{webinar.presenterName}</h3>
                      <p className="text-blue-200">{webinar.presenterRole}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700">{webinar.presenterName + " "} has 12+ years of experience building web applications for Fortune 500 companies and has mentored over 500 developers.</p>
                  </div>
                </div>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Agenda Section */}
      <section id="agenda" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Calendar className="h-4 w-4" />
              Full Schedule
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Master Class Agenda</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              A comprehensive curriculum designed to take you from basics to advanced concepts in web development.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-[31px] top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-blue-300 rounded-full"></div>

              <div className="space-y-12">
                {[
                  {
                    number: "01",
                    title: webinar.title,
                    description: "Master HTML5, CSS3, JavaScript ES6+, and responsive design principles.",
                    duration: "30 minutes",
                  },
                  {
                    number: "02",
                    title: "Frontend Frameworks",
                    description: "Deep dive into React.js and Next.js for building dynamic user interfaces.",
                    duration: "30 minutes",
                  },
                  {
                    number: "03",
                    title: "Backend Development",
                    description: "Learn Node.js, Express, and RESTful API design patterns.",
                    duration: "30 minutes",
                  },
                  {
                    number: "04",
                    title: "Databases & Authentication",
                    description: "Working with SQL, NoSQL databases, and implementing secure authentication.",
                    duration: "20 minutes",
                  },
                  {
                    number: "05",
                    title: "Full Stack Integration",
                    description: "Connecting frontend and backend to build complete applications.",
                    duration: "20 minutes"
                  },
                  {
                    number: "06",
                    title: "Live Q&A Session",
                    description: "Get your specific questions answered by our expert instructors.",
                    duration: "20 minutes",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center z-10 shadow-lg shadow-blue-200">
                        <span className="text-xl font-bold text-white">{item.number}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-blue-100/30 border border-blue-100/50 flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-700 mb-3">{item.description}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-blue-500" />
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="p-8 md:p-12 bg-gradient-to-br from-blue-600 to-blue-500 text-white"
                >
                  <h2 className="text-3xl font-bold mb-6">Reserve Your Spot Today</h2>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    Don't miss this opportunity to master full stack web development. Registration is free, but spots
                    are limited.
                  </p>
                  <div className="space-y-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{formatDate(webinar.date)}</p>
                        <p className="text-sm text-white/80">{formatWebinarTime(webinar.time, webinar.duration)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Online Event</p>
                        <p className="text-sm text-white/80">Zoom Webinar</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Limited Capacity</p>
                        <p className="text-sm text-white/80">Only 2,000 spots available</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="p-8 md:p-12"
                >
                  {!submitted ? (
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-gray-900">Register Now</h3>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                            WhatsApp Number
                          </label>
                          <Input
                            id="phone"
                            name="mobile"
                            type="tel"
                            placeholder="Enter your phone number"
                            required
                            className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-6 rounded-xl font-medium text-lg shadow-lg shadow-blue-200"
                          >
                            Register for Master Class
                          </Button>
                        </motion.div>
                        <p className="text-xs text-gray-500 text-center mt-4">
                          By registering, you agree to receive educational communications from us. We respect your
                          privacy and will never share your information.
                        </p>
                      </form>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-8"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h3>
                      <p className="text-gray-700 mb-8">
                        Thank you for registering for our master class. A confirmation email has been sent to{" "}
                        <span className="font-medium">{email}</span>.
                      </p>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">Add this event to your calendar:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          >
                            Google Calendar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          >
                            Apple Calendar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          >
                            Outlook
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Master Full Stack Web Development?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join 1,500+ developers who have already secured their spot for this exclusive master class.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 rounded-xl font-medium shadow-lg shadow-blue-900/20 border border-white/10 px-8 py-6 text-lg"
                >
                  <a href="#register" className="flex items-center gap-2">
                    Register Now <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WebDevelopmentWebinar
