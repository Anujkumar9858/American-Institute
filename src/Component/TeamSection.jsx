import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import "./TeamSection.css";

const TEAM = [
  {
    id: "t1",
    name: "Amit sir",
    role: "Specialized in communication",
    img: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: "t2",
    name: "Raja sir",
    role: "Senior Communication Trainer",
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww"
  },
  {
    id: "t3",
    name: "Priya Kapoor",
    role: "Online Course Coordinator",
    img: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww"
  },
  {
    id: "t4",
    name: "Sneha Singh",
    role: "Personality Development Coach",
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=60"
  }
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { y: -8, scale: 1.02, transition: { duration: 0.18 } }
};

export default function TeamSection() {
  return (
    <section className="team-section" aria-label="Team">
      <Container>
        <motion.div
          className="team-heading-wrap"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="team-title">The Faces Guiding You to Fluency & Confidence</h3>
        </motion.div>

        <motion.div
          className="team-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Row className="g-4">
            {TEAM.map((member) => (
              <Col key={member.id} xs={12} sm={6} md={6} lg={3}>
                <motion.article
                  className="team-card"
                  variants={cardVariants}
                  whileHover="hover"
                  whileFocus="hover"
                  tabIndex={0}
                  role="article"
                  aria-labelledby={`team-${member.id}-name`}
                >
                  <div className="team-card-inner">
                    <div className="avatar-wrap" aria-hidden="false">
                      <motion.img
                        src={member.img}
                        alt={member.name}
                        className="team-avatar"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.12 }}
                        transition={{ duration: 0.35 }}
                      />
                    </div>

                    <div className="team-info">
                      <h4 id={`team-${member.id}-name`} className="team-name">{member.name}</h4>
                      <p className="team-role">{member.role}</p>
                    </div>

                    {/* Button fixed at bottom of card */}
                    <div className="team-action">
                      <button
                        className="know-btn"
                        aria-label={`Know more about ${member.name}`}
                        onClick={() => {
                          // replace with your routing/modal logic
                          alert(`Show details for ${member.name}`);
                        }}
                      >
                        Know more <FaChevronRight />
                      </button>
                    </div>
                  </div>
                </motion.article>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </section>
  );
}
