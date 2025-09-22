// src/Component/HeroAmerican.jsx
import React from "react";
import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./HeroAmerican.css";

const HeroAmerican = () => {
  const navigate = useNavigate();

  // Smooth scroll helper that accounts for fixed navbar height
  const scrollToCourses = (attempts = 0) => {
    const id = "courses-section";
    const el = document.getElementById(id);
    if (el) {
      // scroll to element smoothly and offset for a fixed navbar (approx 88px)
      const navOffset = 88;
      const top = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top, behavior: "smooth" });
      return true;
    }

    // If not found and we haven't tried navigation yet, go to home and retry shortly
    if (attempts === 0) {
      navigate("/", { replace: false });
      // retry after a short delay to allow the homepage to mount (works in most SPA setups)
      // If your app uses heavy server-side rendering or very long mount times, increase the timeout.
      setTimeout(() => scrollToCourses(1), 220);
      return false;
    }

    // failed after retry
    return false;
  };

  return (
    // id used by react-scroll in Navbar (if you use that later)
    <section id="home-section" className="hero-section text-white" aria-label="Hero: Welcome">
      <div className="overlay d-flex align-items-center">
        <Container className="hero-inner">
          <motion.h1
            className="fw-bold hero-title"
            initial={{ opacity: 0, y: 18, scale: 0.996 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Welcome to the Place
            <br />
            where Confidence {" "}
            {/* <motion.span
              className="highlight"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              Confidence
            </motion.span>{" "} */}
            Begins
          </motion.h1>

          <motion.p
            className="hero-sub mt-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            Practical speaking practice • Live mentor sessions • Real results
          </motion.p>

          <motion.div
            className="hero-cta mt-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
          >
            <Button
              variant="primary"
              size="lg"
              className="rounded-pill px-4 py-2 hero-enroll"
              onClick={() => navigate("/free-demo")}
              aria-label="Enroll now — Get free demo"
            >
              Enroll now
            </Button>

            <motion.button
              className="btn btn-link hero-secondary ms-3"
              whileHover={{ x: 6 }}
              onClick={() => scrollToCourses()}
              aria-label="Explore courses"
            >
              Explore courses →
            </motion.button>
          </motion.div>
        </Container>
      </div>
    </section>
  );
};

export default HeroAmerican;
