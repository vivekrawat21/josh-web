// import React from 'react'
import React, { useState } from "react";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import Navbar from './Navbar';
// import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Dashboard from "@/pages/Dashboard";
const DashboardLayout = () => {
    return (
    <>
    <Navbar/>
    {/* <Outlet/> */}
    <div className="mt-16">
    <Dashboard/>
    </div>
  
    <Footer/>
    </>
    )
  
}

export default DashboardLayout