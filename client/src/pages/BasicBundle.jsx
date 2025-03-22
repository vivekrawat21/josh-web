import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { BookOpen, Clock, Video, Languages, ArrowRight, CheckCircle } from "lucide-react"
import { FaPlay } from "react-icons/fa"

const BasicBundle = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-yellow-900">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="https://picsum.photos/40"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full bg-white p-1"
          />
          <h1 className="text-2xl font-bold text-white">JoshGuru</h1>
        </div>
        
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <Badge className="bg-white/10 text-white hover:bg-white/20 mb-4 backdrop-blur-sm">
                Digital Freelancing Bundle
              </Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Freelancing Road To <span className="text-amber-400">₹50k</span> Per Month
              </h2>
              <p className="mt-4 text-amber-100 text-lg max-w-lg">
                Master in-demand skills and start earning as a freelancer with our comprehensive program designed for
                beginners and professionals alike.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 backdrop-blur-sm border-0 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500 p-2 rounded-lg">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">7+</p>
                    <p className="text-amber-200">Courses</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-0 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">10+</p>
                    <p className="text-amber-200">Hours</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-0 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500 p-2 rounded-lg">
                    <Video className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Recorded + Live</p>
                    <p className="text-amber-200">Sessions</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-0 p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500 p-2 rounded-lg">
                    <Languages className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Hindi/English</p>
                    <p className="text-amber-200">Languages</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <p className="text-4xl font-bold text-white">₹4,999</p>
                  <p className="text-lg text-amber-300 line-through absolute -top-4 -right-16">₹13,999</p>
                </div>
                <Badge className="bg-amber-500 text-white ml-4">64% OFF</Badge>
              </div>

              <Button size="lg" className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-white">
                Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <p className="text-amber-200 text-sm">Let's Build Your Future Together With Joshguru</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-white/20 backdrop-blur-sm">
            <div className="bg-white p-2 flex justify-center">
              <Tabs defaultValue="english" className="w-full max-w-xs">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="hindi">Hindi</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="relative aspect-video bg-black">
              <img src="https://picsum.photos/600/400" alt="Course preview" className="object-cover w-full h-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                  <FaPlay className="text-white h-6 w-6" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                <Badge className="bg-amber-500 text-white">AI & Chat GPT</Badge>
                <Badge className="bg-amber-500 text-white">Canva Designing</Badge>
                <Badge className="bg-amber-500 text-white">Copy Writing</Badge>
                <Badge className="bg-amber-500 text-white">Content Writing</Badge>
              </div>
            </div>

            <div className="bg-white p-6">
              <h3 className="font-bold text-lg mb-4">What You'll Learn</h3>

              <div className="grid gap-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <p className="text-gray-700">Master AI tools to automate your freelance workflow</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <p className="text-gray-700">Create professional designs with Canva</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <p className="text-gray-700">Write compelling copy that converts clients</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <p className="text-gray-700">Edit videos for social media marketing</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t">
                <div className="flex gap-4">
                  <img
                    src="https://picsum.photos/40"
                    alt="VN Editor"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <img
                    src="https://picsum.photos/40"
                    alt="Canva"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <img
                    src="https://picsum.photos/40"
                    alt="ChatGPT"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
                <Button variant="outline" className="text-amber-700 border-amber-500 hover:bg-amber-50">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BasicBundle
