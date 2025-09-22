import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import About_institute from "./Image/About_Institute.jpg";
import "./AboutInstitute.css";

export default function AboutInstitute() {
  return (
    <section className="about-institute-section" aria-label="About our Institute">
      <Container>
        {/* animate entire card on scroll into view */}
        <motion.div
          className="about-card"
          initial={{ opacity: 0, y: 18, scale: 0.995 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Row className="g-0 align-items-center">
            {/* LEFT: Title + copy */}
            <Col md={7} className="about-left p-4 p-md-5">
              <motion.h2
                className="about-head"
                initial={{ scale: 0.98, opacity: 0, x: -6 }}
                whileInView={{ scale: 1, opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.06 }}
              >
                About our Institute
              </motion.h2>

              <motion.div
                className="about-copy"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: 0.12 }}
              >
                <p>
                  At our institute, we believe that English communication is not just a skill — it’s a life-changing tool.
                  Founded with the vision to empower individuals through the art of expression, our institute offers a dynamic
                  and engaging learning environment where students grow in confidence, clarity, and character.
                </p>

                <p className="about-sub">
                  Our programmes combine interactive classes, real-world practice, and student-focused coaching to deliver measurable results.
                  Join us to transform your communication skills and unlock new opportunities.
                </p>
              </motion.div>
            </Col>

            {/* RIGHT: Image */}
            <Col md={5} className="about-right p-4 p-md-5 text-center">
              <motion.div
                className="about-image-wrap"
                initial={{ scale: 0.98, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: 0.18 }}
              >
                <img
                  src={About_institute}
                  alt="institute classroom"
                  className="about-image"
                />
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
}
