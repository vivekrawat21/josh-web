import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import all your components here
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
import AdminCourses from "./components/AdminCourses";
import AdminBundles from "./components/AdminBundles";
import AdminLogin from "./components/AdminLogin";
import AdminMentor from "./components/AdminMentor";
import Students from "./components/Students";
import AdminLayout from "./components/AdminLayout";
import AdminPrivacy from "./components/AdminPrivacy";
import AdminDashboard from "./components/AdminDashboard";
import VisitorCounter from "./components/VisitorCounter";
// import Withdraw from "./components/Withdraw";
// import WithdrawRequest from "./components/WithdrawRequest";
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
import AdminDigitalBundle from "./pages/AdminDigitalBundle";
import ResetPassword from "./components/ResetPassword";
import AdminAbout from "./components/AdminAbout";
import Payment from "./pages/Payment";
import DigitalOfflineComponent from "./components/DigitalOfflineComponent";

function App() {
  const [requests, setRequests] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('withdrawalRequests')) || [];
    } catch {
      return [];
    }
  });

  // // Save requests to localStorage
  // useEffect(() => {
  //   try {
  //     localStorage.setItem('withdrawalRequests', JSON.stringify(requests));
  //   } catch (e) {
  //     console.error("Failed to save withdrawal requests to localStorage", e);
  //   }
  // }, [requests]);

  // const handleNewRequest = (newRequest) => {
  //   setRequests(prev => [newRequest, ...prev]);
  // };

  // const handleUpdateRequestStatus = (id, status) => {
  //   setRequests(prev =>
  //     prev.map(req => (req.id === id ? { ...req, status } : req))
  //   );
  // };

  return (
    <BrowserRouter basename="/">
      <Scroll />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminLogin />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="bundles" element={<AdminBundles />} />
          <Route path="digitalBundles" element={<AdminDigitalBundle />} />
          <Route path="editBundle/:id" element={<EditBundle />} />
          <Route path="editCourse/:id" element={<EditCourse />} />
          <Route path="bundleCourse/:id" element={<BundleCourse />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path=":mentorId/assignMentor" element={<AdminAssignMentor />} />
          <Route path="mentors" element={<AdminMentor />} />
          <Route path="students" element={<Students />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="privacy" element={<AdminPrivacy />} />
          <Route path="offers" element={<AdminOffers />} />
          <Route path="webinars" element={<AdminWebinar />} />
          <Route path="gallery" element={<AdminGallery />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="institutiontestimonials" element={<AdminInstitutionalTestimonial />} />
          <Route path="about" element={<AdminAbout />} />
{/*           <Route path="withdrawrequest" element={<WithdrawRequest />} /> */}
        </Route>

        {/* User Dashboard Routes */}
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
{/*           <Route path="withdraw" element={<Withdraw onNewRequest={handleNewRequest} requests={requests} />} /> */}
          
        </Route>

        {/* General Website Routes */}
        <Route
          path="/"
          element={
            <Wrapper>
              <Body />
            </Wrapper>
          }
        >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="bundle/:bundleId" element={<Bundle />} />
          <Route path="course/:courseId" element={<Course />} />
          <Route path="course/:courseId/learn" element={<CoursePlayer />} />
          <Route path="courses" element={<Courses />} />
          <Route path="coursePlayer" element={<CoursePlayer />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="joinus" element={<JoinUs />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy&policy" element={<LicenseAndAgreement />} />
          <Route path="refund" element={<RefundAndPolicy />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<Blog />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="digitallearningbundles/:level/:id" element={<BundleRouter />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="gallery/:category" element={<Gallery />} />
          <Route path="goal/:id" element={<Goals />} />
          <Route path="payment" element={<Payment />} />
          <Route path="offline" element={<DigitalOfflineComponent />} />
          <Route path="digital-marketing/:webinarId" element={<DigitalMarketingWebinar />} />
          <Route path="full-stack/:webinarId" element={<WebDevelopmentWebinar />} />
          <Route path="microsoft-dynamic/:webinarId" element={<MicrosoftDynamicsWebinar />} />
          <Route path="odoo-erp/:webinarId" element={<OdooERPWebinar />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
