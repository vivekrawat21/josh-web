import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/utils';
import AssignCourse from '../components/AssignCourse';
import exportToExcel from '@/utils/exportToExcel';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
// import CustomToast from '@/components/CustomToast';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const closeDialogRef = useRef(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/getUsers`, {
        withCredentials: true,
      });
      setStudents(res.data.data.users);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const createStudent = async () => {
    const userInfo = { name, mobilenumber, email, password, referralCode };

    try {
      const checkRes = await axios.post(`${BASE_URL}/auth/checkuserexist`, {
        mobilenumber,
        email,
      });

      if (
        checkRes?.data?.statusCode === 200 &&
        checkRes?.data?.data == null
      ) {
        const res = await axios.post(`${BASE_URL}/auth/register`, userInfo);
        if (res.status === 200) {
          fetchStudents();
          setName('');
          setEmail('');
          setMobileNumber('');
          setPassword('');
          setReferralCode('');
          setSuccessMessage('Student created successfully!');
          // Close the dialog after a short delay
          setTimeout(() => {
            setSuccessMessage('');
            closeDialogRef.current?.click();
          }, 1500);
        }
      } else {
        alert('User already exists!');
      }
    } catch (error) {
      console.error('Error creating student:', error);
      alert(
        error.response?.data?.message ||
          'Error occurred during student creation'
      );
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportData = (filteredStudents.length > 0 ? filteredStudents : students).map((item) => ({
    Name: item.name || '',
    Email: item.email || '',
    Mobile: item.mobilenumber || '',
    ReferralCode: item.sharableReferralCode || '',
    BundleEnrolled: item.bundles.length || 0,
    CourseEnrolled: item.courses.length || 0,
    CreatedAt: new Date(item.createdAt).toISOString().split('T')[0] ||  '',

    ID: item._id,
  }));
   const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');

    if (!confirmDelete) return;
    try {
      const res = await axios.delete(`${BASE_URL}/auth/deleteUser/${studentId}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setStudents((prevStudents) => prevStudents.filter((student) => student._id !== studentId));
        // alert('Student deleted successfully!');
        setSuccessMessage('Student deleted successfully!');
        // Close the dialog after a short delay
        setTimeout(() => {
          setSuccessMessage('');
          closeDialogRef.current?.click();
        }, 1500);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      // alert('Failed to delete the student.');
      setSuccessMessage('Failed to Delete!');
      // Close the dialog after a short delay
      setTimeout(() => {
        setSuccessMessage('');
        closeDialogRef.current?.click();
      }, 1500);
    }
   }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">

        <h2 className="text-3xl font-bold text-gray-900 tracking-tight text-center md:text-left sm:text-4xl">
          Students Data
        </h2>
        <div className='flex gap-2'>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md">
              <span>Add Student</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95%] sm:max-w-md p-4 sm:p-6 mx-auto">
            <DialogHeader>
              <DialogTitle>Create a new Student</DialogTitle>
              <DialogDescription>
                Fill the form to create a new student and optionally assign them a course or bundle.
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2 mt-4">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Student Name" />
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
              <Input value={mobilenumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Enter Mobile Number" />
              <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
              <Input value={referralCode} onChange={(e) => setReferralCode(e.target.value)} placeholder="Enter Referral Code (optional)" />
              <Button onClick={createStudent}>Create Student</Button>
              {successMessage && (
                <div className="text-green-600 text-sm font-medium mt-2">
                  ✅ {successMessage}
                </div>
              )}
            </div>

            <DialogFooter className="justify-end mt-4">
              <DialogClose asChild>
                <button
                  ref={closeDialogRef}
                  className="bg-gray-300 px-4 py-2 text-sm rounded hover:bg-gray-400"
                >
                  Close
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          onClick={() => exportToExcel(exportData, 'Students')}
          className="bg-orange-600 text-white rounded"
        >
          Export to Excel
        </Button>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2  lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <div
            key={student._id}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl w-full"
          >
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              {student.name}
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-1">Email: {student.email}</p>
            <p className="text-sm md:text-base text-gray-600 mb-1">ReferralCode: {student.sharableReferralCode}</p>
            <p className="text-sm md:text-base text-gray-600 mb-4">Mobile: {student.mobilenumber}</p>
            <div className="flex flex-col  gap-2 w-full">
              <div className='flex flex-col  lg:flex-row gap-2 w-full'>
              <AssignCourse assignType="course" studentId={student._id} />
              <AssignCourse assignType="bundle" studentId={student._id} />
              </div>
              <Button className="bg-red-600 hover:bg-red-700" onClick={ ()=>{handleDelete(student._id)}}> Delete User </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
