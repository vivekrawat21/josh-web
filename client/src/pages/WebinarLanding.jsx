"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, MapPin, User, Users, CheckCircle, Star, ArrowRight, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

const WebinarLanding = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/50 to-white ">
      {/* Hero Section */}
      <section className="relative pt-20 pb-48 md:pb-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-orange-500 -z-10"></div>
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
                Live Webinar • June 15, 2025
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Mastering Digital Marketing Strategies for 2025
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Join industry experts as they reveal the latest trends and actionable insights to boost your marketing
                ROI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-white text-orange-600 hover:bg-gray-100 rounded-xl font-medium shadow-lg shadow-orange-900/20 border border-white/10"
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
                  <span>90 minutes + Q&A</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                  <Calendar className="h-4 w-4" />
                  <span>June 15, 2025</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                  <Users className="h-4 w-4" />
                  <span>1,200+ Registered</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="relative mx-auto lg:mx-0 max-w-xl w-full">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-orange-300 to-orange-600 rounded-2xl blur-md opacity-70"></div>
                <div className="relative bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-1">
                  <img
                    src="./event1.webp"
                    alt="Webinar Preview"
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
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Starting in</p>
                        <p className="text-2xl font-bold text-orange-600">14 Days</p>
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

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-orange-50/50 to-transparent"></div>

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
            <div className="inline-flex items-center justify-center gap-2 bg-orange-100 text-orange-800 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              Why Attend
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">About This Webinar</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              In this exclusive webinar, we'll dive deep into the most effective digital marketing strategies that are
              driving results in 2025. Whether you're a seasoned marketer or just starting out, you'll walk away with
              actionable insights you can implement immediately.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Latest Trends",
                description: "Stay ahead of the curve with insights on emerging marketing channels and technologies.",
              },
              {
                title: "Proven Strategies",
                description: "Learn battle-tested approaches that have generated millions in revenue for top brands.",
              },
              {
                title: "Interactive Q&A",
                description: "Get your specific questions answered by industry experts in real-time.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-8 shadow-xl shadow-orange-100/50 border border-orange-100/50"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                  <CheckCircle className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-20 bg-gradient-to-b from-white to-orange-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center gap-2 bg-orange-100 text-orange-800 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Users className="h-4 w-4" />
              Expert Speakers
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Meet Your Speakers</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Learn from industry leaders who have helped hundreds of businesses transform their marketing strategies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Chief Marketing Officer, TechGrowth",
                bio: "With over 15 years of experience in digital marketing, Sarah has helped scale multiple startups to 8-figure revenue.",
              },
              {
                name: "Michael Chen",
                role: "Digital Strategy Director, MarketPulse",
                bio: "Michael specializes in data-driven marketing strategies that have generated over $50M in revenue for his clients.",
              },
              {
                name: "Aisha Patel",
                role: "Founder, GrowthHackers Academy",
                bio: "Aisha has trained over 10,000 marketers and is known for her practical, results-oriented approach.",
              },
            ].map((speaker, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-orange-100/50 border border-orange-100/50 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="h-64 bg-gradient-to-br from-orange-400 to-orange-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt={speaker.name}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-2xl font-bold text-white mb-1">{speaker.name}</h3>
                      <p className="text-orange-200">{speaker.role}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700">{speaker.bio}</p>
                    <Button
                      variant="ghost"
                      className="mt-4 text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-0 flex items-center gap-1"
                    >
                      View full profile <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <div className="inline-flex items-center justify-center gap-2 bg-orange-100 text-orange-800 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Calendar className="h-4 w-4" />
              Full Schedule
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Webinar Agenda</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              A carefully crafted agenda to ensure you get maximum value from this session.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-[31px] top-0 bottom-0 w-1 bg-gradient-to-b from-orange-600 to-orange-300 rounded-full"></div>

              <div className="space-y-12">
                {[
                  {
                    number: "01",
                    title: "The Changing Landscape of Digital Marketing",
                    description: "An overview of major shifts in consumer behavior and platform algorithms.",
                    duration: "15 minutes",
                    speaker: "Sarah Johnson",
                  },
                  {
                    number: "02",
                    title: "Data-Driven Strategy Development",
                    description:
                      "How to leverage analytics to create marketing strategies that deliver measurable ROI.",
                    duration: "25 minutes",
                    speaker: "Michael Chen",
                  },
                  {
                    number: "03",
                    title: "Implementing Cross-Channel Campaigns",
                    description: "Practical steps to create cohesive marketing campaigns across multiple platforms.",
                    duration: "25 minutes",
                    speaker: "Aisha Patel",
                  },
                  {
                    number: "04",
                    title: "Case Studies & Success Stories",
                    description:
                      "Real-world examples of successful marketing campaigns and the strategies behind them.",
                    duration: "15 minutes",
                    speaker: "Panel Discussion",
                  },
                  {
                    number: "05",
                    title: "Live Q&A Session",
                    description: "Get your specific questions answered by our panel of experts.",
                    duration: "20 minutes",
                    speaker: "All Speakers",
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
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center z-10 shadow-lg shadow-orange-200">
                        <span className="text-xl font-bold text-white">{item.number}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg shadow-orange-100/30 border border-orange-100/50 flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-700 mb-3">{item.description}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <span>{item.duration}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4 text-orange-500" />
                          <span>{item.speaker}</span>
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
      <section id="register" className="py-20 bg-gradient-to-br from-orange-50 to-orange-100/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="p-8 md:p-12 bg-gradient-to-br from-orange-600 to-orange-500 text-white"
                >
                  <h2 className="text-3xl font-bold mb-6">Reserve Your Spot Today</h2>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    Don't miss this opportunity to learn from the best in the industry. Registration is free, but spots
                    are limited.
                  </p>
                  <div className="space-y-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">June 15, 2025</p>
                        <p className="text-sm text-white/80">11:00 AM - 1:00 PM EST</p>
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
                  <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <p className="text-sm">
                      <span className="font-bold">Bonus:</span> All registrants will receive a free copy of our "Digital
                      Marketing Playbook 2025" ebook valued at $99.
                    </p>
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
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name
                          </label>
                          <Input
                            id="company"
                            type="text"
                            placeholder="Enter your company name"
                            className="rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="questions" className="block text-sm font-medium text-gray-700 mb-1">
                            Questions for Speakers (Optional)
                          </label>
                          <Textarea
                            id="questions"
                            placeholder="Any specific questions you'd like addressed during the webinar?"
                            className="rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-6 rounded-xl font-medium text-lg shadow-lg shadow-orange-200"
                          >
                            Register for Webinar
                          </Button>
                        </motion.div>
                        <p className="text-xs text-gray-500 text-center mt-4">
                          By registering, you agree to receive marketing communications from us. We respect your privacy
                          and will never share your information.
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
                        Thank you for registering for our webinar. A confirmation email has been sent to{" "}
                        <span className="font-medium">{email}</span>.
                      </p>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">Add this event to your calendar:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                          >
                            Google Calendar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-orange-200 hover:bg-orange-50 hover:text-orange-600"
                          >
                            Apple Calendar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-orange-200 hover:bg-orange-50 hover:text-orange-600"
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

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center gap-2 bg-orange-100 text-orange-800 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">What Attendees Say</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Hear from professionals who attended our previous webinars and workshops.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Jessica Thompson",
                role: "Marketing Director",
                company: "TechStart Inc.",
                quote:
                  "This webinar completely transformed our approach to digital marketing. The strategies shared were immediately actionable and we saw a 40% increase in conversion rates within just two weeks.",
                rating: 5,
              },
              {
                name: "David Wilson",
                role: "E-commerce Manager",
                company: "Retail Solutions",
                quote:
                  "The insights on cross-channel marketing were eye-opening. Our team implemented the suggested frameworks and our customer acquisition cost dropped by 30% while retention improved.",
                rating: 5,
              },
              {
                name: "Priya Sharma",
                role: "Growth Strategist",
                company: "ScaleUp Ventures",
                quote:
                  "Hands down the most valuable webinar I've attended this year. The Q&A session alone was worth the time investment - practical advice that we could implement right away.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl shadow-orange-100/50 border border-orange-100/50"
              >
                <div className="flex mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center gap-2 bg-orange-100 text-orange-800 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              Common Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">Everything you need to know about the webinar.</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "Is this webinar really free?",
                  answer:
                    "Yes, the webinar is completely free to attend. We believe in sharing knowledge to help businesses grow.",
                },
                {
                  question: "Will the webinar be recorded?",
                  answer:
                    "Yes, all registrants will receive a recording of the webinar within 24 hours after the event.",
                },
                {
                  question: "How can I ask questions during the webinar?",
                  answer:
                    "You can submit questions through the Q&A feature in Zoom during the webinar. Our moderator will select questions for the panel to answer.",
                },
                {
                  question: "What if I can't attend live?",
                  answer:
                    "Register anyway! We'll send you the recording and all materials so you can watch at your convenience.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg shadow-orange-100/30 border border-orange-100/50"
                >
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Marketing Strategy?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join 1,200+ marketing professionals who have already secured their spot for this exclusive webinar.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100 rounded-xl font-medium shadow-lg shadow-orange-900/20 border border-white/10 px-8 py-6 text-lg"
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

export default WebinarLanding