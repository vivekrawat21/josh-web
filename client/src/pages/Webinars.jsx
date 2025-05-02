import React from "react"
import { useState, useEffect } from "react"
import { CalendarDays, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import axios from "axios"
import { BASE_URL } from "../utils/utils";
import { useNavigate } from "react-router-dom"

const Webinars = () => {

    const [registeredWebinars, setRegisteredWebinars] = useState([])
    const [selectedWebinar, setSelectedWebinar] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [webinars, setWebinars] = useState([]);

    const navigate = useNavigate()


    const fetchWebinars = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/webinar/`)
            console.log(response.data.data.webinars)
            setWebinars(response.data.data.webinars)
        } catch (error) {
            console.error("Error fetching webinars:", error)
        }
    }

    useEffect(() => {
        fetchWebinars();
    }, [])

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            timeZone: 'UTC',
            month: 'long',      
            day: 'numeric',     
            year: 'numeric'     
        });
    }

    const handleRegister = (webinarId) => {
        setSelectedWebinar(webinarId)
        setIsModalOpen(true)
        setFormSubmitted(false)
    }

    const handleSubmitRegistration = async(e) => {
        e.preventDefault()
        console.log("Form submitted")
        
        console.log("Selected Webinar ID:", selectedWebinar)
        if (selectedWebinar) {
            console.log("Selected Webinar ID:", selectedWebinar)
            const formData = new FormData(e.target);
            const registerUserData = {
                name: formData.get('name'),
                email: formData.get('email'),
                mobile: formData.get('mobile'),
            };
            console.log("Register User Data:", registerUserData);
            
            const response = await axios.post(`${BASE_URL}/webinar/register/${selectedWebinar}`, registerUserData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            console.log("Hello vishal")

            if (response) {
                setRegisteredWebinars([...registeredWebinars, selectedWebinar])
                setFormSubmitted(true)

                setTimeout(() => {
                    setIsModalOpen(false)
                    setFormSubmitted(false)
                }, 3000)
            }else{
                console.error("Registration failed")
            }
        }
    }

    const isRegistered = (webinarId) => {
        return registeredWebinars.includes(webinarId)
    }

    const handleSingleWebinar = (webinarId) => {
        const webinar = webinars.find(w => w._id === webinarId);
        if (!webinar) return;

        const slug = webinar.categories;
        navigate(`/${slug}/${webinarId}`);
    }

    const currentWebinar = selectedWebinar !== null ? webinars.find((w) => w._id === selectedWebinar) : null
    return (
        <main className="min-h-screen bg-orange-50">
        <div className="container mx-auto py-8 px-4">
            <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-orange-600 mb-2">Upcoming Webinars</h1>
            <p className="text-gray-600 max-w-4xl mx-auto">
                Join our expert-led webinars to enhance your skills and stay updated with the latest industry trends.
            </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {webinars.sort((a, b) => {
                // First sort by date
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                const dateComparison = dateA - dateB;
                
                // If dates are different, return the date comparison
                if (dateComparison !== 0) return dateComparison;
                
                // If dates are the same, sort by time
                return a.time.localeCompare(b.time);
            }).map((webinar) => (
                <Card key={webinar.id} className="border-orange-200 overflow-hidden flex flex-col h-full">
                <div className="relative">
                    <img
                    src={webinar.thumbnail || "/placeholder.svg"}
                    alt={webinar.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    />
                    {webinar.status === "live" && (
                    <div className="absolute top-3 left-3 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        LIVE NOW
                    </div>
                    )}
                </div>

                <CardContent className="flex-grow pt-6 space-y-4">
                    <h2 className="text-xl font-bold text-orange-800">{webinar.title}</h2>
                    <p className="text-gray-600">{webinar.description}</p>

                    <div className="flex items-start gap-2 text-gray-700">
                    <img src={webinar.presenterImage} alt="representativeImage" className="rounded-full object-cover w-8 h-8"/>
                    <div>
                        <span className="font-medium">{webinar.presenterName}</span>
                        <span className="text-sm text-gray-500 block">{webinar.presenterRole}</span>
                    </div>
                    </div>

                    <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                        <CalendarDays className="h-4 w-4 text-orange-500" />
                        <span>{formatDate(webinar.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span>{webinar.time}</span>
                    </div>
                    </div>
                </CardContent>

                <CardFooter className="border-t flex items-center justify-center border-orange-100 bg-orange-50">
                    {isRegistered(webinar._id) ? (
                    <Button disabled className="w-full bg-green-600 hover:bg-green-600 text-white cursor-default">
                        Registered
                    </Button>
                    ) : (
                    <div className="flex flex-row gap-2 w-full">
                        <Button
                            onClick={() => handleRegister(webinar._id)}
                            className="w-full my-auto bg-orange-600 hover:bg-orange-700 text-white"
                        >
                            Register Now
                        </Button>
                        <Button
                            onClick={() => handleSingleWebinar(webinar._id)}
                            className="w-full my-auto bg-black hover:bg-black text-white"
                        >
                            Learn More
                        </Button>
                    </div>
                    )}
                </CardFooter>
                </Card>
            ))}
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle className="text-orange-800">Register for Webinar</DialogTitle>
                {currentWebinar && (
                    <DialogDescription className="text-orange-600">{currentWebinar.title}</DialogDescription>
                )}
                </DialogHeader>

                {formSubmitted ? (
                <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Registration Successful!</h3>
                    <p className="text-gray-600">
                    Thank you for registering. You will receive a confirmation email shortly.
                    </p>
                </div>
                ) : (
                <form onSubmit={handleSubmitRegistration} className="space-y-4">
                    <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        required
                        className="border-orange-200 focus-visible:ring-orange-500"
                    />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        required
                        className="border-orange-200 focus-visible:ring-orange-500"
                    />
                    </div>

                    <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        name="mobile"
                        type="tel"
                        placeholder="Enter your phone number"
                        required
                        className="border-orange-200 focus-visible:ring-orange-500"
                    />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsModalOpen(false)}
                        className="border-orange-200 text-orange-600 hover:bg-orange-100"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">
                        Complete Registration
                    </Button>
                    </div>
                </form>
                )}
            </DialogContent>
            </Dialog>
        </div>
        </main>
    )
}

export default Webinars
