// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

import LoginPage from "./Component/LoginPage";
import RegisterPage from "./Component/RegisterCard";
import MentorDetail from "./Component/MentorDetail";
import ContactPage from "./Component/ContactPage";
import ChatWidget from "./Component/ChatWidget";

// gallery / demo pages
import DemoGallery from "./Component/DemoGallery";
import GalleryPage from "./Component/GalleryPage"; // ensure this file exists (Gallery component)

// global css & libs
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import AboutInstitute from "./Component/AboutInstitute";

function App() {
  return (
    <Router>
      <NavbarAmerican />

      <Routes>
        {/* Main Home page with sections */}
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

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        

        {/* Core pages */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/mentor/:id" element={<MentorDetail />} />
        <Route path="/contact-branches" element={<ContactBranches />} />

        {/* Gallery (new page) */}
        <Route path="/gallery" element={<GalleryPage />} />

        {/* Free demo gallery route */}
        <Route path="/free-demo" element={<DemoGallery />} />

        {/* Add additional routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
