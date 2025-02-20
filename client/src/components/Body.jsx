import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Body = () => {
  return (
    <>
    <Navbar />
    <Outlet/>
    <Footer /> 
    </>
  )
}

export default Body;