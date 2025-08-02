import { useState, useEffect } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { toast } from "../hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import DigitalBundleForm from "../components/DigitalBundleForm"
import axios from "axios"
import { BASE_URL } from "../utils/utils"

const AdminDigitalBundle = () => {
  const [loading, setLoading] = useState(true)
  const [bundles, setBundles] = useState({
    orange: null,
    green: null,
    purple: null,
  })
  const [bundleIds, setBundleIds] = useState({
    orange: null,
    green: null,
    purple: null,
  })

  // API service functions
  const getAllBundles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/digitalBundle/getDigitalBundles`)
      return response.data
    } catch (error) {
      console.error("Error fetching digital bundles:", error)
      throw error
    }
  }

  const getBundleById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/digitalBundle/getDigitalBundleById/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching digital bundle with ID ${id}:`, error)
      throw error
    }
  }

  const createBundle = async (bundleData) => {
    try {
      const response = await axios.post(`${BASE_URL}/digitalBundle/createDigitalBundle`, bundleData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      return response.data
    } catch (error) {
      console.error("Error creating digital bundle:", error)
      throw error
    }
  }

  const updateBundle = async (id, bundleData) => {
    try {
      console.log("Updating bundle with ID:", id, "Data:", bundleData)
      // Debug log
      // console.log("===== bundleData contents =====")
      // for (const pair of bundleData.entries()) {
      //   console.log(pair[0], ":", pair[1])
      // }

      const response = await axios.post(`${BASE_URL}/digitalBundle/updateDigitalBundle/${id}`, bundleData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })
      return response.data
    } catch (error) {
      console.error(`Error updating digital bundle with ID ${id}:`, error)
      throw error
    }
  }

  // Fetch all bundles on component mount
  useEffect(() => {
    const fetchBundles = async () => {
      setLoading(true)
      try {
        const response = await getAllBundles(1, 10)

        if (response && response.data && response.data.bundles) {
          const fetchedBundles = response.data.bundles

          // Map bundles by their exact titles from your backend data
          const orangeBundle = fetchedBundles.find(
            (b) => b.title.toLowerCase().includes("1 lakhs") || b.title.toLowerCase().includes("1 lakh"),
          )

          const greenBundle = fetchedBundles.find(
            (b) => b.title.toLowerCase().includes("3 lakhs") || b.title.toLowerCase().includes("3 lakh"),
          )

          const purpleBundle = fetchedBundles.find(
            (b) => b.title.toLowerCase().includes("5 lakhs") || b.title.toLowerCase().includes("5 lakh"),
          )

          console.log("Found bundles:", { orangeBundle, greenBundle, purpleBundle })

          // Set bundle data and IDs
          setBundles({
            orange: orangeBundle || null,
            green: greenBundle || null,
            purple: purpleBundle || null,
          })

          setBundleIds({
            orange: orangeBundle ? orangeBundle._id : null,
            green: greenBundle ? greenBundle._id : null,
            purple: purpleBundle ? purpleBundle._id : null,
          })

          // Show success message
          const foundCount = [orangeBundle, greenBundle, purpleBundle].filter(Boolean).length
          toast({
            title: "Data Loaded",
            description: `Successfully loaded ${foundCount} existing bundles from backend`,
          })
        }
      } catch (error) {
        console.error("Fetch error:", error)
        toast({
          title: "Error",
          description: `Failed to load bundles: ${error.message}`,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBundles()
  }, [])

  // Handle successful save/update
  const handleSaveSuccess = (theme, updatedBundle) => {
    // Update the local state with the new/updated bundle
    setBundles((prev) => ({
      ...prev,
      [theme]: updatedBundle,
    }))

    setBundleIds((prev) => ({
      ...prev,
      [theme]: updatedBundle._id,
    }))

    toast({
      title: "Success",
      description: `${theme.charAt(0).toUpperCase() + theme.slice(1)} bundle saved successfully!`,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 flex items-center justify-center">
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="p-8 flex items-center space-x-4">
            <Loader2 className="w-8 h-8 animate-spin text-slate-700" />
            <div>
              <h3 className="text-lg font-semibold">Loading Digital Bundles</h3>
              <p className="text-slate-600">Fetching existing data from backend...</p>
            </div>
          </CardHeader>
        </Card>
        <Toaster />
      </div>
    )
  }

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6 border-slate-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white">
            <CardTitle className="text-3xl font-bold text-center">Digital Bundle</CardTitle>
            <CardDescription className="text-slate-200 text-center">
              Edit existing bundles loaded from backend - enabled for testing
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Show bundle status */}
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-800 text-lg">Bundle Status</CardTitle>
          </CardHeader>
          <div className="px-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div
                className={`p-3 rounded-lg ${bundles.orange ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
              >
                <div className="font-medium">🧡 1 Lakhs Bundle</div>
                <div>{bundles.orange ? `Loaded (ID: ${bundleIds.orange?.slice(-6)})` : "Not found"}</div>
              </div>
              <div
                className={`p-3 rounded-lg ${bundles.green ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
              >
                <div className="font-medium">💚 3 Lakhs Bundle</div>
                <div>{bundles.green ? `Loaded (ID: ${bundleIds.green?.slice(-6)})` : "Not found"}</div>
              </div>
              <div
                className={`p-3 rounded-lg ${bundles.purple ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
              >
                <div className="font-medium">💜 5 Lakhs Bundle</div>
                <div>{bundles.purple ? `Loaded (ID: ${bundleIds.purple?.slice(-6)})` : "Not found"}</div>
              </div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="orange" className="w-full">
          <TabsList className="flex justify-around flex-wrap w-full mb-10 lg:mb-6">
            <TabsTrigger value="orange" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              🧡 Freelancing Road To 1 Lakhs Per Month
              {bundles.orange && <span className="ml-2 text-xs">✓</span>}
            </TabsTrigger>
            <TabsTrigger value="green" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              💚 Freelancing Road To 3 Lakhs Per Month
              {bundles.green && <span className="ml-2 text-xs">✓</span>}
            </TabsTrigger>
            <TabsTrigger value="purple" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              💜 Freelancing Road To 5 Lakhs Per Month
              {bundles.purple && <span className="ml-2 text-xs">✓</span>}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orange">
            <DigitalBundleForm
              theme="orange"
              data={bundles.orange || {}}
              bundleId={bundleIds.orange}
              onSaveSuccess={(updatedBundle) => handleSaveSuccess("orange", updatedBundle)}
              apiService={{ getBundleById, createBundle, updateBundle }}
            />
          </TabsContent>

          <TabsContent value="green">
            <DigitalBundleForm
              theme="green"
              data={bundles.green || {}}
              bundleId={bundleIds.green}
              onSaveSuccess={(updatedBundle) => handleSaveSuccess("green", updatedBundle)}
              apiService={{ getBundleById, createBundle, updateBundle }}
            />
          </TabsContent>

          <TabsContent value="purple">
            <DigitalBundleForm
              theme="purple"
              data={bundles.purple || {}}
              bundleId={bundleIds.purple}
              onSaveSuccess={(updatedBundle) => handleSaveSuccess("purple", updatedBundle)}
              apiService={{ getBundleById, createBundle, updateBundle }}
            />
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  )
}

export default AdminDigitalBundle
