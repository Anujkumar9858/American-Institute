import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import "./BranchLocations.css";

const BRANCHES = [
  { id: "b1", text: "12–B, Beside Indian Coffee House, Indrapuri, Bhopal (M.P)", color: "card-purple" },
  { id: "b2", text: "83, Top Floor, M.P Nagar, Zone-II, Bhopal (M.P)", color: "card-mint" },
  { id: "b3", text: "Gopal Complex, Opp. Dehat Thana, Vidisha (M.P)", color: "card-navy" }
];

const container = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.12 } }
};
const item = {
  hidden: { opacity: 0, x: 24, scale: 0.98 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.48, ease: "easeOut" } },
  hover: { scale: 1.02 }
};

export default function BranchLocations() {
  return (
    <section className="branch-section" aria-label="Find a branch near you">
      <Container>
        <Row className="align-items-center gx-5">
          {/* Left: Title + CTA */}
          <Col md={6} className="left-col">
            <motion.h2
              className="branch-heading"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Find a Branch <br /> Near You
            </motion.h2>

            <motion.p
              className="branch-sub"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              Visit Us at Any of Our 3 Convenient Locations
            </motion.p>

            {/* Contact button back to left side */}
            <motion.button
              className="branch-cta"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = "/contact"}
              aria-label="Contact us"
            >
              Contact US <span className="cta-icon"><FaArrowRight /></span>
            </motion.button>
          </Col>

          {/* Right: Branch list */}
          <Col md={6}>
            <motion.div
              className="branch-list"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={container}
            >
              {BRANCHES.map((b, i) => (
                <motion.div
                  key={b.id}
                  className={`branch-card ${b.color}`}
                  variants={item}
                  whileHover="hover"
                  role="article"
                  aria-label={`Branch ${i + 1}: ${b.text}`}
                  tabIndex={0}
                >
                  <div className="branch-text">{b.text}</div>
                </motion.div>
              ))}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
