import React, { useEffect } from 'react'
import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { useSelector } from 'react-redux';
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
import AddNewCourse from './AddNewCourse';
import { BASE_URL } from '@/utils/utils';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setBundle } from '@/features/bundles/BundleSlice';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AdminBundles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [addCourse,setAddCourse]=useState(false);
  const [bundles,setBundles]= useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [closeAddCourse,setCloseAddCourse]=useState(false)
  const handleCourseAddButton= ()=>{
    // console.log("")
    setAddCourse(!addCourse)
  }
  const fetchBundles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/bundle/getBundles`, {
        withCredentials: true,
      });
      const allBundles = res.data.data.bundles;
      setBundles(allBundles);
      dispatch(setBundle(allBundles));
    } catch (error) {
      console.error("Error fetching bundles:", error);
    }
  };

useEffect(()=>{
    fetchBundles()
},[])
    console.log(bundles)

    const editBundle = (id) => {
        navigate(`/admin/editBundle/${id}`);  // Passing data via navigate's state
      };
  return (
    <div>
      <div className='flex justify-between my-2'>
        <div>Bundles Dashboard</div>
        <div>
          <Button onClick={handleCourseAddButton}>Add new Bundle</Button>
        </div>
      </div>
      {addCourse && (
   <div className='my-2 py-2  px-4 border-2 bg-white rounded-lg'>
    <AddNewCourse addCourse={addCourse} setAddCourse={setAddCourse}/>
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
              {/* <TableHead>Status</TableHead> */}
              <TableHead>Added </TableHead>
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
                      <DropdownMenuItem onClick={() => {
                        editBundle(bundle?._id,"bundle")
                      }}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      
                      {/* <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog> */}
                    
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
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
  )
}

export default AdminBundles