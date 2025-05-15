import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Body from "./components/Body";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Course from "./pages/Course";
import Bundle from "./pages/Bundle.jsx";
import Cart from "./pages/Cart";
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
import LicenseAndAgreement from "./pages/LicenseAndAgreement";
import Scroll from "./Scroll";
import AdminCourses from "./components/AdminCourses"
import AdminBundles from "./components/AdminBundles";
import AdminLogin from "./components/AdminLogin";
import AdminMentor from "./components/AdminMentor";
import Students from "./components/Students";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import AdminOffers from "./components/AdminOffers.jsx";
import AdminGallery from "./components/AdminGallery";
import Blog from "./pages/Blog";
import Webinars from "./pages/Webinars";
import BundleCourse from "./components/BundleCourse";
import Goals from "./pages/Goals";
import Gallery from "./pages/Gallery";
import Disclaimer from "./pages/Disclaimer";
import Terms from "./pages/Terms";
import CoursePlayer from "./pages/CoursePlayer";
import BundleRouter from "./pages/bundleRouter";
import AdminWebinar from "./pages/AdminWebinar";
import Upgrade from "./components/Upgrade";
import EditCourse from "./components/EditCourse";
import EditBundle from "./components/EditBundle";
import DigitalMarketingWebinar from "./pages/DigitalMarketingWebinar";
import WebDevelopmentWebinar from "./pages/WebDevelopmentWebinar";
import MicrosoftDynamicsWebinar from "./pages/MicrosoftDynamicsWebinar";
import OdooERPWebinar from "./pages/OdooErpWebinar";
import AdminAssignMentor from "./components/AdminAssignMentor";
import AdminTestimonials from "./components/AdminTestimonials";
import AdminInstitutionalTestimonial from "./components/AdminInstitutionalTestimonial";

function App() {
  return (
    <>
      {/* <WebinarLanding/> */}
      <BrowserRouter basename="/">
        <Scroll />
        <Routes>
          <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<AdminLogin  />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/bundles" element={<AdminBundles />} />
          <Route path="/admin/editBundle/:id" element={<EditBundle />} />
          <Route path="/admin/editCourse/:id" element={<EditCourse />} />
          <Route path="/admin/bundleCourse/:id" element={<BundleCourse />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/:mentorId/assignMentor" element={<AdminAssignMentor />} />
          <Route path="/admin/mentors" element={<AdminMentor />} />
          <Route path="/admin/students" element={<Students />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/offers" element={<AdminOffers />} />
          <Route path="/admin/webinars" element={<AdminWebinar />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/institutiontestimonials" element={<AdminInstitutionalTestimonial />} />
          </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<PersonalInformation />} />
        <Route path="profile/personalinformation" element={<PersonalInformation />} />
        <Route path="profile/invoices" element={<Invoices />} />
        <Route path="profile/privacyandsecurity" element={<PrivacyAndSecurity />} />
        <Route path="mycourse/upgrade" element={<Upgrade />} />
        <Route path="mycourses" element={<MyCourses />} />
        <Route path="mywallet" element={<Mywallet />} />
        <Route path="refer&earn" element={<Refer />} />
        <Route path="webinars" element={<Webinars />} />
        <Route path="help&support" element={<Help />} />
      </Route>

      
      <Route path="/specialBundle/:id" element={<BundleRouter />} />
      
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
                path="/bundle/:bundleId"
                element={<Bundle />}
              ></Route>
              <Route path="/course/:courseId" element={<Course />} />
              <Route path="/course/:courseId/learn" element={<CoursePlayer />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/coursePlayer" element={<CoursePlayer />} />

              {/* <Route path="/course/:videoIndex" element={<CoursePlayer />} /> */}

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/joinus" element={<JoinUs />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/licenseAndAgreement" element={<LicenseAndAgreement/>} />

              <Route path="/refund" element={<RefundAndPolicy />} />


              <Route path="/blogs" element={<Blogs />} />
          
              <Route path="/webinars" element={<Webinars />} />
              <Route path="/digital-marketing/:webinarId" element={<DigitalMarketingWebinar />} />
              <Route path="/full-stack/:webinarId" element={<WebDevelopmentWebinar />} />
              <Route path="/microsoft-dynamic/:webinarId" element={<MicrosoftDynamicsWebinar />} />
              <Route path="/odoo-erp/:webinarId" element={<OdooERPWebinar />} />
              
              <Route path="/goal/:id" element={<Goals />} />
              {/* <Route path="/specialBundle/:id" element={<BasicBundle />} /> */}
              <Route path="/gallery/:category" element={<Gallery />} />

              <Route path="/blogs/:id" element={<Blog />} />



              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/refundandpolicy" element={<RefundAndPolicy />} />
              <Route path="/licenceandagreement" element={<LicenseAndAgreement />} />

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
