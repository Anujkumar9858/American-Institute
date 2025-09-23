import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./HeroAmerican.css";

/* Reusable Typewriter Component */
const Typewriter = ({ text = "", speed = 45, startDelay = 120, onDone }) => {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplay(text);
      if (onDone) onDone();
      return;
    }

    let mounted = true;
    let i = 0;
    const timer = setTimeout(() => {
      const id = setInterval(() => {
        if (!mounted) return;
        if (i >= text.length) {
          clearInterval(id);
          if (onDone) onDone();
          return;
        }
        setDisplay((prev) => prev + text.charAt(i));
        i += 1;
      }, speed);
    }, startDelay);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [text, speed, startDelay, onDone]);

  return (
    <span className="typewriter-inline">
      {display}
      <span aria-hidden="true" className="typewriter-cursor" />
    </span>
  );
};

const HeroAmerican = () => {
  const navigate = useNavigate();

  const scrollToCourses = (attempts = 0) => {
    const id = "courses-section";
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 88;
      const top = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top, behavior: "smooth" });
      return true;
    }
    if (attempts === 0) {
      navigate("/", { replace: false });
      setTimeout(() => scrollToCourses(1), 220);
      return false;
    }
    return false;
  };

  return (
    <section id="home-section" className="hero-section text-white" aria-label="Hero: Welcome">
      <div className="overlay d-flex align-items-center">
        <Container className="hero-inner">
          {/* Heading */}
          <motion.h1
            className="fw-bold hero-title"
            initial={{ opacity: 0, y: 18, scale: 0.996 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div>
              <Typewriter text={"Welcome to the Place"} speed={40} startDelay={80} />
            </div>
            <div>
              <Typewriter text={"where Confidence Begins"} speed={40} startDelay={900} />
            </div>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="hero-sub mt-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <Typewriter
              text={"Practical speaking practice • Live mentor sessions • Real results"}
              speed={30}
              startDelay={1700}
            />
          </motion.p>

          {/* Buttons */}
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
              <Typewriter text={"Enroll now"} speed={50} startDelay={2500} />
            </Button>

            <motion.button
              className="btn btn-link hero-secondary ms-3"
              whileHover={{ x: 6 }}
              onClick={() => scrollToCourses()}
              aria-label="Explore courses"
            >
              <Typewriter text={"Explore courses →"} speed={50} startDelay={3200} />
            </motion.button>
          </motion.div>
        </Container>
      </div>
    </section>
  );
};

export default HeroAmerican;
