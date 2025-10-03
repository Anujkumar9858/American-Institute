import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx"; // ✅ Auth wrapper

// Common Components
import NavbarAmerican from "./Component/NavbarAmerican";
import HeroAmerican from "./Component/HeroAmerican";
import StatsAmerican from "./Component/StatsAmerican";
import Mentor from "./Component/Mentor";
import WhyChooseUs from "./Component/WhyChooseUs";
import Achievers from "./Component/Achievers";
import WhatWeOffer from "./Component/WhatWeOffer";
import FreeDemo from "./Component/FreeDemo";
import PeekIntoWorld from "./Component/PeekIntoWorld";
import StudentTestimonials from "./Component/StudentTestimonials";
import ContactBranches from "./Component/ContactBranches";
import FooterBottom from "./Component/FooterBottom";
import ChatWidget from "./Component/ChatWidget";

// Pages
import LoginPage from "./Component/LoginPage.jsx";      
import RegisterPage from "./Component/RegisterCard.jsx"; 
import MentorDetail from "./Component/MentorDetail";
import ContactPage from "./Component/ContactPage";
import DemoGallery from "./Component/DemoGallery";
import GalleryPage from "./Component/GalleryPage";
import AboutInstitute from "./Component/AboutInstitute";

// ✅ Enrollment & Payment
import CourseEnroll from "./Payment/CourseEnroll.jsx";
import PaymentPage from "./Payment/PaymentPage.jsx"; 

// Protected route
import ProtectedRoute from "./Component/ProtectedRoute"; 

// Global Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarAmerican />

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <HeroAmerican />
                <StatsAmerican />
                <Mentor />
                <WhyChooseUs />
                <Achievers />
                <WhatWeOffer />
                <FreeDemo />
                <PeekIntoWorld />
                <StudentTestimonials />
                <ContactBranches />
                <FooterBottom />
                <ChatWidget />
              </>
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Other Public Pages */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentor/:id" element={<MentorDetail />} />
          <Route path="/contact-branches" element={<ContactBranches />} />
          <Route path="/about" element={<AboutInstitute />} />

          {/* ✅ Enrollment + Payment Flow */}
          <Route path="/enroll" element={<CourseEnroll />} />
          <Route path="/payment" element={<PaymentPage />} />

          {/* Protected Routes */}
          <Route
            path="/free-demo"
            element={
              <ProtectedRoute allowedRoles={["admin", "student"]}>
                <DemoGallery />
              </ProtectedRoute>
            }
          />

          <Route
            path="/gallery"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <GalleryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-only"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                  🚀 Welcome to Admin Dashboard
                </h2>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
