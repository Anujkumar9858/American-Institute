import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare, FaPlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./FreeDemo.css";

export default function FreeDemo() {
  const navigate = useNavigate();

  // Animation Variants
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
  const headingVar = { hidden: { opacity: 0, y: -18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const subVar = { hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.08 } } };
  const btnVar = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 450, damping: 28 } } };
  const frameVar = { hidden: { opacity: 0, scale: 0.98, y: 10 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section className="free-demo-animated">
      <Container>
        <motion.div
          className="demo-wrap"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.45 }}
        >
          <Row className="align-items-center">
            {/* LEFT SIDE */}
            <Col md={6} className="demo-left">
              <motion.h2 className="demo-heading" variants={headingVar}>
                Try Before You Decide.
                <br />
                <motion.span className="demo-subtitle" variants={subVar}>
                  Your First Step Starts Here.
                </motion.span>
              </motion.h2>

              <motion.p className="demo-desc" variants={subVar}>
                Join a free live demo to experience our teaching style, meet the mentor, and ask questions live.
              </motion.p>

              <motion.button
                className="demo-btn"
                variants={btnVar}
                whileHover={{ y: -4, boxShadow: "0 18px 40px rgba(109,77,223,0.18)" }}
                onClick={() => navigate("/free-demo")}
              >
                <span>Get a Free Demo</span>
                <FaArrowUpRightFromSquare className="btn-icon" />
              </motion.button>
            </Col>

            {/* RIGHT SIDE */}
            <Col md={6} className="demo-right">
              <motion.div
                className="video-frame"
                variants={frameVar}
                whileHover={{ y: -6 }}
                onClick={() => navigate("/free-demo")}
                role="button"
                tabIndex={0}
              >
                <img
                  src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=1200&q=80"
                  alt="Demo preview"
                />
                <div className="play-overlay">
                  <motion.div
                    className="play-circle"
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ repeat: Infinity, duration: 2.6 }}
                  >
                    <FaPlay />
                  </motion.div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
}
