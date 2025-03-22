// import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { BookOpen, Clock, Video, Languages, ArrowRight, CheckCircle } from "lucide-react"
import { FaPlay } from "react-icons/fa"

const IntermediateBundle = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="https://picsum.photos/40/40"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full bg-white p-1"
          />
          <h1 className="text-2xl font-bold text-gray-200">JoshGuru</h1>
        </div>
       
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <Badge className="bg-gray-300/10 text-gray-200 hover:bg-gray-400/20 mb-4 backdrop-blur-sm">
                Digital Freelancing Bundle
              </Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-200 leading-tight">
                Freelancing Road To <span className="text-gray-400">₹100k</span> Per Month
              </h2>
              <p className="mt-4 text-gray-100 text-lg max-w-lg">
                Master in-demand skills and start earning as a freelancer with our comprehensive program designed for
                beginners and professionals alike.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-200/10 backdrop-blur-sm border-0 p-4 text-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-400 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-gray-200" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">7+</p>
                    <p className="text-gray-300">Courses</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-200/10 backdrop-blur-sm border-0 p-4 text-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-400 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-gray-200" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">10+</p>
                    <p className="text-gray-300">Hours</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-200/10 backdrop-blur-sm border-0 p-4 text-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-400 p-2 rounded-lg">
                    <Video className="h-5 w-5 text-gray-200" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Recorded + Live</p>
                    <p className="text-gray-300">Sessions</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-200/10 backdrop-blur-sm border-0 p-4 text-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-400 p-2 rounded-lg">
                    <Languages className="h-5 w-5 text-gray-200" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Hindi/English</p>
                    <p className="text-gray-300">Languages</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <p className="text-4xl font-bold text-gray-200">₹8,999</p>
                  <p className="text-lg text-gray-400 line-through absolute -top-4 -right-16">₹18,999</p>
                </div>
                <Badge className="bg-gray-400 text-gray-200 ml-4">64% OFF</Badge>
              </div>

              <Button size="lg" className="w-full md:w-auto bg-gray-400 hover:bg-gray-500 text-gray-200">
                Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-gray-300 text-sm">Let's Build Your Future Together With Joshguru</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-400/20 backdrop-blur-sm">
            <div className="bg-gray-200 p-2 flex justify-center">
              <Tabs defaultValue="english" className="w-full max-w-xs">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="hindi">Hindi</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="relative aspect-video bg-black">
              <img
                src="https://picsum.photos/600/400"
                alt="Course preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gray-300/20 backdrop-blur-sm p-4 rounded-full">
                  <FaPlay className="text-gray-200 h-6 w-6" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                <Badge className="bg-gray-400 text-gray-200">AI & Chat GPT</Badge>
                <Badge className="bg-gray-400 text-gray-200">Canva Designing</Badge>
                <Badge className="bg-gray-400 text-gray-200">Copy Writing</Badge>
                <Badge className="bg-gray-400 text-gray-200">Content Writing</Badge>
              </div>
            </div>

            <div className="bg-gray-200 p-6">
              <h3 className="font-bold text-lg mb-4">What You'll Learn</h3>

              <div className="grid gap-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5" />
                  <p className="text-gray-700">Master AI tools to automate your freelance workflow</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5" />
                  <p className="text-gray-700">Create professional designs with Canva</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5" />
                  <p className="text-gray-700">Write compelling copy that converts clients</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5" />
                  <p className="text-gray-700">Edit videos for social media marketing</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t">
                <div className="flex gap-4">
                  <img
                    src="https://picsum.photos/40/40"
                    alt="VN Editor"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <img
                    src="https://picsum.photos/40/40"
                    alt="Canva"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <img
                    src="https://picsum.photos/40/40"
                    alt="Chat GPT"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>

                <Button variant="ghost" className="text-gray-600">
                  Show All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default IntermediateBundle
