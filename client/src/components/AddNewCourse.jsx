
import { useState } from "react"
import { CalendarIcon, Upload } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import axios from "axios"
import { BASE_URL } from "@/utils/utils"

const AddNewCourse = ({addCourse , setAddCourse})=> {
  const [date, setDate] = useState()
  const [title,setTitle]= useState("");
  const [category,setCategory]= useState("");
  const [price,setPrice]= useState("");
  const [duration,setDuration]= useState("");
  const [bundleName,setBundleName]= useState("");
  const [description,setDescription]= useState("");
  const [video,setVideo]= useState("");
  const [image,setImage]= useState("")
  const [courseMentorName , setCourseMentorName]= useState("vijay")
  const resetForm = ()=>{
    setBundleName("");
    setCategory("");
    setTitle("");
    setDescription("")
    setDuration("")
    setVideo("")
    setImage("")
    setCourseMentorName("")
    setTitle("")
    setDate("")
  }
  const closeAddCourse = ()=>{
    setAddCourse(false)
  }
  const uploadCourse = async(e)=>{
    e.preventDefault();
    // console.log("Course Uploaded")
    try {
       console.log(title)
      const res = await axios.post(`${BASE_URL}/course`,{
         title,category,price,duration,bundleName,description,video, image,courseMentorName
      },{
        withCredentials:true
      });
      resetForm();
    console.log(res);
    } catch (error) {
        console.log(error)

    }
    
  }
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title</Label>
          <Input id="title" value={title} onChange={(e)=>{
            setTitle(e.target.value)
          }} placeholder="Introduction to Web Development" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" value={category} onChange={(e)=>{
            setCategory(e.target.value)} } placeholder="Enter the Category" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input id="price" type="number"  value={price} onChange={(e)=>{
            setPrice(e.target.value)}}placeholder="5000" />
        </div>

        

        <div className="space-y-2">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (weeks)</Label>
          <Input id="duration" value={duration} settype="number" onChange={(e)=>{
            setDuration(e.target.value)
          }} placeholder="8" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bundle">Bundle</Label>
          <Input id="duration" type="text" value={bundleName} onChange={(e)=>{
            setBundleName(e.target.value)}} placeholder="Enter the bundle Name" />
        </div>
      </div>
      <div className="space-y-2">
          <Label htmlFor="bundle">Mentor</Label>
          <Input id="duration" type="text" value={courseMentorName} onChange={(e)=>{
            setCourseMentorName(e.target.value)}}placeholder="Enter the Video Url" />
        </div>
      <div className="space-y-2">
          <Label htmlFor="bundle">Video Url</Label>
          <Input id="duration" type="text" value={video} onChange={(e)=>{
            setVideo(e.target.value)}}placeholder="Enter the Video Url" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image Url</Label>
          <Input id="duration" type="text" value={image} onChange={(e)=>{
            setImage(e.target.value)}}placeholder="Enter the Image Url" />
        </div>
    
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Provide a detailed description of your course..."
          value={description} onChange={(e)=>{
            setDescription(e.target.value)}}
          className="min-h-[120px]"
        />
      </div>

      
      



      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={closeAddCourse} >
          Cancel
        </Button>
        <Button  onClick={uploadCourse}type="submit">Upload Course</Button>
      </div>
    </form>
  )
}

export default AddNewCourse;