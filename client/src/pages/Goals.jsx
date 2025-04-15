import React, { useState } from "react";
import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import emailjs from "@emailjs/browser"
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
  const { id } = useParams();
  const goalId = parseInt(id);
  const [userName, setuserName] = useState("");
  const [subject, setSubject] = useState("");
  const [mobile, setMobile] = useState("");
  const [open, setOpen] = useState(false);
  const formData = {
    userName: userName,
    subject: subject,
    mobile: mobile,
  }
  const goal = goalsData.find((g) => g.id === goalId);

  if (!goal) {
    return <div>Goal not found</div>;
  }

  const handleSubmit = () => {
    // e.preventDefault();

 const serviceID = 'service_qtx181t';
    const templateID = 'template_t3xhl2x';
    const publicKey = 'TnKE0lnl_xvNEe4ds';

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent to your mail!');
      }, (err) => {
        console.error('FAILED...', err);
        alert('Failed to send message.');
      });


    setOpen(false);
    setuserName("");
    setSubject("");
    setMobile("");

  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-gray-50 rounded-3xl p-6 md:p-12 flex flex-col md:flex-row gap-8 relative overflow-hidden">
        <div className="flex flex-col gap-6 md:w-3/5 w-full">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {goal.title}
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
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <div className="flex items-center gap-2 mt-6 text-gray-600">
              <Phone className="h-4 w-4" />
              <span>For enquiries call: 1800 210 2020</span>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 mt-4 rounded-md text-lg font-medium">
                  Talk to Career Expert
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Enter your details to connect with us.</DialogTitle>
                  <DialogDescription>Our expert will reach out shortly.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" value={userName} onChange={(e) => setuserName(e.target.value)} className="col-span-3" placeholder="Enter your name" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">Subject</Label>
                    <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="col-span-3" placeholder="Enter your query" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="mobileNumber" className="text-right">Mobile</Label>
                    <Input id="mobileNumber" value={mobile} onChange={(e) => setMobile(e.target.value)} className="col-span-3" placeholder="Enter your mobile number" />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSubmit} className="bg-red-500 hover:bg-red-600 text-white">
                    Send
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="md:w-2/5 w-full relative">
          <img
            src="/goal_person.jpg"
            alt="Professional"
            className="object-cover object-center w-full h-full max-h-[500px] rounded-lg"
          />
          <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-md text-center">
            <p className="text-sm text-gray-600">No. of promotions</p>
            <p className="text-2xl font-bold">7,174</p>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-lg p-3 shadow-md text-center">
            <p className="text-sm text-gray-600">Avg. salary hike</p>
            <p className="text-2xl font-bold">39%</p>
          </div>
          <div className="absolute bottom-6 right-4 bg-white rounded-lg p-3 shadow-md text-center">
            <p className="text-sm text-gray-600">Career transitions</p>
            <p className="text-2xl font-bold">27,132</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
