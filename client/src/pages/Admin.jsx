import React from 'react'
import AdminLogin from '../components/AdminLogin'
import AdminSidebar from '../components/AdminSidebar'
import { Outlet } from 'react-router-dom'
const Admin = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AdminSidebar/>
      {/* Main Content */}
      <div className="w-full md:w-4/5 p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default Admin
