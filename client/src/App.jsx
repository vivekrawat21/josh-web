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

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Default route for /dashboard */}
        <Route index element={<PersonalInformation />} />
        
        {/* Nested Routes */}

        <Route path="profile/personalinformation" element={<PersonalInformation />} />
        <Route path="profile/invoices" element={<Invoices />} />
        <Route path="profile/privacyandsecurity" element={<PrivacyAndSecurity />} />
        <Route path="mycourses" element={<MyCourses />} />
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
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

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
