import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaQuoteLeft, FaStar } from "react-icons/fa6"; // Ensure FaStar is available
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
    <section className="student-testimonials-premium">
      <Container>
        <div className="premium-header text-center mb-5">
          <motion.h2
            className="premium-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Stories of <span className="text-highlight">Transformation</span>
          </motion.h2>
          <motion.p
            className="premium-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Real students, real results. Discover how we've helped thousands find their voice.
          </motion.p>
        </div>

        <div
          className="premium-slider-wrapper"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={(e) => onTouchStart(e)}
          onMouseMove={(e) => { if (!isPhone) onTouchMove(e); }}
          onMouseUp={() => { if (!isPhone) onTouchEnd(); }}
          onMouseLeave={() => { if (isDragging.current && !isPhone) onTouchEnd(); }}
        >
          <div className="premium-track" ref={sliderRef}>
            {testimonials.map((t, i) => (
              <motion.div
                className="premium-card"
                key={i}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="card-top-accent"></div>
                <div className="quote-icon-wrap">
                  <FaQuoteLeft />
                </div>

                <p className="premium-feedback">"{t.feedback}"</p>

                <div className="premium-rating">
                  {[...Array(5)].map((_, starsIndex) => (
                    <FaStar key={starsIndex} className="star-icon" />
                  ))}
                </div>

                <div className="premium-user-info">
                  <div className="user-avatar">
                    <img src={t.img} alt={t.name} loading="lazy" />
                  </div>
                  <div className="user-details">
                    <h5>{t.name}</h5>
                    <span className="user-company">{t.company}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="premium-actions text-center mt-5">
          <motion.button
            className="premium-cta-btn"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Join Our Community</span>
            <FaArrowRight />
          </motion.button>
        </div>
      </Container>
    </section>
  );
}
