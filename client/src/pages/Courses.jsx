import React, { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"  // Use navigate instead of useParams
import { useParams } from "react-router-dom"
import { BASE_URL } from "@/utils/utils"
import axios from "axios"

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); 
   // Initialize the navigate hook
   let category = 'all';
  category = useParams().category;  // Get the category from the URL params
  const id = useParams().id;  // Get the id from the URL params
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [bundleData, setBundleData] = useState([]);
  const categories = Array.from(new Set(bundleData.map((bundle) => bundle?.bundleName)));

  // Filter courses based on search term and selected category
  const filteredCourses = bundleData.flatMap((bundle) => {
    // Filter by category if a category is selected
    const matchesCategory = selectedCategory ? bundle.bundleName === selectedCategory : true;

    // Filter courses by search term (checking title or description)
    const filteredBundleCourses = bundle.courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Return the courses that match the search term and the selected category
    return matchesCategory && filteredBundleCourses.length > 0 ? filteredBundleCourses : [];
  });

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  // Handle course card click (navigate to a course details page)
  const handleCourseClick = (id) => {
    navigate(`/course/${id}`);
  };

  const fetchBundles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/course/getAllBundles`, { withCredentials: true });
      setBundleData(res.data.data.bundles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBundles();
  }, []);

  return (
    <div className="container mx-auto px-4 md:py-8">
      <h1 className="text-3xl font-bold mb-8"><span className="text-orange-500">Explore</span> Courses</h1>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="bg-orange-600" type="submit">Search</Button>
      </form>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map((bundle) => (
          <Button
            key={bundle}
            variant={selectedCategory === bundle ? "default" : "outline"}
            onClick={() => handleCategoryFilter(bundle)}
          >
            {bundle}
          </Button>
        ))}
      </div>

      {/* Courses grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card key={course._id} className="overflow-hidden cursor-pointer" onClick={() => handleCourseClick(course._id)}>
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <Badge className="bg-orange-600">{course.level}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{course.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Badge variant="outline">{course.category}</Badge>
                <p className="font-bold">₹{course.price}</p>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-muted-foreground">No courses found. Try a different search term or category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
