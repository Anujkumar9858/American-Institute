import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import "./StudentTestimonials.css";

export default function StudentTestimonials() {
  const testimonials = [
    {
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Ananya Murti",
      company: "Placed at Accenture",
      feedback:
        "I used to hesitate while speaking even a single line in English. After joining the course, I feel confident and fluent.",
    },
    {
      img: "https://randomuser.me/api/portraits/men/46.jpg",
      name: "Ayush Pandey",
      company: "Placed at Infosys",
      feedback:
        "The sessions helped me break my fear. Now I can present confidently in front of anyone.",
    },
    {
      img: "https://randomuser.me/api/portraits/men/50.jpg",
      name: "Shashank Mishra",
      company: "Placed at Trivago",
      feedback:
        "This course transformed my communication skills and gave me the confidence to crack interviews.",
    },
    {
      img: "https://randomuser.me/api/portraits/women/68.jpg",
      name: "Riya Sharma",
      company: "Placed at Zomato",
      feedback:
        "Interactive classes and roleplays made me fluent quickly. The mentors were very encouraging.",
    },
  ];

  const AUTOPLAY_MS = 3500;
  const PAUSE_AFTER_INTERACTION_MS = 4500;

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 599);

  const timeoutRef = useRef(null);
  const interactionTimeout = useRef(null);

  const sliderRef = useRef(null);
  const startX = useRef(0);
  const deltaX = useRef(0);
  const isDragging = useRef(false);

  const n = testimonials.length;

  useEffect(() => {
    const onResize = () => {
      setIsPhone(window.innerWidth <= 599);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // autoplay
  useEffect(() => {
    if (isPaused) return;
    timeoutRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, AUTOPLAY_MS);
    return () => clearInterval(timeoutRef.current);
  }, [isPaused, n]);

  function pauseAutoplayBriefly() {
    setIsPaused(true);
    if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
    interactionTimeout.current = setTimeout(() => setIsPaused(false), PAUSE_AFTER_INTERACTION_MS);
  }

  // touch / drag handlers
  function onTouchStart(e) {
    pauseAutoplayBriefly();
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
    deltaX.current = 0;
    if (sliderRef.current) sliderRef.current.style.transition = "none";
  }

  function onTouchMove(e) {
    if (!isDragging.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    deltaX.current = clientX - startX.current;
    const move = -index * (cardWidth()) + deltaX.current;
    if (sliderRef.current) sliderRef.current.style.transform = `translateX(${move}px)`;
  }

  function onTouchEnd() {
    if (!isDragging.current) return;
    isDragging.current = false;
    const moved = deltaX.current;
    const threshold = (sliderRef.current?.offsetWidth || 300) * 0.15;
    if (sliderRef.current) sliderRef.current.style.transition = "transform 0.45s cubic-bezier(.2,.9,.3,1)";
    if (moved > threshold) {
      setIndex((i) => (i - 1 + n) % n);
    } else if (moved < -threshold) {
      setIndex((i) => (i + 1) % n);
    } else {
      if (sliderRef.current) sliderRef.current.style.transform = `translateX(${-index * cardWidth()}px)`;
    }
    deltaX.current = 0;
  }

  function cardWidth() {
    const el = sliderRef.current?.querySelector(".testimonial-card");
    if (el) {
      const style = getComputedStyle(el);
      return el.offsetWidth + parseFloat(style.marginLeft || 0) + parseFloat(style.marginRight || 0);
    }
    return 280;
  }

  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.style.transition = "transform 0.45s cubic-bezier(.2,.9,.3,1)";
    sliderRef.current.style.transform = `translateX(${-index * cardWidth()}px)`;
  }, [index]);

  useEffect(() => {
    return () => {
      clearInterval(timeoutRef.current);
      clearTimeout(interactionTimeout.current);
    };
  }, []);

  return (
    <section className="student-testimonials">
      <Container fluid="lg">
        <Row className="align-items-center">
          {/* Left side */}
          <Col lg={4} className="left-panel">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              What Our <br /> Students Says
            </motion.h2>

            <motion.p
              className="section-desc"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our students speak from the heart—sharing their growth,
              breakthroughs, and what it truly means to find your voice.
            </motion.p>

            <motion.button
              className="experience-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Tell About your Experience</span>
              <FaArrowRight />
            </motion.button>
          </Col>

          {/* Right side */}
          <Col lg={8} className="right-panel">
            <motion.div
              className="device-frame"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="frame-top-bar" />

              <div
                className="testimonial-slider"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={(e) => onTouchStart(e)}
                onMouseMove={(e) => {
                  if (!isPhone) onTouchMove(e);
                }}
                onMouseUp={() => {
                  if (!isPhone) onTouchEnd();
                }}
                onMouseLeave={() => {
                  if (isDragging.current && !isPhone) onTouchEnd();
                }}
              >
                <div className="slider-viewport">
                  <div className="slider-track" ref={sliderRef}>
                    {testimonials.map((t, i) => (
                      <div className="testimonial-card" key={i}>
                        <img
                          src={t.img}
                          alt={t.name}
                          className="student-img"
                          loading="lazy"
                        />
                        <p className="feedback">"{t.feedback}"</p>
                        <h5>{t.name}</h5>
                        <span>{t.company}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
