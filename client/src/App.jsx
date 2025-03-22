import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Body from "./components/Body";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Course from "./pages/Course";
import TopCourses from "./pages/TopCourses";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import Profile from "./components/Profile";
import Refer from "./components/Refer";
import Help from "./components/Help";
import MyCourses from "./components/MyCourses";
import PersonalInformation from "./components/PersonalInformation"
import Invoices from "./components/Invoices";
import PrivacyAndSecurity from "./components/PrivacyAndSecurity";
import DashboardLayout from "./components/DashboardLayout";
import ForgotPassword from "./pages/ForgotPassword";
import Mywallet from "./components/Mywallet";
import Courses from "./pages/Courses";
import JoinUs from "./pages/JoinUs";
import ContactUs from "./pages/ContactUs";
import Blogs from "./pages/Blogs";
import RefundAndPolicy from "./pages/RefundAndPolicy";
import LicenceAndAgreement from "./pages/LicenceAndAgreement";
import Scroll from "./Scroll";
// import Admin from "./pages/Admin";
import AllCourses from "./components/AllCourses"
import AdminLogin from "./components/AdminLogin";
import AdminSettings from "./components/AdminSettings";
import Students from "./components/Students";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import AdminOffers from "./components/AdminOffers.jsx";
import Blog from "./pages/Blog";
import Webinars from "./pages/Webinars";
import IntermediateBundle from "./pages/IntermediateBundle";
import BasicBundle from "./pages/BasicBundle";
import AdvanceBundle from "./pages/AdvanceBundle";
function App() {
  return (
    <>

      <BrowserRouter basename="/">
        <Scroll />
        <Routes>
          <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<AdminLogin  />} />
          <Route path="/admin/courses" element={<AllCourses />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/students" element={<Students />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/offers" element={<AdminOffers />} />


          
          </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<PersonalInformation />} />
        <Route path="profile/personalinformation" element={<PersonalInformation />} />
        <Route path="profile/invoices" element={<Invoices />} />
        <Route path="profile/privacyandsecurity" element={<PrivacyAndSecurity />} />
        <Route path="mycourses" element={<MyCourses />} />
        <Route path="mywallet" element={<Mywallet />} />

        <Route path="refer&earn" element={<Refer />} />
        <Route path="helpandsupport" element={<Help />} />
      </Route>
          <Route
            path="/"
            element={
              <Wrapper>
                <Body />
              </Wrapper>
            }
          >
            <Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route
                path="/topcourse/:coursename"
                element={<TopCourses />}
              ></Route>
              <Route path="/course/:id" element={<Course />} />
              <Route path="/courses/:category/:id" element={<Courses />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/joinus" element={<JoinUs />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/webinars" element={<Webinars />} />
              <Route path="/basicBundle" element={<BasicBundle />} />
              <Route path="/intermediateBundle" element={<IntermediateBundle/>} />
              <Route path="/advanceBundle" element={<AdvanceBundle />} />


              <Route path="/blogs/:id" element={<Blog />} />



              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/refundandpolicy" element={<RefundAndPolicy />} />
              <Route path="/licenceandagreement" element={<LicenceAndAgreement />} />

              <Route path="/forgotpassword" element={<ForgotPassword/>} />


              <Route path="/cart" element={<Cart />} />

              <Route path="*" element={<div>404</div>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
