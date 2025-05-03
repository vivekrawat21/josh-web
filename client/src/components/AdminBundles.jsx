import React, { useEffect, useState } from 'react';
import { Edit, MoreHorizontal, Trash, PlusCircle } from "lucide-react"; // Import PlusCircle icon
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
import CustomToast from '@/components/CustomToast'; // Assuming CustomToast is in components/CustomToast.jsx

const AdminBundles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addBundle, setAddBundle] = useState(false);
  const [bundles, setBundles] = useState([]);
  const [toastMessage, setToastMessage] = useState(null); // Toast message state
  const [showToast, setShowToast] = useState(false); // State for controlling the visibility of the toast
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

  // Handle Delete with Toast
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/bundle/removeBundle/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        // Remove the deleted bundle from the state
        setBundles((prevBundles) => prevBundles.filter((bundle) => bundle._id !== id));
        // Show success toast
        setToastMessage({ type: 'success', message: "Bundle deleted successfully!" });
        setShowToast(true); // Show the toast
      }
    } catch (error) {
      console.error("Error deleting bundle:", error);
      // Show error toast if deletion fails
      setToastMessage({ type: 'error', message: "Failed to delete the bundle." });
      setShowToast(true); // Show the toast
    }
  };

  useEffect(() => {
    fetchBundles();
  }, []);

  const editBundle = (id) => {
    navigate(`/admin/editBundle/${id}`);
  };

  // Add New Course Button for each individual bundle
  const handleAddNewCourse = (bundleId) => {
    navigate(`/admin/bundleCourse/${bundleId}`);
  };

  return (
    <div>
      {/* Show the custom toast message if the state showToast is true */}
      {showToast && (
        <CustomToast
          type={toastMessage.type}
          message={toastMessage.message}
          onClose={() => setShowToast(false)} // Close the toast when onClose is triggered
        />
      )}

      <div className="flex justify-between my-2">
        <div>Bundles Dashboard</div>
        <div className="flex gap-4">
          <Button onClick={handleBundleAddButton}>
            {!addBundle ? "Add new Bundle" : "Back"}
          </Button>
        </div>
      </div>
      {addBundle && (
        <div className="my-2 py-2 px-4 border-2 bg-white rounded-lg">
          <AddNewBundle addBundle={addBundle} setAddBundle={setAddBundle} />
        </div>
      )}
      <div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Bundle Management</CardTitle>
                <CardDescription>Manage your bundles, edit details, or remove bundles.</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search bundles..."
                  className="w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Bundle</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bundles.map((bundle) => (
                  <TableRow key={bundle?._id}>
                    <TableCell className="font-medium">{bundle?.bundleName}</TableCell>
                    <TableCell>{bundle?.category || bundle?.bundleName}</TableCell>
                    <TableCell>₹{bundle?.price}</TableCell>
                    <TableCell>{bundle?.bundleName}</TableCell>
                    <TableCell>{bundle?.date}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          bundle?.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {bundle?.status}
                      </span>
                    </TableCell>
                    <TableCell>{bundle?.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => editBundle(bundle?._id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAddNewCourse(bundle?._id)}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Course
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(bundle?._id)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBundles;
