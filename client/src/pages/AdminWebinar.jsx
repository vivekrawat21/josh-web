
import { useState, useRef, useEffect } from "react"
import { Calendar, Clock, Users, Edit, Trash, Radio, Eye, ArrowLeft, Search, Download, Send, Plus, Mail, ImageIcon, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "../hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import axios from "axios"
import { BASE_URL } from "../utils/utils";
import Loader from "../components/Loader"

// Status badge colors
const statusColors = {
  scheduled: "bg-blue-100 text-blue-800",
  live: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
}

// Status display names
const statusNames = {
  scheduled: "Scheduled",
  live: "Live",
  completed: "Completed",
  cancelled: "Cancelled",
}

export default function AdminDashboard() {
  const [webinars, setWebinars] = useState([])
  const [selectedWebinar, setSelectedWebinar] = useState(null)
  const [isViewingDetails, setIsViewingDetails] = useState(false)
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const [isAddWebinarModalOpen, setIsAddWebinarModalOpen] = useState(false)
  const [isEditWebinarModalOpen, setIsEditWebinarModalOpen] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [emailSubject, setEmailSubject] = useState("")
  const [emailBody, setEmailBody] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([])
  const [selectAllUsers, setSelectAllUsers] = useState(false)
  const fileInputRefThumbnail = useRef(null);
  const fileInputRefPresenter = useRef(null);

  const [isLoading, setIsLoading] = useState(false)


  // Form state for rescheduling
  const [rescheduleDate, setRescheduleDate] = useState("")
  const [rescheduleTime, setRescheduleTime] = useState("")
  const [rescheduleDuration, setRescheduleDuration] = useState("")

  // Add these form states for new webinar
  const [newWebinar, setNewWebinar] = useState({
    title: "",
    description: "",
    categories: '',
    presenterName: "",
    presenterRole: "",
    date: "",
    time: "",
    duration: "",
    thumbnail: null,
    thumbnailPreview: "/placeholder.svg?height=200&width=350",
    presenterImage: null,
    presenterImagePreview: "/placeholder.svg?height=400&width=600",
  })

  const fetchWebinars = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${BASE_URL}/webinar/`)
      console.log(response.data.data.webinars)
      setWebinars(response.data.data.webinars)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching webinars:", error)
    }
  }

  useEffect(() => {
    fetchWebinars();
  }, [])

  // Handle setting a webinar to live
  const handleSetLive = async (webinarId) => {
    try {
      setIsLoading(true);
      
      // API call to update status
      const response = await axios.put(
        `${BASE_URL}/webinar/status/${webinarId}`,
        { status: "live" },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      // Update state with new status
      setWebinars(webinars.map(webinar => 
        webinar._id === webinarId ? { ...webinar, status: "live" } : webinar
      ));
  
      toast({
        title: "Status Updated",
        description: `Webinar status changed to ${response.data.data.webinar.status}`,
      });
    } catch (error) {
      console.error("Status change error:", error);
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Handle cancelling a webinar
  const handleCancel = async(webinarId) => {
    try {
      setIsLoading(true);
      
      // API call to update status
      const response = await axios.put(
        `${BASE_URL}/webinar/status/${webinarId}`,
        { status: "cancelled" },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      // Update state with new status
      setWebinars(webinars.map(webinar => 
        webinar._id === webinarId ? { ...webinar, status: "cancelled" } : webinar
      ));
  
      toast({
        title: "Status Updated",
        description: `Webinar status changed to ${response.data.data.webinar.status}`,
      });
    } catch (error) {
      console.error("Status change error:", error);
      toast({
        title: "Update Failed",
        description: error.response?.data?.message || "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async (webinarId) => {
    try {
      setIsLoading(true);
      
      // API call to delete webinar
      const response = await axios.delete(
        `${BASE_URL}/webinar/${webinarId}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      // Handle successful deletion
      if (response.status === 200) {
        // Update UI state or show success message
        setWebinars(prev => prev.filter(webinar => webinar._id !== webinarId));
        toast.success('Webinar deleted successfully');
      }
      
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete webinar');
    } finally {
      setIsLoading(false);
    }
  };

  // Open reschedule modal
  const handleOpenReschedule = (webinar) => {
    setSelectedWebinar(webinar)
    setRescheduleDate(webinar.date.split('T')[0])
    setRescheduleTime(webinar.time)
    setRescheduleDuration(webinar.duration)
    setIsRescheduleModalOpen(true)
  }

  // Handle rescheduling a webinar
  const handleReschedule = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('date', rescheduleDate);
      formData.append('time', rescheduleTime);
      formData.append('duration', rescheduleDuration);
      
      // Call your API endpoint
      const response = await axios.put(
        `${BASE_URL}/webinar/reschedule/${selectedWebinar._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      console.log(response.data.data.webinar)
      // Update state with API response
      setWebinars(webinars.map(webinar =>
        webinar._id === selectedWebinar._id ? response.data.data.webinar : webinar
      ));
  
      setIsRescheduleModalOpen(false);
      toast({
        title: "Rescheduled Successfully",
        description: "Webinar has been rescheduled successfully",
      });
    } catch (error) {
      console.error("Reschedule error:", error);
      toast({
        title: "Reschedule Failed",
        description: error.response?.data?.message || "Failed to reschedule webinar",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // View webinar details and registered users
  const handleViewDetails = (webinar) => {
    setSelectedWebinar(webinar)
    setIsViewingDetails(true)
  }

  // Go back to webinar list
  const handleBackToList = () => {
    setIsViewingDetails(false)
    setSelectedWebinar(null)
  }

  // Filter webinars based on search term and status
  const filteredWebinars = webinars.filter((webinar) => {
    const matchesSearch =
      webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webinar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      webinar.presenterName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || webinar.status === statusFilter

    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    // First sort by date
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    const dateComparison = dateA - dateB;
    
    // If dates are different, return the date comparison
    if (dateComparison !== 0) return dateComparison;
    
    // If dates are the same, sort by time
    return a.time.localeCompare(b.time);
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Format time for display
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours, 10))
    date.setMinutes(Number.parseInt(minutes, 10))

    return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
  }

  // Handle thumbnail URL change
  const handleThumbnailUrlChange = (e) => {
    const url = e.target.value
    setNewWebinar({
      ...newWebinar,
      thumbnailUrl: url,
      thumbnail: url || "/placeholder.svg?height=200&width=350",
    })
  }

  // Handle file input change
  const handleFileInputChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setNewWebinar(prev => ({
        ...prev,
        [field]: file, // Store File for upload
        [`${field}Preview`]: previewUrl // Store URL for preview
      }));
    }
  };
  
  // Separate click handlers for each input
  const handleThumbnailUploadClick = () => {
    fileInputRefThumbnail.current.click();
  };
  
  const handlePresenterUploadClick = () => {
    fileInputRefPresenter.current.click();
  };

  // Add this function to handle adding a new webinar
  const handleAddWebinar = async() => {

    setIsLoading(true);

    console.log("Starting the process of sending data from frontend to backend");
    
    // Create FormData
    const formData = new FormData();
    
    // Append regular fields
    formData.append('title', newWebinar.title);
    formData.append('description', newWebinar.description);
    formData.append('categories', newWebinar.categories);
    formData.append('presenterName', newWebinar.presenterName);
    formData.append('presenterRole', newWebinar.presenterRole);
    formData.append('date', newWebinar.date);
    formData.append('time', newWebinar.time);
    formData.append('duration', newWebinar.duration);

    // Append files from refs
    if (newWebinar.thumbnail instanceof File) {
      formData.append('thumbnail', newWebinar.thumbnail);
    }
    if (newWebinar.presenterImage instanceof File) {
      formData.append('presenterImage', newWebinar.presenterImage);
    }

    console.log("Formdata is ready", formData);
    

    // Send to backend
    const response = await axios.post(`${BASE_URL}/webinar/create`, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log("responed send successfull", response.data.data.webinar);
    

    setWebinars([...webinars, response.data.data.webinar])
    setIsAddWebinarModalOpen(false)
    setIsLoading(false)
    toast({
      title: "Webinar Created",
      description: "Your new webinar has been successfully created.",
    })

    // Reset form
    setNewWebinar({
      title: "",
      description: "",
      categories: "",
      presenterName: "",
      presenterRole: "",
      date: "",
      time: "",
      duration: "",
      thumbnail: null,
      thumbnailPreview: "/placeholder.svg?height=200&width=350",
      presenterImage: null,
      presenterImagePreview: "/placeholder.svg?height=400&width=600",
    })
  }

  // Add this function to handle editing a webinar
  const handleEditWebinar = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      // Append all fields
      formData.append('title', newWebinar.title);
      formData.append('description', newWebinar.description);
      formData.append('categories', newWebinar.categories);
      formData.append('presenterName', newWebinar.presenterName);
      formData.append('presenterRole', newWebinar.presenterRole);
      formData.append('date', newWebinar.date);
      formData.append('time', newWebinar.time);
      formData.append('duration', newWebinar.duration);
  
      // Handle file uploads if they exist
      if (newWebinar.thumbnail instanceof File) {
        formData.append('thumbnail', newWebinar.thumbnail);
      }
      if (newWebinar.presenterImage instanceof File) {
        formData.append('presenterImage', newWebinar.presenterImage);
      }
  
      // Make API call
      const response = await axios.put(
        `${BASE_URL}/webinar/${selectedWebinar._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      // Update state with response data
      setWebinars(webinars.map(webinar =>
        webinar._id === selectedWebinar._id ? response.data.data.webinar : webinar
      ));
  
      setIsEditWebinarModalOpen(false);
      toast({
        title: "Webinar Updated",
        description: "The webinar details have been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating webinar:", error);
      toast({
        title: "Error",
        description: "Failed to update webinar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add this function to open edit modal
  const handleOpenEditModal = (webinar) => {
    setSelectedWebinar(webinar)
    setNewWebinar({
      title: webinar.title,
      description: webinar.description,
      categories: webinar.categories,
      presenterName: webinar.presenterName,
      presenterRole: webinar.presenterRole,
      date: webinar.date.split('T')[0],
      time: webinar.time,
      duration: webinar.duration,
      image: webinar.image,
      thumbnail: webinar.thumbnail,
      presenterImage: webinar.presenterImage,
    })
    setIsEditWebinarModalOpen(true)
  }

  // Add this function to open email modal
  const handleOpenEmailModal = (webinar) => {
    setSelectedWebinar(webinar)
    setSelectedUsers([])
    setSelectAllUsers(false)
    setEmailSubject("")
    setEmailBody("")
    setIsEmailModalOpen(true)
  }

  // Add this function to handle sending emails
  const handleSendEmail = () => {
    const recipients = selectAllUsers
      ? selectedWebinar.registeredUsers
      : selectedWebinar.registeredUsers.filter((user) => selectedUsers.includes(user.id))

    // In a real app, you would send the email here
    console.log("Sending email to:", recipients)
    console.log("Subject:", emailSubject)
    console.log("Body:", emailBody)

    setIsEmailModalOpen(false)
    toast({
      title: "Email Sent",
      description: `Email has been sent to ${recipients.length} recipient(s).`,
    })
  }

  // Add this function to handle selecting all users
  const handleSelectAllUsers = (checked) => {
    setSelectAllUsers(checked)
    if (checked) {
      setSelectedUsers(selectedWebinar.registeredUsers.map((user) => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  // Add this function to handle selecting individual users
  const handleSelectUser = (userId, checked) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId])
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    }
  }

  useEffect(() => {
    return () => {
      // Cleanup object URLs when component unmounts
      if (newWebinar.thumbnailPreview?.startsWith('blob:')) {
        URL.revokeObjectURL(newWebinar.thumbnailPreview);
      }
      if (newWebinar.presenterImagePreview?.startsWith('blob:')) {
        URL.revokeObjectURL(newWebinar.presenterImagePreview);
      }
    };
  }, [newWebinar.thumbnailPreview, newWebinar.presenterImagePreview]);

  return (
    <main className="min-h-screen bg-orange-50">
      <div className="container mx-auto py-8 px-4">
        {!isViewingDetails ? (
          <>
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-orange-800">Webinar Management Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your webinars and view registered participants</p>
            </header>

            <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center justify-between">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search webinars..."
                  className="pl-8 border-orange-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px] border-orange-200">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => setIsAddWebinarModalOpen(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white ml-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Webinar
                </Button>
              </div>
            </div>

            <Tabs defaultValue="grid" className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>

              <TabsContent value="grid">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWebinars.map((webinar) => (
                    <Card key={webinar.id} className="border-orange-200 overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={webinar.thumbnail || "/placeholder.svg"}
                          alt={webinar.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className={statusColors[webinar.status]}>{statusNames[webinar.status]}</Badge>
                        </div>
                        <div className="absolute top-2 right-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewDetails(webinar)}
                            className="h-8 w-8 bg-white/80 hover:bg-white text-gray-700"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-orange-800">{webinar.title}</CardTitle>
                        <CardDescription className="text-orange-600 line-clamp-2">
                          {webinar.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="flex flex-col items-start gap-2 text-gray-700">
                          <span className="font-medium">{webinar.presenterName}</span>
                          <span className="text-sm text-gray-500">({webinar.presenterRole})</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4 text-orange-500" />
                          <span>{formatDate(webinar.date)}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <span>
                            {webinar.time} ({webinar.duration} min)
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="h-4 w-4 text-orange-500" />
                          <span>{webinar.webinarUsers.length} registered users</span>
                        </div>
                      </CardContent>

                      <CardFooter className="border-t border-orange-100 bg-orange-50 flex flex-wrap gap-2">
                        {webinar.status === "scheduled" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleSetLive(webinar._id)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Radio className="h-3.5 w-3.5 mr-1" />
                              Set Live
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenReschedule(webinar)}
                              className="border-orange-200 text-orange-600"
                            >
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              Reschedule
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCancel(webinar._id)}
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <Trash className="h-3.5 w-3.5 mr-1" />
                              Cancel
                            </Button>
                          </>
                        )}
                        {webinar.status === "live" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancel(webinar._id)}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash className="h-3.5 w-3.5 mr-1" />
                            Cancel
                          </Button>
                        )}
                        {(webinar.status === "completed" || webinar.status === "cancelled") && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenReschedule(webinar)}
                            className="border-orange-200 text-orange-600"
                          >
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Reschedule
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenEditModal(webinar)}
                          className="border-orange-200 text-orange-600"
                        >
                          <Edit className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenEmailModal(webinar)}
                          className="border-orange-200 text-orange-600"
                        >
                          <Mail className="h-3.5 w-3.5 mr-1" />
                          Email
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(webinar._id)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash className="h-3.5 w-3.5 mr-1" />
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="table">
                <div className="rounded-md border border-orange-200 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-orange-50">
                      <TableRow>
                        <TableHead className="w-[60px]">Thumbnail</TableHead>
                        <TableHead className="w-[250px]">Webinar</TableHead>
                        <TableHead>Presenter</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Registrations</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredWebinars.map((webinar) => (
                        <TableRow key={webinar.id}>
                          <TableCell>
                            <img
                              src={webinar.thumbnail || "/placeholder.svg"}
                              alt={webinar.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{webinar.title}</TableCell>
                          <TableCell>{webinar.presenterName}</TableCell>
                          <TableCell>
                            {formatDate(webinar.date)}
                            <br />
                            <span className="text-sm text-gray-500">{webinar.time}</span>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[webinar.status]}>{statusNames[webinar.status]}</Badge>
                          </TableCell>
                          <TableCell>{webinar.webinarUsers.length}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleViewDetails(webinar)}
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>

                              {webinar.status === "scheduled" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleSetLive(webinar._id)}
                                    className="h-8 w-8 p-0 text-green-600"
                                  >
                                    <Radio className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleOpenReschedule(webinar)}
                                    className="h-8 w-8 p-0 text-orange-600"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleCancel(webinar._id)}
                                    className="h-8 w-8 p-0 text-red-600"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </>
                              )}

                              {(webinar.status === "completed" || webinar.status === "cancelled") && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleOpenReschedule(webinar)}
                                  className="h-8 w-8 p-0 text-orange-600"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}

                              {webinar.status === "live" && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleCancel(webinar._id)}
                                  className="h-8 w-8 p-0 text-red-600"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleOpenEditModal(webinar)}
                                className="h-8 w-8 p-0 text-orange-600"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleOpenEmailModal(webinar)}
                                className="h-8 w-8 p-0 text-orange-600"
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          // Webinar details view with registered users
          <>
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={handleBackToList}
                className="text-orange-600 hover:text-orange-700 hover:bg-orange-100 -ml-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Webinars
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-orange-200 md:col-span-2">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={selectedWebinar.thumbnail || "/placeholder.svg"}
                    alt={selectedWebinar.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={statusColors[selectedWebinar.status]}>
                      {statusNames[selectedWebinar.status]}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-800">{selectedWebinar.title}</CardTitle>
                  <CardDescription className="text-orange-600">{selectedWebinar.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="font-medium">{selectedWebinar.presenterName}</span>
                    <span className="text-sm text-gray-500">({selectedWebinar.presenterRole})</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <span>{formatDate(selectedWebinar.date)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>
                      {formatTime(selectedWebinar.time)} ({selectedWebinar.duration} min)
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="border-t border-orange-100 bg-orange-50 flex flex-wrap gap-2">
                  {selectedWebinar.status === "scheduled" && (
                    <>
                      <Button
                        onClick={() => handleSetLive(selectedWebinar._id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Radio className="h-4 w-4 mr-2" />
                        Set Live
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleOpenReschedule(selectedWebinar)}
                        className="border-orange-200 text-orange-600"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Reschedule
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleCancel(selectedWebinar._id)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  )}
                  {selectedWebinar.status === "live" && (
                    <Button
                      variant="outline"
                      onClick={() => handleCancel(selectedWebinar._id)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  )}
                  {(selectedWebinar.status === "completed" || selectedWebinar.status === "cancelled") && (
                    <Button
                      variant="outline"
                      onClick={() => handleOpenReschedule(selectedWebinar)}
                      className="border-orange-200 text-orange-600"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Reschedule
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => handleOpenEditModal(selectedWebinar)}
                    className="border-orange-200 text-orange-600"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Webinar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleOpenEmailModal(selectedWebinar)}
                    className="border-orange-200 text-orange-600"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email Attendees
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-orange-200 ">
                <CardHeader>
                  <CardTitle className="text-orange-800">Registration Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold text-orange-600">{selectedWebinar.webinarUsers.length}</div>
                    <div className="text-sm text-gray-500 mt-1">Total Registrations</div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-orange-100 bg-orange-50">
                  <Button variant="outline" className="w-full border-orange-200 text-orange-600">
                    <Download className="h-4 w-4 mr-2" />
                    Export Attendee List
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card className="border-orange-200 mb-6">
              <CardHeader>
                <CardTitle className="text-orange-800">Registered Users</CardTitle>
                <CardDescription>List of all users registered for this webinar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full max-w-sm mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Search users..." className="pl-8 border-orange-200" />
                </div>

                <div className="rounded-md border border-orange-200 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-orange-50">
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Registration Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedWebinar.webinarUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.mobile}</TableCell>
                          <TableCell>{formatDate(user.registeredAt)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Reschedule Modal */}
      <Dialog open={isRescheduleModalOpen} onOpenChange={setIsRescheduleModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reschedule Webinar</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reschedule-date">New Date</Label>
              <Input
                id="reschedule-date"
                type="date"
                value={rescheduleDate}
                onChange={(e) => setRescheduleDate(e.target.value)}
                className="border-orange-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reschedule-time">New Time</Label>
              <Input
                id="reschedule-time"
                type="time"
                value={rescheduleTime}
                onChange={(e) => setRescheduleTime(e.target.value)}
                className="border-orange-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reschedule-duration">New Duration (minutes)</Label>
              <Input
                id="reschedule-duration"
                type="number"
                value={rescheduleDuration}
                onChange={(e) => setRescheduleDuration(Number.parseInt(e.target.value))}
                className="border-orange-200"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRescheduleModalOpen(false)}
              className="border-orange-200 text-orange-600"
            >
              Cancel
            </Button>
            <Button onClick={handleReschedule} className="bg-orange-600 hover:bg-orange-700 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Webinar Modal */}
      <Dialog open={isAddWebinarModalOpen} onOpenChange={setIsAddWebinarModalOpen}>
        <DialogContent className="sm:max-w-lg h-[90%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Webinar</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Webinar Title</Label>
              <Input
                id="title"
                value={newWebinar.title}
                onChange={(e) => setNewWebinar({ ...newWebinar, title: e.target.value })}
                className="border-orange-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newWebinar.description}
                onChange={(e) => setNewWebinar({ ...newWebinar, description: e.target.value })}
                className="border-orange-200 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categories">Webinar categories</Label>
              <Select
                value={newWebinar.categories}
                onValueChange={(value) => setNewWebinar({ ...newWebinar, categories: value })}
              >
                <SelectTrigger className="border-orange-200">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="digital-marketing">
                      Digital Marketing 
                    </SelectItem>
                    <SelectItem value="full-stack">
                      Full Stack
                    </SelectItem>
                    <SelectItem value="microsoft-dynamic">
                      Microsoft Dynamic
                    </SelectItem>
                    <SelectItem value="odoo-erp">
                      Odoo ERP
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="presenterName">Presenter Name</Label>
                <Input
                  id="presenterName"
                  value={newWebinar.presenterName}
                  onChange={(e) => setNewWebinar({ ...newWebinar, presenterName: e.target.value })}
                  className="border-orange-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="presenterRole">Presenter Role</Label>
                <Input
                  id="presenterRole"
                  value={newWebinar.presenterRole}
                  onChange={(e) => setNewWebinar({ ...newWebinar, presenterRole: e.target.value })}
                  className="border-orange-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newWebinar.date}
                  onChange={(e) => setNewWebinar({ ...newWebinar, date: e.target.value })}
                  className="border-orange-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newWebinar.time}
                  onChange={(e) => setNewWebinar({ ...newWebinar, time: e.target.value })}
                  className="border-orange-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={newWebinar.duration}
                onChange={(e) => setNewWebinar({ ...newWebinar, duration: Number.parseInt(e.target.value) })}
                className="border-orange-200"
              />
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Webinar Thumbnail</Label>
                  <div className="border border-dashed border-orange-300 rounded-md p-4 flex flex-col items-center justify-center bg-orange-50/50 h-40">
                    {newWebinar.thumbnail && (
                      <div className="relative w-full h-24 mb-2">
                        <img
                          src={newWebinar.thumbnailPreview || "/placeholder.svg"}
                          alt="Thumbnail preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRefThumbnail}
                      onChange={(e) => handleFileInputChange(e, 'thumbnail')}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleThumbnailUploadClick}
                      className="mt-2 border-orange-200 text-orange-600"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Presenter Image</Label>
                  <div className="border border-dashed border-orange-300 rounded-md p-4 flex flex-col items-center justify-center bg-orange-50/50 h-40">
                    {newWebinar.presenterImage && (
                      <div className="relative w-full h-24 mb-2">
                        <img
                          src={newWebinar.presenterImagePreview|| "/placeholder.svg"}
                          alt="Presenter Image preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRefPresenter}
                      onChange={(e) => handleFileInputChange(e, 'presenterImage')}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePresenterUploadClick}
                      className="mt-2 border-orange-200 text-orange-600"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddWebinarModalOpen(false)}
              className="border-orange-200 text-orange-600"
            >
              Cancel
            </Button>
            <Button onClick={handleAddWebinar} className="bg-orange-600 hover:bg-orange-700 text-white">
              Create Webinar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Webinar Modal */}
      <Dialog open={isEditWebinarModalOpen} onOpenChange={setIsEditWebinarModalOpen}>
        <DialogContent className="sm:max-w-lg h-[90%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Webinar</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Webinar Title</Label>
              <Input
                id="edit-title"
                value={newWebinar.title}
                onChange={(e) => setNewWebinar({ ...newWebinar, title: e.target.value })}
                className="border-orange-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={newWebinar.description}
                onChange={(e) => setNewWebinar({ ...newWebinar, description: e.target.value })}
                className="border-orange-200 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categories">Webinar categories</Label>
              <Select
                value={newWebinar.categories}
                onValueChange={(value) => setNewWebinar({ ...newWebinar, categories: value })}
              >
                <SelectTrigger className="border-orange-200">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="digital-marketing">
                      Digital Marketing 
                    </SelectItem>
                    <SelectItem value="full-stack">
                      Full Stack
                    </SelectItem>
                    <SelectItem value="microsoft-dynamic">
                      Microsoft Dynamic
                    </SelectItem>
                    <SelectItem value="odoo-erp">
                      Odoo ERP
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-presenterName">Presenter Name</Label>
                <Input
                  id="edit-presenterName"
                  value={newWebinar.presenterName}
                  onChange={(e) => setNewWebinar({ ...newWebinar, presenterName: e.target.value })}
                  className="border-orange-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-presenterRole">Presenter Role</Label>
                <Input
                  id="edit-presenterRole"
                  value={newWebinar.presenterRole}
                  onChange={(e) => setNewWebinar({ ...newWebinar, presenterRole: e.target.value })}
                  className="border-orange-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={newWebinar.date}
                  onChange={(e) => setNewWebinar({ ...newWebinar, date: e.target.value })}
                  className="border-orange-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-time">Time</Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={newWebinar.time}
                  onChange={(e) => setNewWebinar({ ...newWebinar, time: e.target.value })}
                  className="border-orange-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-duration">Duration (minutes)</Label>
              <Input
                id="edit-duration"
                type="number"
                value={newWebinar.duration}
                onChange={(e) => setNewWebinar({ ...newWebinar, duration: Number.parseInt(e.target.value) })}
                className="border-orange-200"
              />
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Webinar Thumbnail</Label>
                  <div className="border border-dashed border-orange-300 rounded-md p-4 flex flex-col items-center justify-center bg-orange-50/50 h-40">
                    {newWebinar.thumbnail && (
                      <div className="relative w-full h-24 mb-2">
                        <img
                          src={newWebinar.thumbnail || "/placeholder.svg"}
                          alt="Thumbnail preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRefThumbnail}
                      onChange={(e) => handleFileInputChange(e, 'thumbnail')}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleThumbnailUploadClick}
                      className="mt-2 border-orange-200 text-orange-600"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Presenter Image</Label>
                  <div className="border border-dashed border-orange-300 rounded-md p-4 flex flex-col items-center justify-center bg-orange-50/50 h-40">
                    {newWebinar.presenterImage && (
                      <div className="relative w-full h-24 mb-2">
                        <img
                          src={newWebinar.presenterImage|| "/placeholder.svg"}
                          alt="Presenter Image preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRefPresenter}
                      onChange={(e) => handleFileInputChange(e, 'presenterImage')}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePresenterUploadClick}
                      className="mt-2 border-orange-200 text-orange-600"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditWebinarModalOpen(false)}
              className="border-orange-200 text-orange-600"
            >
              Cancel
            </Button>
            <Button onClick={handleEditWebinar} className="bg-orange-600 hover:bg-orange-700 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Modal */}
      <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Send Email to Attendees</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email-subject">Subject</Label>
              <Input
                id="email-subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="border-orange-200"
                placeholder="Enter email subject"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-body">Message</Label>
              <Textarea
                id="email-body"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="border-orange-200 min-h-[150px]"
                placeholder="Enter your message here..."
              />
            </div>

            <div className="space-y-2">
              <Label>Recipients</Label>
              <div className="border border-orange-200 rounded-md p-2 max-h-[200px] overflow-y-auto">
                <div className="flex items-center space-x-2 p-2 border-b border-orange-100">
                  <Checkbox id="select-all" checked={selectAllUsers} onCheckedChange={handleSelectAllUsers} />
                  <Label htmlFor="select-all" className="font-medium">
                    Select All Users
                  </Label>
                </div>

                {selectedWebinar?.webinarUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center space-x-2 p-2 border-b border-orange-100 last:border-0"
                  >
                    <Checkbox
                      id={`user-${user.id}`}
                      checked={selectedUsers.includes(user.id) || selectAllUsers}
                      onCheckedChange={(checked) => handleSelectUser(user.id, checked)}
                      disabled={selectAllUsers}
                    />
                    <Label htmlFor={`user-${user.id}`} className="flex flex-col">
                      <span>{user.name}</span>
                      <span className="text-sm text-gray-500">{user.email}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEmailModalOpen(false)}
              className="border-orange-200 text-orange-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendEmail}
              className="bg-orange-600 hover:bg-orange-700 text-white"
              disabled={!emailSubject || !emailBody || (!selectAllUsers && selectedUsers.length === 0)}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Toaster component */}
      <Toaster />
    </main>
  )
}
