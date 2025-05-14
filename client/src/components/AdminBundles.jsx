import React, { useEffect, useState } from 'react';
import { Edit, MoreHorizontal, Trash, PlusCircle, Search, FileSpreadsheet, Plus } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const bundle = useSelector((state) => state.bundle.bundles[0]);
  const navigate = useNavigate();

  const handleBundleAddButton = async () => {
    setAddBundle(!addBundle);
  };

  const fetchBundles = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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

  const filteredBundles = bundles.filter(
    (bundle) =>
      bundle.bundleName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bundle.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportData = (filteredBundles.length > 0 ? filteredBundles : bundles).map(item => ({
    Name: item.bundleName || "",
    Price: item.price || "",
    Status: item.isSpecial ? "Special" : "Standard",
    Courses: item.courses.length || 0,
    StudentsEnrolled: item.students.length || 0,
    CreatedAt: new Date(item?.createdAt).toISOString().split('T')[0] || '',
    ID: item._id,
  }));

  // Responsive card display for mobile view
  const BundleCard = ({ bundle }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-base text-gray-900">{bundle.bundleName}</h3>
          <p className="text-sm text-gray-600 mt-1">₹{bundle.price} • {bundle.discount}% off</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
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
            <DropdownMenuItem 
              onClick={() => handleAddNewCourse(bundle?._id)}
              className="text-sm px-3 py-1.5 hover:bg-gray-100"
            >
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
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3">
        <div>
          <p className="text-xs text-gray-500">Status</p>
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
              bundle.isSpecial ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            {bundle.isSpecial ? "Special" : "Standard"}
          </span>
        </div>
        <div>
          <p className="text-xs text-gray-500">Added</p>
          <p className="text-sm">
            {bundle?.createdAt
              ? new Date(bundle?.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Courses</p>
          <p className="text-sm">{bundle.courses?.length || 0}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Students</p>
          <p className="text-sm">{bundle.students?.length || 0}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto p-3 sm:p-6 bg-white shadow rounded-lg">
      {showToast && (
        <CustomToast
          type={toastMessage.type}
          message={toastMessage.message}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="flex flex-col gap-4 my-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Bundles Dashboard
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => setAddBundle(!addBundle)}
            className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            {addBundle ? (
              "Cancel"
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Add New Bundle</span>
              </>
            )}
          </Button>

          <Button
            onClick={() => exportToExcel(exportData, "Bundles")}
            className="bg-orange-600 text-white hover:bg-orange-700 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Export to Excel</span>
          </Button>
        </div>
      </div>

      {addBundle && (
        <div className="my-4 py-4 px-3 sm:px-6 border-2 bg-white rounded-lg shadow-sm">
          <AddNewBundle onSuccess={() => { setAddBundle(false); fetchBundles(); }} />
        </div>
      )}

      <Card className="mt-6 shadow-md">
        <CardHeader className="px-4 sm:px-6">
          <div className="flex flex-col gap-4">
            <div>
              <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">Bundle Management</CardTitle>
              <CardDescription className="text-sm text-gray-600 mt-1">
                Manage your bundles, edit details, or remove bundles.
              </CardDescription>
            </div>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search bundles..."
                className="w-full pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Desktop Table - Hidden on mobile */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-sm font-medium text-gray-700">Title</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Price</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Discount</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Status</TableHead>
                      <TableHead className="text-sm font-medium text-gray-700">Added</TableHead>
                      <TableHead className="text-right text-sm font-medium text-gray-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredBundles.length > 0 ? (
                      filteredBundles.map((bundle) => (
                        <TableRow key={bundle._id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-sm">{bundle.bundleName}</TableCell>
                          <TableCell className="text-sm text-gray-600">₹{bundle.price}</TableCell>
                          <TableCell className="text-sm text-gray-600">{bundle.discount}%</TableCell>
                          <TableCell>
                            <span 
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                bundle.isSpecial ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {bundle.isSpecial ? "Special" : "Standard"}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {bundle?.createdAt
                              ? new Date(bundle?.createdAt).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "N/A"}
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
                                <DropdownMenuItem 
                                  onClick={() => handleAddNewCourse(bundle?._id)}
                                  className="text-sm px-3 py-1.5 hover:bg-gray-100"
                                >
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-sm text-gray-500">
                          {searchTerm ? "No bundles match your search criteria" : "No bundles found"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View - Shown only on mobile */}
              <div className="md:hidden">
                {filteredBundles.length > 0 ? (
                  filteredBundles.map((bundle) => (
                    <BundleCard key={bundle._id} bundle={bundle} />
                  ))
                ) : (
                  <div className="text-center py-6 text-sm text-gray-500">
                    {searchTerm ? "No bundles match your search criteria" : "No bundles found"}
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBundles;