import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, Save, Loader2, AlertCircle, Upload, X, Eye, Play, ImageIcon } from "lucide-react"
import { toast } from "../hooks/use-toast"

const DigitalBundleForm = ({ theme, data, bundleId = null, onSaveSuccess, apiService }) => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState({})
  const [previewModal, setPreviewModal] = useState({ open: false, url: "", type: "" })
  const fileInputRefs = useRef({})

  // Store actual files separately from form data
  const [fileStorage, setFileStorage] = useState({})

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: {
      coursesIncluded: 0,
      accessType: "lifetime",
      availableLanguages: "",
    },
    video: [{ title: "", videoFile: "" }],
    bonusSkills: {
      title: "",
      images: [""],
    },
    sectionOne: {
      title: "",
      images: "",
      highlights: [{ title: "", description: "" }],
    },
    sectionTwo: {
      title: "",
      highlights: [{ title: "", description: "", images: "" }],
    },
    sectionThree: {
      title: "",
      highlights: [{ title: "", description: "", images: "" }],
    },
    courses: {
      title: "",
      description: "",
      steps: [{ stepNumber: 1, title: "", subtitle: "", description: "" }],
    },
    mentor: {
      image: "",
      title: "",
      name: "",
      description: "",
    },
    CertificationSection: {
      title: "",
      description: "",
      image: "",
      points: [""],
    },
    FAQSchema: {
      title: "",
      questions: [{ question: "", answer: "" }],
    },
    price: 0,
    discountPrice: 0,
  })

  const [errors, setErrors] = useState({})
  const [showErrors, setShowErrors] = useState(false)

  const themeConfig = {
    orange: {
      bg: "from-orange-50 to-orange-100",
      border: "border-orange-200",
      header: "from-orange-500 to-orange-600",
      cardBg: "bg-orange-50",
      text: "text-orange-800",
      label: "text-orange-700",
      input: "border-orange-200 focus:border-orange-500",
      button: "bg-orange-500 hover:bg-orange-600",
      gradient: "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
      icon: "🧡",
      title: "Freelancing Road To 1 Lakhs Per Month",
      subtitle: "Unlock High-Ticket Freelancing Success – Land Premium Clients, Scale Fast, and Work on Your Terms!",
    },
    green: {
      bg: "from-green-50 to-green-100",
      border: "border-green-200",
      header: "from-green-500 to-green-600",
      cardBg: "bg-green-50",
      text: "text-green-800",
      label: "text-green-700",
      input: "border-green-200 focus:border-green-500",
      button: "bg-green-500 hover:bg-green-600",
      gradient: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      icon: "💚",
      title: "Freelancing Road To 3 Lakhs Per Month",
      subtitle: "Unlock High-Ticket Freelancing Success – Land Premium Clients, Scale Fast, and Work on Your Terms!",
    },
    purple: {
      bg: "from-purple-50 to-purple-100",
      border: "border-purple-200",
      header: "from-purple-500 to-purple-600",
      cardBg: "bg-purple-50",
      text: "text-purple-800",
      label: "text-purple-700",
      input: "border-purple-200 focus:border-purple-500",
      button: "bg-purple-500 hover:bg-purple-600",
      gradient: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      icon: "💜",
      title: "Freelancing Road To 5 Lakhs Per Month",
      subtitle: "Unlock High-Ticket Freelancing Success – Land Premium Clients, Scale Fast, and Work on Your Terms!",
    },
  }

  const config = themeConfig[theme] || themeConfig.orange

  // Safe property access helper
  const safeGet = (obj, path, defaultValue = "") => {
    try {
      return path.split(".").reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : defaultValue
      }, obj)
    } catch {
      return defaultValue
    }
  }

  // File upload handler - stores actual files
  const handleFileUpload = async (file, fieldPath, index = null) => {
    const uploadKey = `${fieldPath}_${index || 0}`

    try {
      setUploadingFiles((prev) => ({ ...prev, [uploadKey]: true }))

      // Enhanced file type validation
      const isImage = file.type.startsWith("image/")
      const isVideo = file.type.startsWith("video/")

      if (!isImage && !isVideo) {
        throw new Error("Please select an image or video file")
      }

      // Validate file size (50MB limit for videos, 10MB for images)
      const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024
      if (file.size > maxSize) {
        const sizeLimit = isVideo ? "50MB" : "10MB"
        throw new Error(`File size must be less than ${sizeLimit}`)
      }

      // Create preview URL for display
      const previewUrl = URL.createObjectURL(file)

      // For videos, create a more reliable preview
      if (isVideo) {
        // Create a video element to check if the browser can play this format
        const videoTest = document.createElement("video")
        videoTest.muted = true
        videoTest.playsInline = true
        videoTest.preload = "metadata"

        // Create object URL for the file
        const objectUrl = URL.createObjectURL(file)
        videoTest.src = objectUrl

        // Check if video is playable
        videoTest.onloadedmetadata = () => {
          // Video is playable, use the object URL
          updateFieldValue(fieldPath, objectUrl, index)

          // Store the actual file with type information
          setFileStorage((prev) => ({
            ...prev,
            [uploadKey]: file,
          }))

          toast({
            title: "Video Selected",
            description: `Video ready for upload! (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
          })

          setUploadingFiles((prev) => ({ ...prev, [uploadKey]: false }))
        }

        videoTest.onerror = () => {
          URL.revokeObjectURL(objectUrl)
          toast({
            title: "Video Format Error",
            description:
              "This video format may not be supported by your browser. Please try a different format (MP4 recommended).",
            variant: "destructive",
          })
          setUploadingFiles((prev) => ({ ...prev, [uploadKey]: false }))
        }

        // Start loading the video metadata
        videoTest.load()

        // Return early as we're handling the rest in the callbacks
        return
      }

      // Store the actual file with type information
      setFileStorage((prev) => ({
        ...prev,
        [uploadKey]: file,
      }))

      // Update form data with preview URL for display
      updateFieldValue(fieldPath, previewUrl, index)

      const fileType = isImage ? "image" : "video"
      toast({
        title: "File Selected",
        description: `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} ready for upload! (${(file.size / 1024 / 1024).toFixed(2)}MB)`,
      })
    } catch (error) {
      console.error("File selection error:", error)
      toast({
        title: "File Selection Error",
        description: error.message || "Failed to select file",
        variant: "destructive",
      })
    } finally {
      setUploadingFiles((prev) => ({ ...prev, [uploadKey]: false }))
    }
  }

  // Helper function to update nested form data
  const updateFieldValue = (fieldPath, value, index = null) => {
    const pathParts = fieldPath.split(".")

    setFormData((prev) => {
      const newData = { ...prev }
      let current = newData

      // Navigate to the parent object
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {}
        }
        current = current[pathParts[i]]
      }

      const lastKey = pathParts[pathParts.length - 1]

      // Handle array updates
      if (index !== null && Array.isArray(current[lastKey])) {
        const newArray = [...current[lastKey]]
        if (typeof newArray[index] === "object" && newArray[index] !== null) {
          // For objects in arrays (like highlights)
          newArray[index] = { ...newArray[index], images: value }
        } else {
          // For simple arrays (like bonus images)
          newArray[index] = value
        }
        current[lastKey] = newArray
      } else {
        current[lastKey] = value
      }

      return newData
    })
  }

  // Helper function to determine file type
  const getFileType = (url) => {
    if (!url) return null

    // Handle blob URLs (local file previews) - check the stored file type
    if (url.startsWith("blob:")) {
      return "unknown" // We'll determine from context or file extension
    }

    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"]
    const videoExtensions = [".mp4", ".webm", ".ogg", ".avi", ".mov", ".wmv", ".flv", ".mkv"]

    const lowerUrl = url.toLowerCase()

    if (
      imageExtensions.some((ext) => lowerUrl.includes(ext)) ||
      lowerUrl.includes("image") ||
      lowerUrl.includes("/images/")
    ) {
      return "image"
    }

    if (
      videoExtensions.some((ext) => lowerUrl.includes(ext)) ||
      lowerUrl.includes("video") ||
      lowerUrl.includes("/videos/") ||
      lowerUrl.includes("youtube.com") ||
      lowerUrl.includes("vimeo.com")
    ) {
      return "video"
    }

    return "unknown"
  }

  // Preview Modal Component
  const PreviewModal = () => {
    if (!previewModal.open) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">File Preview</h3>
            <Button variant="ghost" size="sm" onClick={() => setPreviewModal({ open: false, url: "", type: "" })}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-4">
            {previewModal.type === "image" ? (
              <div className="text-center">
                <img
                  src={previewModal.url || "/placeholder.svg"}
                  alt="Preview"
                  className="max-w-full max-h-[70vh] object-contain mx-auto"
                  onError={(e) => {
                    console.error("Preview image error:", e)
                    e.target.onerror = null
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='sans-serif' fontSize='18' fill='%23999'%3EImage preview unavailable%3C/text%3E%3C/svg%3E"
                  }}
                />
                {previewModal.url && previewModal.url.startsWith("blob:") && (
                  <p className="text-sm text-gray-600 mt-2">Local file preview</p>
                )}
              </div>
            ) : previewModal.type === "video" ? (
              <div className="text-center">
                <video
                  key={previewModal.url}
                  src={previewModal.url}
                  controls
                  autoPlay={false}
                  playsInline
                  className="max-w-full max-h-[70vh] mx-auto"
                  onLoadedMetadata={(e) => {
                    try {
                      const video = e.target
                      video.currentTime = 0.1
                    } catch (err) {
                      console.error("Error setting video time:", err)
                    }
                  }}
                  onError={(e) => {
                    console.error("Preview video error:", e.target.error)
                  }}
                >
                  Your browser does not support the video tag.
                </video>
                <div className="flex justify-center mt-2 space-x-2">
                  {previewModal.url && previewModal.url.startsWith("blob:") ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Local file preview - ready for upload
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Backend file preview
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-2">Preview not available for this file type</p>
                <p className="text-gray-500 text-xs mb-4">URL: {previewModal.url}</p>
                <p className="text-gray-400 text-xs">File type detected: {previewModal.type || "unknown"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // File input component with preview
  const FileUploadInput = ({
    fieldPath,
    currentValue,
    index = null,
    accept = "image/*,video/*",
    label = "Upload File",
    type = "both", // "image", "video", or "both"
  }) => {
    const uploadKey = `${fieldPath}_${index || 0}`
    const isUploading = uploadingFiles[uploadKey] || false
    const inputRef = useRef()

    // Safe current value handling
    const safeCurrentValue = currentValue || ""

    // Enhanced file type detection
    let fileType = getFileType(safeCurrentValue)

    // If we can't determine from URL, use the component type
    if (fileType === "unknown" || !fileType) {
      if (type === "image" || type === "video") {
        fileType = type
      } else {
        // For blob URLs, try to get type from stored file
        const storedFile = fileStorage[uploadKey]
        if (storedFile) {
          fileType = storedFile.type.startsWith("image/")
            ? "image"
            : storedFile.type.startsWith("video/")
              ? "video"
              : "unknown"
        }
      }
    }

    const acceptTypes = {
      image: "image/*",
      video: "video/*",
      both: "image/*,video/*",
    }

    const handleFileSelect = (e) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileUpload(file, fieldPath, index)
      }
      // Reset the input
      e.target.value = ""
    }

    const openPreview = () => {
      if (safeCurrentValue) {
        const detectedType = safeCurrentValue.startsWith("blob:")
          ? type === "image"
            ? "image"
            : type === "video"
              ? "video"
              : fileType
          : fileType

        setPreviewModal({
          open: true,
          url: safeCurrentValue,
          type: detectedType,
        })
      }
    }

    const removeFile = () => {
      // Clean up blob URL and file storage
      if (safeCurrentValue && safeCurrentValue.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(safeCurrentValue)
        } catch (err) {
          console.warn("Error revoking blob URL:", err)
        }
      }
      setFileStorage((prev) => {
        const newStorage = { ...prev }
        delete newStorage[uploadKey]
        return newStorage
      })
      updateFieldValue(fieldPath, "", index)
    }

    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="flex-1"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                {label}
              </>
            )}
          </Button>

          {safeCurrentValue && (
            <Button type="button" variant="outline" size="sm" onClick={openPreview}>
              <Eye className="w-4 h-4" />
            </Button>
          )}
        </div>

        <input ref={inputRef} type="file" accept={acceptTypes[type]} onChange={handleFileSelect} className="hidden" />

        {safeCurrentValue && (
          <div className="mt-2 p-3 bg-gray-50 rounded border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {(fileType === "image" || type === "image") && <ImageIcon className="w-5 h-5 text-green-600" />}
                  {(fileType === "video" || type === "video") && <Play className="w-5 h-5 text-blue-600" />}
                  {fileType === "unknown" && <span className="text-gray-600">📄</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    {(fileType === "image" || type === "image") && (
                      <span className="text-green-600 text-sm font-medium">Image</span>
                    )}
                    {(fileType === "video" || type === "video") && (
                      <span className="text-blue-600 text-sm font-medium">Video</span>
                    )}
                    {fileType === "unknown" && <span className="text-gray-600 text-sm font-medium">File</span>}
                  </div>
                  <p className="text-sm text-gray-600 truncate max-w-xs">
                    {safeCurrentValue.startsWith("blob:")
                      ? "Local file selected"
                      : safeCurrentValue.split("/").pop() || "Uploaded file"}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={openPreview}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Inline preview for images */}
            {(fileType === "image" || type === "image") && safeCurrentValue && (
              <div className="mt-3">
                <div className="relative bg-gray-100 rounded border overflow-hidden">
                  <img
                    src={safeCurrentValue || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full h-20 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={openPreview}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='80' viewBox='0 0 160 80'%3E%3Crect width='160' height='80' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominantBaseline='middle' textAnchor='middle' fontFamily='sans-serif' fontSize='12' fill='%23999'%3EImage%3C/text%3E%3C/svg%3E"
                    }}
                  />
                </div>
              </div>
            )}

            {/* Inline preview for videos */}
            {(fileType === "video" || type === "video") && safeCurrentValue && (
              <div className="mt-3">
                <div className="relative bg-gray-100 rounded border overflow-hidden">
                  <video
                    key={safeCurrentValue}
                    src={safeCurrentValue}
                    className="max-w-full h-20 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={openPreview}
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(e) => {
                      try {
                        const video = e.target
                        video.currentTime = 0.1
                      } catch (err) {
                        console.error("Error setting video time:", err)
                      }
                    }}
                    onError={(e) => {
                      console.error("Video preview error:", e.target.error)
                      e.target.style.display = "none"
                      const parent = e.target.parentElement
                      if (parent && !parent.querySelector(".video-fallback")) {
                        const fallback = document.createElement("div")
                        fallback.className =
                          "absolute inset-0 flex items-center justify-center bg-gray-100 video-fallback"
                        fallback.innerHTML = '<span class="text-gray-500 text-xs">Video preview unavailable</span>'
                        parent.appendChild(fallback)
                      }
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Play className="w-8 h-8 text-white bg-black bg-opacity-50 rounded-full p-1.5" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Click to preview in full size with controls</p>
              </div>
            )}

            {/* Show info for blob URLs */}
            {safeCurrentValue.startsWith("blob:") && (
              <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">✓ File ready for upload to server</div>
            )}
          </div>
        )}
      </div>
    )
  }

  // Fetch data from backend if bundleId is provided
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (bundleId && apiService) {
          const response = await apiService.getBundleById(bundleId)
          if (response && response.data) {
            // Safely merge the fetched data with default structure
            const safeData = {
              title: response.data.title || "",
              description: response.data.description || "",
              features: {
                coursesIncluded: safeGet(response.data, "features.coursesIncluded", 0),
                accessType: safeGet(response.data, "features.accessType", "lifetime"),
                availableLanguages: safeGet(response.data, "features.availableLanguages", ""),
              },
              video:
                Array.isArray(response.data.video) && response.data.video.length > 0
                  ? response.data.video.map((v) => ({
                      title: v?.title || "",
                      videoFile: v?.videoFile || "",
                    }))
                  : [{ title: "", videoFile: "" }],
              bonusSkills: {
                title: safeGet(response.data, "bonusSkills.title", ""),
                images: Array.isArray(safeGet(response.data, "bonusSkills.images"))
                  ? response.data.bonusSkills.images.filter((img) => img)
                  : [""],
              },
              sectionOne: {
                title: safeGet(response.data, "sectionOne.title", ""),
                images: safeGet(response.data, "sectionOne.images", ""),
                highlights: Array.isArray(safeGet(response.data, "sectionOne.highlights"))
                  ? response.data.sectionOne.highlights.map((h) => ({
                      title: h?.title || "",
                      description: h?.description || "",
                    }))
                  : [{ title: "", description: "" }],
              },
              sectionTwo: {
                title: safeGet(response.data, "sectionTwo.title", ""),
                highlights: Array.isArray(safeGet(response.data, "sectionTwo.highlights"))
                  ? response.data.sectionTwo.highlights.map((h) => ({
                      title: h?.title || "",
                      description: h?.description || "",
                      images: h?.images || "",
                    }))
                  : [{ title: "", description: "", images: "" }],
              },
              sectionThree: {
                title: safeGet(response.data, "sectionThree.title", ""),
                highlights: Array.isArray(safeGet(response.data, "sectionThree.highlights"))
                  ? response.data.sectionThree.highlights.map((h) => ({
                      title: h?.title || "",
                      description: h?.description || "",
                      images: h?.images || "",
                    }))
                  : [{ title: "", description: "", images: "" }],
              },
              courses: {
                title: safeGet(response.data, "courses.title", ""),
                description: safeGet(response.data, "courses.description", ""),
                steps: Array.isArray(safeGet(response.data, "courses.steps"))
                  ? response.data.courses.steps.map((s, i) => ({
                      stepNumber: s?.stepNumber || i + 1,
                      title: s?.title || "",
                      subtitle: s?.subtitle || "",
                      description: s?.description || "",
                    }))
                  : [{ stepNumber: 1, title: "", subtitle: "", description: "" }],
              },
              mentor: {
                image: safeGet(response.data, "mentor.image", ""),
                title: safeGet(response.data, "mentor.title", ""),
                name: safeGet(response.data, "mentor.name", ""),
                description: safeGet(response.data, "mentor.description", ""),
              },
              CertificationSection: {
                title: safeGet(response.data, "CertificationSection.title", ""),
                description: safeGet(response.data, "CertificationSection.description", ""),
                image: safeGet(response.data, "CertificationSection.image", ""),
                points: Array.isArray(safeGet(response.data, "CertificationSection.points"))
                  ? response.data.CertificationSection.points.filter((p) => p)
                  : [""],
              },
              FAQSchema: {
                title: safeGet(response.data, "FAQSchema.title", ""),
                questions: Array.isArray(safeGet(response.data, "FAQSchema.questions"))
                  ? response.data.FAQSchema.questions.map((q) => ({
                      question: q?.question || "",
                      answer: q?.answer || "",
                    }))
                  : [{ question: "", answer: "" }],
              },
              price: response.data.price || 0,
              discountPrice: response.data.discountPrice || 0,
            }
            setFormData(safeData)
          }
        } else if (data && Object.keys(data).length > 0) {
          setFormData(data)
        }
      } catch (error) {
        console.error("Fetch error:", error)
        toast({
          title: "Error",
          description: `Failed to load bundle data: ${error.message}`,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [bundleId, data, apiService])

  const validateForm = () => {
    const newErrors = {}

    // Basic Information validation
    if (!formData.title?.trim()) {
      newErrors.title = "Title is required"
    }
    if (!formData.description?.trim()) {
      newErrors.description = "Description is required"
    }

    // Features validation
    if (!formData.features?.coursesIncluded || formData.features.coursesIncluded <= 0) {
      newErrors.coursesIncluded = "Number of courses must be greater than 0"
    }
    if (!formData.features?.availableLanguages?.trim()) {
      newErrors.availableLanguages = "Available languages is required"
    }

    // Videos validation
    if (Array.isArray(formData.video)) {
      formData.video.forEach((video, index) => {
        const videoKey = "video.videoFile_" + index
        if (!video?.title?.trim())
          newErrors["video_" + index + "_title"] = "Video " + (index + 1) + " title is required"
        if (!video?.videoFile && !fileStorage[videoKey])
          newErrors["video_" + index + "_url"] = "Video " + (index + 1) + " is required"
      })
    }

    if (Array.isArray(formData.bonusSkills?.images)) {
      formData.bonusSkills.images.forEach((image, index) => {
        const imageKey = "bonusSkills.images_" + index
        if (!image && !fileStorage[imageKey])
          newErrors["bonusImage_" + index] = "Bonus image " + (index + 1) + " is required"
      })
    }

    if (!formData.sectionOne?.images && !fileStorage["sectionOne.images_0"])
      newErrors.sectionOneImage = "Section One image is required"

    if (Array.isArray(formData.sectionTwo?.highlights)) {
      formData.sectionTwo.highlights.forEach((highlight, index) => {
        const key = "sectionTwo.highlights_" + index
        if (!highlight?.images && !fileStorage[key])
          newErrors["sectionTwo_highlight_" + index + "_image"] = "Image required"
      })
    }

    if (Array.isArray(formData.sectionThree?.highlights)) {
      formData.sectionThree.highlights.forEach((highlight, index) => {
        const key = "sectionThree.highlights_" + index
        if (!highlight?.images && !fileStorage[key])
          newErrors["sectionThree_highlight_" + index + "_image"] = "Image required"
      })
    }

    if (!formData.mentor?.image && !fileStorage["mentor.image_0"]) newErrors.mentorImage = "Mentor image is required"

    if (!formData.CertificationSection?.image && !fileStorage["CertificationSection.image_0"])
      newErrors.certificationImage = "Certification image is required"

    // FAQ validation
    if (!formData.FAQSchema?.title?.trim()) {
      newErrors.faqTitle = "FAQ title is required"
    }

    // Pricing validation
    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0"
    }
    if (!formData.discountPrice || formData.discountPrice <= 0) {
      newErrors.discountPrice = "Discount price must be greater than 0"
    }
    if (formData.discountPrice >= formData.price) {
      newErrors.discountPrice = "Discount price must be less than regular price"
    }

    return newErrors
  }

  // Create FormData with files for backend submission
function createFormDataForSubmission() {
  const formDataToSend = new FormData();

  // Append basic fields
  formDataToSend.append("title", formData.title || "");
  formDataToSend.append("description", formData.description || "");
  formDataToSend.append("price", formData.price || 0);
  formDataToSend.append("discountPrice", formData.discountPrice || 0);
  formDataToSend.append("features", JSON.stringify(formData.features || {}));
  formDataToSend.append("courses", JSON.stringify(formData.courses || {}));
  formDataToSend.append("FAQSchema", JSON.stringify(formData.FAQSchema || {}));

  // Video data - preserve existing URLs
  const videoData = (formData.video || []).map((video, index) => {
    const key = `video.videoFile_${index}`;
    return {
      title: video?.title || "",
      // Preserve existing URL unless new file exists
      videoFile: fileStorage[key] ? "" : video?.videoFile || "",
    };
  });
  formDataToSend.append("video", JSON.stringify(videoData));

  // Append new video files with indexed field names
  (formData.video || []).forEach((_, index) => {
    const key = `video.videoFile_${index}`;
    if (fileStorage[key]) {
      formDataToSend.append(`videoFile_${index}`, fileStorage[key]);
    }
  });

  // Bonus skills
  const bonusData = {
    title: formData.bonusSkills?.title || "",
    images: (formData.bonusSkills?.images || []).map((img, index) => 
      fileStorage[`bonusSkills.images_${index}`] ? "" : img || ""
    ),
  };
  formDataToSend.append("bonusSkills", JSON.stringify(bonusData));

  // Append bonus skills images with indexed field names
  (formData.bonusSkills?.images || []).forEach((_, index) => {
    const key = `bonusSkills.images_${index}`;
    if (fileStorage[key]) {
      formDataToSend.append(`bonusSkillsImage_${index}`, fileStorage[key]);
    }
  });

  // Section One
  formDataToSend.append(
    "sectionOne",
    JSON.stringify({
      ...formData.sectionOne,
      images: fileStorage["sectionOne.images_0"] ? "" : formData.sectionOne?.images || "",
    })
  );
  if (fileStorage["sectionOne.images_0"]) {
    formDataToSend.append("sectionOneImage", fileStorage["sectionOne.images_0"]);
  }

  // Section Two
  formDataToSend.append(
    "sectionTwo",
    JSON.stringify({
      ...formData.sectionTwo,
      highlights: (formData.sectionTwo?.highlights || []).map(highlight => ({
        title: highlight.title,
        description: highlight.description,
        images: highlight.images || ""
      }))
    })
  );

  // Append section two highlight images with indexed field names
  (formData.sectionTwo?.highlights || []).forEach((_, index) => {
    const key = `sectionTwo.highlights_${index}`;
    if (fileStorage[key]) {
      formDataToSend.append(`sectionTwoImage_${index}`, fileStorage[key]);
    }
  });


  // Section Three
  formDataToSend.append(
    "sectionThree",
    JSON.stringify({
      title: formData.sectionThree?.title || "",
      description: formData.sectionThree?.description || "",
      highlights: (formData.sectionThree?.highlights || []).map((highlight, index) => ({
        title: highlight.title || "",
        description: highlight.description || "",
        // Preserve existing URL unless new file exists
        images: fileStorage[`sectionThree.highlights_${index}`] ? "" : highlight.images || ""
      }))
    })
  );

  // Append section three highlight images with underscore in field name
  (formData.sectionThree?.highlights || []).forEach((_, index) => {
    const key = `sectionThree.highlights_${index}`;
    if (fileStorage[key]) {
      formDataToSend.append(`sectionThreeImage_${index}`, fileStorage[key]);
    }
  });

  // Mentor
  formDataToSend.append(
    "mentor",
    JSON.stringify({
      ...formData.mentor,
      image: fileStorage["mentor.image_0"] ? "" : formData.mentor?.image || "",
    })
  );
  if (fileStorage["mentor.image_0"]) {
    formDataToSend.append("mentorImage", fileStorage["mentor.image_0"]);
  }

  // Certification Section
  formDataToSend.append(
    "CertificationSection",
    JSON.stringify({
      ...formData.CertificationSection,
      image: fileStorage["CertificationSection.image_0"] ? "" : formData.CertificationSection?.image || "",
    })
  );
  if (fileStorage["CertificationSection.image_0"]) {
    formDataToSend.append("certificationSectionImage", fileStorage["CertificationSection.image_0"]);
  }

  return formDataToSend;
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowErrors(true)

    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setSaving(true)
      try {
        const formDataToSend = createFormDataForSubmission()
        let response

        if (bundleId && apiService) {
          response = await apiService.updateBundle(bundleId, formDataToSend)
          toast({
            title: "Success",
            description: "Digital bundle updated successfully!",
          })
        } else if (apiService) {
          response = await apiService.createBundle(formDataToSend)
          toast({
            title: "Success",
            description: "Digital bundle created successfully!",
          })
        }

        if (onSaveSuccess && typeof onSaveSuccess === "function" && response) {
          onSaveSuccess(response.data)
        }

        // Clear file storage after successful submission
        setFileStorage({})
      } catch (error) {
        let errorMessage = "An unexpected error occurred"

        if (error.response && error.response.data) {
          errorMessage = error.response.data.message || errorMessage
        } else if (error.message) {
          errorMessage = error.message
        }

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })

        window.scrollTo({ top: 0, behavior: "smooth" })
      } finally {
        setSaving(false)
      }
    } else {
      const firstErrorElement = document.querySelector(".error-input")
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  const getInputClassName = (fieldName) => {
    const hasError = showErrors && errors[fieldName]
    return `${config.input} ${hasError ? "border-red-500 focus:border-red-500 error-input" : ""}`
  }

  const getErrorMessage = (fieldName) => {
    if (showErrors && errors[fieldName]) {
      return <p className="text-red-500 text-sm mt-1">{errors[fieldName]}</p>
    }
    return null
  }

  // Add/remove functions for form arrays
  const addVideoItem = () => {
    setFormData((prev) => ({
      ...prev,
      video: [...(prev.video || []), { title: "", videoFile: "" }],
    }))
  }

  const removeVideoItem = (index) => {
    // Clean up file storage for removed video
    const uploadKey = `video.videoFile_${index}`
    if (fileStorage[uploadKey]) {
      setFileStorage((prev) => {
        const newStorage = { ...prev }
        delete newStorage[uploadKey]
        return newStorage
      })
    }

    setFormData((prev) => ({
      ...prev,
      video: (prev.video || []).filter((_, i) => i !== index),
    }))
  }

  const addBonusImage = () => {
    setFormData((prev) => ({
      ...prev,
      bonusSkills: {
        ...prev.bonusSkills,
        images: [...(prev.bonusSkills?.images || []), ""],
      },
    }))
  }

  const removeBonusImage = (index) => {
    // Clean up file storage for removed image
    const uploadKey = `bonusSkills.images_${index}`
    if (fileStorage[uploadKey]) {
      setFileStorage((prev) => {
        const newStorage = { ...prev }
        delete newStorage[uploadKey]
        return newStorage
      })
    }

    setFormData((prev) => ({
      ...prev,
      bonusSkills: {
        ...prev.bonusSkills,
        images: (prev.bonusSkills?.images || []).filter((_, i) => i !== index),
      },
    }))
  }

  const addHighlight = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        highlights: [
          ...(prev[section]?.highlights || []),
          section === "sectionOne" ? { title: "", description: "" } : { title: "", description: "", images: "" },
        ],
      },
    }))
  }

  const removeHighlight = (section, index) => {
    // Clean up file storage for removed highlight
    const uploadKey = `${section}.highlights_${index}`
    if (fileStorage[uploadKey]) {
      setFileStorage((prev) => {
        const newStorage = { ...prev }
        delete newStorage[uploadKey]
        return newStorage
      })
    }

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        highlights: (prev[section]?.highlights || []).filter((_, i) => i !== index),
      },
    }))
  }

  const addCourseStep = () => {
    const nextStepNumber = (formData.courses?.steps?.length || 0) + 1
    setFormData((prev) => ({
      ...prev,
      courses: {
        ...prev.courses,
        steps: [
          ...(prev.courses?.steps || []),
          { stepNumber: nextStepNumber, title: "", subtitle: "", description: "" },
        ],
      },
    }))
  }

  const removeCourseStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      courses: {
        ...prev.courses,
        steps: (prev.courses?.steps || []).filter((_, i) => i !== index),
      },
    }))
  }

  const addCertificationPoint = () => {
    setFormData((prev) => ({
      ...prev,
      CertificationSection: {
        ...prev.CertificationSection,
        points: [...(prev.CertificationSection?.points || []), ""],
      },
    }))
  }

  const removeCertificationPoint = (index) => {
    setFormData((prev) => ({
      ...prev,
      CertificationSection: {
        ...prev.CertificationSection,
        points: (prev.CertificationSection?.points || []).filter((_, i) => i !== index),
      },
    }))
  }

  const addFAQItem = () => {
    setFormData((prev) => ({
      ...prev,
      FAQSchema: {
        ...prev.FAQSchema,
        questions: [...(prev.FAQSchema?.questions || []), { question: "", answer: "" }],
      },
    }))
  }

  const removeFAQItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      FAQSchema: {
        ...prev.FAQSchema,
        questions: (prev.FAQSchema?.questions || []).filter((_, i) => i !== index),
      },
    }))
  }

  // Clean up blob URLs when component unmounts
  useEffect(() => {
    return () => {
      // Clean up any blob URLs when component unmounts to prevent memory leaks
      const cleanupBlobUrls = (obj) => {
        if (typeof obj === "string" && obj.startsWith("blob:")) {
          try {
            URL.revokeObjectURL(obj)
          } catch (err) {
            console.warn("Error revoking blob URL:", err)
          }
        } else if (typeof obj === "object" && obj !== null) {
          Object.values(obj).forEach(cleanupBlobUrls)
        }
      }
      cleanupBlobUrls(formData)
    }
  }, [])

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${config.bg} p-4 flex items-center justify-center`}>
        <Card className={`${config.border} shadow-lg`}>
          <CardContent className="p-8 flex items-center space-x-4">
            <Loader2 className={`w-8 h-8 animate-spin text-${theme}-500`} />
            <div>
              <h3 className={`text-lg font-semibold ${config.text}`}>Loading {config.title}</h3>
              <p className={`text-${theme}-600`}>Fetching data from backend...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.bg} p-4`}>
      <div className="max-w-4xl mx-auto">
        <Card className={`${config.border} shadow-lg`}>
          <CardHeader className={`bg-gradient-to-r ${config.header} text-white`}>
            <CardTitle className="text-2xl font-bold">
              {config.icon} {bundleId ? `Edit ${config.title}` : `Create ${config.title}`}
            </CardTitle>
            <CardDescription className={`text-${theme}-100`}>{config.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <Card className={config.border}>
                <CardHeader className={config.cardBg}>
                  <CardTitle className={config.text}>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label htmlFor="title" className={config.label}>
                      Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      className={getInputClassName("title")}
                      required
                      readOnly
                    />
                    {getErrorMessage("title")}
                  </div>
                  <div>
                    <Label htmlFor="description" className={config.label}>
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description || ""}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      className={getInputClassName("description")}
                      rows={3}
                      required
                    />
                    {getErrorMessage("description")}
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className={config.border}>
                <CardHeader className={config.cardBg}>
                  <CardTitle className={config.text}>Features</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="coursesIncluded" className={config.label}>
                        Courses Included *
                      </Label>
                      <Input
                        id="coursesIncluded"
                        type="number"
                        value={formData.features?.coursesIncluded || 0}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            features: { ...prev.features, coursesIncluded: Number.parseInt(e.target.value) || 0 },
                          }))
                        }
                        className={getInputClassName("coursesIncluded")}
                        required
                      />
                      {getErrorMessage("coursesIncluded")}
                    </div>
                    <div>
                      <Label htmlFor="accessType" className={config.label}>
                        Access Type
                      </Label>
                      <Select
                        value={formData.features?.accessType || "lifetime"}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            features: { ...prev.features, accessType: value },
                          }))
                        }
                      >
                        <SelectTrigger className={config.input}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lifetime">Lifetime</SelectItem>
                          <SelectItem value="subscription">Subscription</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="availableLanguages" className={config.label}>
                        Available Languages *
                      </Label>
                      <Input
                        id="availableLanguages"
                        value={formData.features?.availableLanguages || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            features: { ...prev.features, availableLanguages: e.target.value },
                          }))
                        }
                        className={getInputClassName("availableLanguages")}
                        required
                      />
                      {getErrorMessage("availableLanguages")}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Videos */}
              <Card className={config.border}>
                <CardHeader className={config.cardBg}>
                  <CardTitle className={`${config.text} flex items-center justify-between`}>
                    Videos
                    <Button type="button" onClick={addVideoItem} className={config.button} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  {(formData.video || []).map((video, index) => (
                    <div key={index} className={`border ${config.border} rounded-lg p-4 space-y-3`}>
                      <div className="flex justify-between items-center">
                        <h4 className={`font-medium ${config.label}`}>Video {index + 1}</h4>
                        {(formData.video || []).length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeVideoItem(index)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label className={config.label}>Title *</Label>
                          <Input
                            value={video?.title || ""}
                            onChange={(e) => {
                              const newVideos = [...(formData.video || [])]
                              newVideos[index] = { ...newVideos[index], title: e.target.value }
                              setFormData((prev) => ({ ...prev, video: newVideos }))
                            }}
                            className={getInputClassName(`video_${index}_title`)}
                            required
                          />
                          {getErrorMessage(`video_${index}_title`)}
                        </div>
                        <div>
                          <Label className={config.label}>Video *</Label>
                          <FileUploadInput
                            fieldPath="video.videoFile"
                            currentValue={video?.videoFile || ""}
                            index={index}
                            type="video"
                            label="Upload Video"
                          />
                          {getErrorMessage(`video_${index}_url`)}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Bonus Skills */}
              <Card className={config.border}>
                <CardHeader className={config.cardBg}>
                  <CardTitle className={config.text}>Bonus Skills</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label className={config.label}>Title *</Label>
                    <Input
                      value={formData.bonusSkills?.title || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          bonusSkills: { ...prev.bonusSkills, title: e.target.value },
                        }))
                      }
                      className={getInputClassName("bonusSkillsTitle")}
                      required
                    />
                    {getErrorMessage("bonusSkillsTitle")}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className={config.label}>Images *</Label>
                      <Button type="button" onClick={addBonusImage} className={config.button} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {(formData.bonusSkills?.images || []).map((image, index) => (
                      <div key={index} className="space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                          <Label className={config.label}>Image {index + 1}</Label>
                          {(formData.bonusSkills?.images || []).length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeBonusImage(index)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <FileUploadInput
                          fieldPath="bonusSkills.images"
                          currentValue={image || ""}
                          index={index}
                          type="image"
                          label="Upload Image"
                        />
                        {getErrorMessage(`bonusImage_${index}`)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Section One */}
              <Card className={config.border}>
                <CardHeader className={config.cardBg}>
                  <CardTitle className={config.text}>Section One</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label className={config.label}>Title *</Label>
                    <Input
                      value={formData.sectionOne?.title || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          sectionOne: { ...prev.sectionOne, title: e.target.value },
                        }))
                      }
                      className={getInputClassName("sectionOneTitle")}
                      required
                    />
                    {getErrorMessage("sectionOneTitle")}
                  </div>
                  <div>
                    <Label className={config.label}>Image *</Label>
                    <FileUploadInput
                      fieldPath="sectionOne.images"
                      currentValue={formData.sectionOne?.images || ""}
                      type="image"
                      label="Upload Image"
                    />
                    {getErrorMessage("sectionOneImage")}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className={config.label}>Highlights</Label>
                      <Button
                        type="button"
                        onClick={() => addHighlight("sectionOne")}
                        className={config.button}
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {(formData.sectionOne?.highlights || []).map((highlight, index) => (
                      <div key={index} className={`border ${config.border} rounded-lg p-3 mb-3`}>
                        <div className="flex justify-between items-center mb-2">
                          <h5 className={`font-medium ${config.label}`}>Highlight {index + 1}</h5>
                          {(formData.sectionOne?.highlights || []).length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeHighlight("sectionOne", index)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Input
                            value={highlight?.title || ""}
                            onChange={(e) => {
                              const newHighlights = [...(formData.sectionOne?.highlights || [])]
                              newHighlights[index] = { ...newHighlights[index], title: e.target.value }
                              setFormData((prev) => ({
                                ...prev,
                                sectionOne: { ...prev.sectionOne, highlights: newHighlights },
                              }))
                            }}
                            placeholder="Highlight title"
                            required
                          />
                          <Textarea
                            value={highlight?.description || ""}
                            onChange={(e) => {
                              const newHighlights = [...(formData.sectionOne?.highlights || [])]
                              newHighlights[index] = { ...newHighlights[index], description: e.target.value }
                              setFormData((prev) => ({
                                ...prev,
                                sectionOne: { ...prev.sectionOne, highlights: newHighlights },
                              }))
                            }}
                            placeholder="Highlight description"
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Section Two */}
              <Card className={config.border}>
                <CardHeader className={config.cardBg}>
                  <CardTitle className={config.text}>Section Two</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label className={config.label}>Title *</Label>
                    <Input
                      value={formData.sectionTwo?.title || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          sectionTwo: { ...prev.sectionTwo, title: e.target.value },
                        }))
                      }
                      className={getInputClassName("sectionTwoTitle")}
                      required
                    />
                    {getErrorMessage("sectionTwoTitle")}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className={config.label}>Highlights</Label>
                      <Button
                        type="button"
                        onClick={() => addHighlight("sectionTwo")}
                        className={config.button}
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {(formData.sectionTwo?.highlights || []).map((highlight, index) => (
                      <div key={index} className={`border ${config.border} rounded-lg p-3 mb-3`}>
                        <div className="flex justify-between items-center mb-2">
                          <h5 className={`font-medium ${config.label}`}>Highlight {index + 1}</h5>
                          {(formData.sectionTwo?.highlights || []).length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeHighlight("sectionTwo", index)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Input
                            value={highlight?.title || ""}
                            onChange={(e) => {
                              const newHighlights = [...(formData.sectionTwo?.highlights || [])]
                              newHighlights[index] = { ...newHighlights[index], title: e.target.value }
                              setFormData((prev) => ({
                                ...prev,
                                sectionTwo: { ...prev.sectionTwo, highlights: newHighlights },
                              }))
                            }}
                            placeholder="Highlight title"
                            required
                          />
                          <Textarea
                            value={highlight?.description || ""}
                            onChange={(e) => {
                              const newHighlights = [...(formData.sectionTwo?.highlights || [])]
                              newHighlights[index] = { ...newHighlights[index], description: e.target.value }
                              setFormData((prev) => ({
                                ...prev,
                                sectionTwo: { ...prev.sectionTwo, highlights: newHighlights },
                              }))
                            }}
                            placeholder="Highlight description"
                            required
                          />
                          <div>
                            <Label className={config.label}>Image *</Label>
                            <FileUploadInput
                              fieldPath="sectionTwo.highlights"
                              currentValue={highlight?.images || ""}
                              index={index}
                              type="image"
                              label="Upload Image"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Section Three */}
              <Card className={config.border}>
                <CardHeader className={config.cardBg}>
                  <CardTitle className={config.text}>Section Three</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label className={config.label}>Title *</Label>
                    <Input
                      value={formData.sectionThree?.title || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          sectionThree: { ...prev.sectionThree, title: e.target.value },
                        }))
                      }
                      className={getInputClassName("sectionThreeTitle")}
                      required
                    />
                    {getErrorMessage("sectionThreeTitle")}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className={config.label}>Highlights</Label>
                      <Button
                        type="button"
                        onClick={() => addHighlight("sectionThree")}
                        className={config.button}
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {(formData.sectionThree?.highlights || []).map((highlight, index) => (
                      <div key={index} className={`border ${config.border} rounded-lg p-3 mb-3`}>
                        <div className="flex justify-between items-center mb-2">
                          <h5 className={`font-medium ${config.label}`}>Highlight {index + 1}</h5>
                          {(formData.sectionThree?.highlights || []).length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeHighlight("sectionThree", index)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Input
                            value={highlight?.title || ""}
                            onChange={(e) => {
                              const newHighlights = [...(formData.sectionThree?.highlights || [])]
                              newHighlights[index] = { ...newHighlights[index], title: e.target.value }
                              setFormData((prev) => ({
                                ...prev,
                                sectionThree: { ...prev.sectionThree, highlights: newHighlights },
                              }))
                            }}
                            placeholder="Highlight title"
                            required
                          />
                          <Textarea
                            value={highlight?.description || ""}
                            onChange={(e) => {
                              const newHighlights = [...(formData.sectionThree?.highlights || [])]
                              newHighlights[index] = { ...newHighlights[index], description: e.target.value }
                              setFormData((prev) => ({
                                ...prev,
                                sectionThree: { ...prev.sectionThree, highlights: newHighlights },
                              }))
                            }}
                            placeholder="Highlight description"
                            required
                          />
                          <div>
                            <Label className={config.label}>Image *</Label>
                            <FileUploadInput
                              fieldPath="sectionThree.highlights"
                              currentValue={highlight?.images || ""}
                              index={index}
                              type="image"
                              label="Upload Image"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Courses */}
              <Card className={config.border}>
                <CardHeader className={config.cardBg}>
                  <CardTitle className={config.text}>Courses</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className={config.label}>Title *</Label>
                      <Input
                        value={formData.courses?.title || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            courses: { ...prev.courses, title: e.target.value },
                          }))
                        }
                        className={getInputClassName("coursesTitle")}
                        required
                      />
                      {getErrorMessage("coursesTitle")}
                    </div>
                    <div>
                      <Label className={config.label}>Description *</Label>
                      <Textarea
                        value={formData.courses?.description || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            courses: { ...prev.courses, description: e.target.value },
                          }))
                        }
                        className={getInputClassName("coursesDescription")}
                        required
                      />
                      {getErrorMessage("coursesDescription")}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className={config.label}>Course Steps</Label>
                      <Button type="button" onClick={addCourseStep} className={config.button} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {(formData.courses?.steps || []).map((step, index) => (
                      <div key={index} className={`border ${config.border} rounded-lg p-3 mb-3`}>
                        <div className="flex justify-between items-center mb-2">
                          <h5 className={`font-medium ${config.label}`}>Step {step?.stepNumber || index + 1}</h5>
                          {(formData.courses?.steps || []).length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeCourseStep(index)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                          <Input
                            value={step?.title || ""}
                            onChange={(e) => {
                              const newSteps = [...(formData.courses?.steps || [])]
                              newSteps[index] = { ...newSteps[index], title: e.target.value }
                              setFormData((prev) => ({
                                ...prev,
                                courses: { ...prev.courses, steps: newSteps },
                              }))
                            }}
                            placeholder="Step title"
                            required
                          />
                          <Input
                            value={step?.subtitle || ""}
                            onChange={(e) => {
                              const newSteps = [...(formData.courses?.steps || [])]
                              newSteps[index] = { ...newSteps[index], subtitle: e.target.value }
                              setFormData((prev) => ({
                                ...prev,
                                courses: { ...prev.courses, steps: newSteps },
                              }))
                            }}
                            placeholder="Step subtitle"
                            required
                          />
                        </div>
                        <Textarea
                          value={step?.description || ""}
                          onChange={(e) => {
                            const newSteps = [...(formData.courses?.steps || [])]
                            newSteps[index] = { ...newSteps[index], description: e.target.value }
                            setFormData((prev) => ({
                              ...prev,
                              courses: { ...prev.courses, steps: newSteps },
                            }))
                          }}
                          placeholder="Step description"
                          required
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mentor */}
              <Card className={config.border}>
                <CardHeader className={config.cardBg}>
                  <CardTitle className={config.text}>Mentor Information</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label className={config.label}>Mentor Image *</Label>
                    <FileUploadInput
                      fieldPath="mentor.image"
                      currentValue={formData.mentor?.image || ""}
                      type="image"
                      label="Upload Mentor Image"
                    />
                    {getErrorMessage("mentorImage")}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className={config.label}>Name *</Label>
                      <Input
                        value={formData.mentor?.name || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            mentor: { ...prev.mentor, name: e.target.value },
                          }))
                        }
                        className={getInputClassName("mentorName")}
                        required
                      />
                      {getErrorMessage("mentorName")}
                    </div>
                    <div>
                      <Label className={config.label}>Title *</Label>
                      <Input
                        value={formData.mentor?.title || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            mentor: { ...prev.mentor, title: e.target.value },
                          }))
                        }
                        className={getInputClassName("mentorTitle")}
                        required
                      />
                      {getErrorMessage("mentorTitle")}
                    </div>
                  </div>
                  <div>
                    <Label className={config.label}>Description *</Label>
                    <Textarea
                      value={formData.mentor?.description || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mentor: { ...prev.mentor, description: e.target.value },
                        }))
                      }
                      className={getInputClassName("mentorDescription")}
                      rows={3}
                      required
                    />
                    {getErrorMessage("mentorDescription")}
                  </div>
                </CardContent>
              </Card>

              {/* Certification Section */}
              <Card className={config.border}>
                <CardHeader className={config.cardBg}>
                  <CardTitle className={config.text}>Certification Section</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className={config.label}>Title *</Label>
                      <Input
                        value={formData.CertificationSection?.title || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            CertificationSection: { ...prev.CertificationSection, title: e.target.value },
                          }))
                        }
                        className={getInputClassName("certificationTitle")}
                        required
                      />
                      {getErrorMessage("certificationTitle")}
                    </div>
                    <div>
                      <Label className={config.label}>Description *</Label>
                      <Textarea
                        value={formData.CertificationSection?.description || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            CertificationSection: { ...prev.CertificationSection, description: e.target.value },
                          }))
                        }
                        className={getInputClassName("certificationDescription")}
                        rows={3}
                        required
                      />
                      {getErrorMessage("certificationDescription")}
                    </div>
                  </div>
                  <div>
                    <Label className={config.label}>Certification Image *</Label>
                    <FileUploadInput
                      fieldPath="CertificationSection.image"
                      currentValue={formData.CertificationSection?.image || ""}
                      type="image"
                      label="Upload Certification Image"
                    />
                    {getErrorMessage("certificationImage")}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className={config.label}>Certification Points</Label>
                      <Button type="button" onClick={addCertificationPoint} className={config.button} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {(formData.CertificationSection?.points || []).map((point, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={point || ""}
                          onChange={(e) => {
                            const newPoints = [...(formData.CertificationSection?.points || [])]
                            newPoints[index] = e.target.value
                            setFormData((prev) => ({
                              ...prev,
                              CertificationSection: { ...prev.CertificationSection, points: newPoints },
                            }))
                          }}
                          placeholder="Certification point"
                          required
                        />
                        {(formData.CertificationSection?.points || []).length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeCertificationPoint(index)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className={config.border}>
                <CardHeader className={config.cardBg}>
                  <CardTitle className={config.text}>FAQ Section</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label className={config.label}>FAQ Title *</Label>
                    <Input
                      value={formData.FAQSchema?.title || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          FAQSchema: { ...prev.FAQSchema, title: e.target.value },
                        }))
                      }
                      className={getInputClassName("faqTitle")}
                      required
                    />
                    {getErrorMessage("faqTitle")}
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className={config.label}>FAQ Questions</Label>
                      <Button type="button" onClick={addFAQItem} className={config.button} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {(formData.FAQSchema?.questions || []).map((faq, index) => (
                      <div key={index} className={`border ${config.border} rounded-lg p-3 mb-3`}>
                        <div className="flex justify-between items-center mb-2">
                          <h5 className={`font-medium ${config.label}`}>FAQ {index + 1}</h5>
                          {(formData.FAQSchema?.questions || []).length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeFAQItem(index)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Input
                            value={faq?.question || ""}
                            onChange={(e) => {
                              const newFAQs = [...(formData.FAQSchema?.questions || [])]
                              newFAQs[index] = { ...newFAQs[index], question: e.target.value }
                              setFormData((prev) => ({
                                ...prev,
                                FAQSchema: { ...prev.FAQSchema, questions: newFAQs },
                              }))
                            }}
                            placeholder="Question"
                            required
                          />
                          <Textarea
                            value={faq?.answer || ""}
                            onChange={(e) => {
                              const newFAQs = [...(formData.FAQSchema?.questions || [])]
                              newFAQs[index] = { ...newFAQs[index], answer: e.target.value }
                              setFormData((prev) => ({
                                ...prev,
                                FAQSchema: { ...prev.FAQSchema, questions: newFAQs },
                              }))
                            }}
                            placeholder="Answer"
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card className={config.border}>
                <CardHeader className={config.cardBg}>
                  <CardTitle className={config.text}>Pricing</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className={config.label}>Price *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.price || 0}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) || 0 }))
                        }
                        className={getInputClassName("price")}
                        required
                      />
                      {getErrorMessage("price")}
                    </div>
                    <div>
                      <Label className={config.label}>Discount Price *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.discountPrice || 0}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, discountPrice: Number.parseFloat(e.target.value) || 0 }))
                        }
                        className={getInputClassName("discountPrice")}
                        required
                      />
                      {getErrorMessage("discountPrice")}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Error Summary */}
              {showErrors && Object.keys(errors).length > 0 && (
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-800 flex items-center">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      Please fix the following errors:
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {Object.entries(errors).map(([field, message]) => (
                        <div key={field} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-red-700 text-sm">{message}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-red-100 rounded-lg">
                      <p className="text-red-800 text-sm font-medium">Total errors: {Object.keys(errors).length}</p>
                      <p className="text-red-600 text-xs mt-1">
                        Please correct all errors above before submitting the form.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Separator className="my-6" />

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className={`bg-gradient-to-r ${config.gradient} text-white px-8 py-2 ${
                    (showErrors && Object.keys(errors).length > 0) || saving ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  size="lg"
                  disabled={(showErrors && Object.keys(errors).length > 0) || saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {bundleId ? "Update" : "Save"} {config.title}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Preview Modal */}
      <PreviewModal />
    </div>
  )
}

export default DigitalBundleForm
