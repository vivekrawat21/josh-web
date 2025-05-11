import React, { useEffect, useState } from 'react';
import { Edit, MoreHorizontal, Trash, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BASE_URL } from '@/utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { setBundle } from '@/features/bundles/BundleSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddNewBundle from './AddNewBundle';
import CustomToast from '@/components/CustomToast';
import exportToExcel from '@/utils/exportToExcel';
const AdminBundles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addBundle, setAddBundle] = useState(false);
  const [bundles, setBundles] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const bundle = useSelector((state) => state.bundle.bundles[0]);
  const navigate = useNavigate();

  const handleBundleAddButton = async () => {
    setAddBundle(!addBundle);
  };

  const fetchBundles = async () => {
    try {
      if (!bundle) {
        const res = await axios.get(`${BASE_URL}/bundle/getBundles`, {
          withCredentials: true,
        });
        const allBundles = res.data.data.bundles;
        setBundles(allBundles);
        dispatch(setBundle(allBundles));
      } else {
        setBundles(bundle);
      }
    } catch (error) {
      console.error("Error fetching bundles:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/bundle/removeBundle/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setBundles((prevBundles) => prevBundles.filter((bundle) => bundle._id !== id));
        setToastMessage({ type: 'success', message: "Bundle deleted successfully!" });
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error deleting bundle:", error);
      setToastMessage({ type: 'error', message: "Failed to delete the bundle." });
      setShowToast(true);
    }
  };

  useEffect(() => {
    fetchBundles();
    // If coming back from EditBundle with refresh flag, clear it
    if (location.state?.refresh) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);


  const editBundle = (id) => {
    navigate(`/admin/editBundle/${id}`);
  };

  const handleAddNewCourse = (bundleId) => {
    navigate(`/admin/bundleCourse/${bundleId}`);
  };

  // Filter bundles by search term
  const filteredBundles = bundles.filter(
    (bundle) =>
      bundle.bundleName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bundle.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const exportData = (filteredBundles.length > 0 ? filteredBundles : bundles).map(item => ({
    Name: item.bundleName || "",
    Price: item.price || "",
    Status: item.isSpecial ? "Special" : "Standard",
    ID: item._id,
    // Topics: Array.isArray(item.courses) ? item.course.title.join(", ") : "", // Convert array to comma-separated string
    // Tags: Array.isArray(item.bundles) ? item.bundles.bundleName.join(", ") : "",       // Another example
  }));
    return (
      <div className="max-w-screen mx-auto p-6 bg-white shadow rounded-lg">
        {showToast && (
          <CustomToast
            type={toastMessage.type}
            message={toastMessage.message}
            onClose={() => setShowToast(false)}
          />
        )}
  
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 my-4">
  <h1 className="text-2xl font-semibold text-gray-800">Bundles Dashboard</h1>

  <div className="flex flex-col sm:flex-row gap-2">
    <Button 
      onClick={() => setAddBundle(!addBundle)}
      className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto"
    >
      {addBundle ? "Cancel" : "Add New Bundle"}
    </Button>

    <Button
      onClick={() => exportToExcel(exportData, "Bundles")}
      className="bg-orange-600 text-white rounded w-full sm:w-auto"
    >
      Export to Excel
    </Button>
  </div>
</div>

  
        {addBundle && (
          <div className="my-4 py-4 px-6 border-2 bg-white rounded-lg shadow-sm">
            <AddNewBundle onSuccess={() => { setAddBundle(false); fetchBundles(); }} />
          </div>
        )}
  
        <Card className="mt-6 shadow-md">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-semibold text-gray-800">Bundle Management</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Manage your bundles, edit details, or remove bundles.
                </CardDescription>
              </div>
              <Input
                placeholder="Search bundles..."
                className="w-full sm:w-64 border border-gray-300 px-3 py-1.5 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-sm font-medium text-gray-700">Title</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700">Price</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700">Discount</TableHead>
                  <TableHead className="text-sm font-medium text-gray-700">Status</TableHead>
                  <TableHead className="text-right text-sm font-medium text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {filteredBundles.map((bundle) => (
                  <TableRow key={bundle._id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-sm">{bundle.bundleName}</TableCell>
                    <TableCell className="text-sm text-gray-600">₹{bundle.price}</TableCell>
                    <TableCell className="text-sm text-gray-600">{bundle.discount}%</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        bundle.isSpecial ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {bundle.isSpecial ? "Special" : "Standard"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4 text-gray-600" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="shadow-lg rounded-md">
                          <DropdownMenuLabel className="text-sm">Actions</DropdownMenuLabel>
                          <DropdownMenuItem 
                            onClick={() => navigate(`/admin/editBundle/${bundle._id}`)}
                            className="text-sm px-3 py-1.5 hover:bg-gray-100"
                          >
                            <Edit className="mr-2 h-4 w-4 text-gray-600" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleAddNewCourse(bundle?._id)}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Course
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600 hover:bg-red-50 text-sm px-3 py-1.5"
                            onClick={() => handleDelete(bundle._id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredBundles.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-sm text-gray-500">
                      {searchTerm ? "No bundles match your search criteria" : "No bundles found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default AdminBundles;
