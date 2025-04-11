import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Search } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "@/utils/utils";
import axios from "axios";

const SkeletonCard = () => (
  <div className="animate-pulse rounded-lg border shadow-sm p-4 space-y-4">
    <div className="h-48 bg-gray-200 rounded-md w-full"></div>
    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    <div className="flex justify-between mt-4">
      <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
      <div className="h-6 w-1/6 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { category, id } = useParams();  
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [bundleData, setBundleData] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/course/getAllBundles`, { withCredentials: true });
        setBundleData(res.data.data.bundles);

        const extractedCourses = res.data.data.bundles.flatMap(bundle =>
          bundle.courses.map(course => ({ ...course, bundleName: bundle.bundleName }))
        );
        setAllCourses(extractedCourses);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, [category, id]);

  const filteredCourses = allCourses.filter(course => {
    const matchesCategory = selectedCategory === "all" || course.bundleName === selectedCategory;
    const matchesSearch = searchTerm === "" ||
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 md:py-8">
      <h1 className="text-3xl font-bold mb-8">
        <span className="text-orange-500">Explore</span> Courses
      </h1>

      {/* Search bar */}
      <form className="mb-6 flex gap-2">
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
        <Button className="bg-orange-600">Search</Button>
      </form>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </Button>
        {Array.from(new Set(bundleData.map((bundle) => bundle.bundleName))).map((bundle) => (
          <Button
            key={bundle}
            variant={selectedCategory === bundle ? "default" : "outline"}
            onClick={() => setSelectedCategory(bundle)}
          >
            {bundle}
          </Button>
        ))}
      </div>

      {/* Courses grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Card
              key={course._id}
              className="overflow-hidden cursor-pointer"
              onClick={() => navigate(`/course/${course._id}`)}
            >
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
