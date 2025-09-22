import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import "./FooterBottom.css";

export default function Footer() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="custom-footer">
      <Container fluid="lg">
        <Row>
          {/* LEFT */}
          <Col lg={4} className="footer-left">
            <motion.h2
              className="footer-title"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              Because You <br /> Deserve to Be <br /> Heard.
            </motion.h2>
          </Col>

          {/* CENTER */}
          <Col lg={4} className="footer-center">
            <motion.div
              className="footer-info"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <h5>Address</h5>
              <p>
                Indrapuri B Sector, Sector B, Indrapuri, Bhopal, Madhya Pradesh 462022
              </p>

              <h5>Phone Number</h5>
              <p>7723006091</p>

              <h5>Email</h5>
              <p>Americaninstitute@gmail.com</p>
            </motion.div>
          </Col>

          {/* RIGHT */}
          <Col lg={4} className="footer-right">
            <motion.div
              className="footer-social"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <h5>Follow Us on</h5>
              <div className="social-icons">
                <a href="https://www.instagram.com/impsenglish?igsh=MWkzazgyNnpmejZ4Zg==">
                  <FaInstagram />
                </a>
                <a href="https://www.youtube.com/@ImpressiveEnglish">
                  <FaYoutube />
                </a>
                <a href="https://www.facebook.com/share/173ig1Ww91/">
                  <FaFacebookF />
                </a>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
