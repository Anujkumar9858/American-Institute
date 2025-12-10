import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import "./HeroAmerican.css";
import hero2 from "./Image/Hero2.jpg";

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
    <section id="home-section" className="hero-section" aria-label="Hero: Welcome">
      {/* Background (Image or Video) */}
      <div className="hero-bg">
        <img
          src={hero2}
          alt="Students learning"
        />
      </div>

      <div className="hero-overlay" />

      <Container className="hero-inner">
        <Row className="align-items-center">
          <Col lg={8} className="hero-content-wrapper">


            {/* Headline */}
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="title-line">Welcome to the Place</span>
              <span className="title-line">where <span className="title-highlight">Confidence Begins.</span></span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Master the art of communication with live mentor sessions, practical speaking practice, and a curriculum designed for real-world results.
            </motion.p>

            {/* Actions */}
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                className="btn-primary-hero"
                onClick={() => navigate("/free-demo")}
              >
                <span>Enroll Now</span>
                <FaArrowRight />
              </button>

              <button
                className="btn-secondary-hero"
                onClick={() => scrollToCourses()}
              >
                <div className="play-icon"><FaPlay size={10} /></div>
                <span>Explore Courses</span>
              </button>
            </motion.div>


          </Col>
        </Row>


      </Container>
    </section>
  );
};

export default HeroAmerican;
