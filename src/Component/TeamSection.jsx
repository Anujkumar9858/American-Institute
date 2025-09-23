// TeamSection.jsx
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import "./TeamSection.css";

const TEAM = [
  {
    id: "t1",
    name: "Amit sir",
    role: "Specialized in communication",
    img: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=600&auto=format&fit=crop&q=60",
    bio: "Amit has 12 years of experience coaching spoken English and presentation skills. He focuses on practical drills and confidence building."
  },
  {
    id: "t2",
    name: "Raja sir",
    role: "Senior Communication Trainer",
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop&q=60",
    bio: "Raja specialises in accent neutralization and interview coaching. He runs mock-interview sessions and provides actionable feedback."
  },
  {
    id: "t3",
    name: "Priya Kapoor",
    role: "Online Course Coordinator",
    img: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=600&auto=format&fit=crop&q=60",
    bio: "Priya manages course content and student onboarding. She ensures lessons are engaging and tracks student progress."
  },
  {
    id: "t4",
    name: "Sneha Singh",
    role: "Personality Development Coach",
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=60",
    bio: "Sneha's sessions cover body language, grooming, and soft skills. She helps learners translate communication skills into real-world confidence."
  }
];

/* improved typewriter hook (fixed stuck behaviour, uses refs) */
function useTypewriter(phrases = [], typingSpeed = 80, pause = 1400) {
  const [text, setText] = useState("");
  const phraseIndexRef = useRef(0);
  const forwardRef = useRef(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!phrases || phrases.length === 0) return;

    const run = () => {
      const pIndex = phraseIndexRef.current;
      const phrase = phrases[pIndex] || "";
      const forward = forwardRef.current;
      if (forward) {
        const next = phrase.slice(0, text.length + 1);
        setText(next);
        if (next === phrase) {
          // pause at full phrase then start deleting
          timeoutRef.current = setTimeout(() => {
            forwardRef.current = false;
            run();
          }, pause);
          return;
        }
        timeoutRef.current = setTimeout(run, typingSpeed);
      } else {
        // deleting
        const next = phrase.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next === "") {
          // move to next phrase
          phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
          forwardRef.current = true;
          timeoutRef.current = setTimeout(run, Math.round(typingSpeed / 1.5));
          return;
        }
        timeoutRef.current = setTimeout(run, Math.round(typingSpeed / 1.5));
      }
    };

    // start
    timeoutRef.current = setTimeout(run, typingSpeed);

    return () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };
    // deliberately depend on phrases, typingSpeed, pause; not on text to avoid rapid re-triggers
  }, [phrases, typingSpeed, pause]);

  return text;
}

const cardVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  hover: { y: -8, scale: 1.03, transition: { duration: 0.18 } }
};

export default function TeamSection() {
  const phrases = [
    "Communication • Confidence • Personality",
    "Live Coaching • Self-Study • Online Courses",
    "Practical Lessons • Mock Interviews"
  ];
  const typed = useTypewriter(phrases, 70, 1400);

  const [selected, setSelected] = useState(null); // member object
  const [show, setShow] = useState(false);

  // new: CTA button state
  // 'idle' | 'loading' | 'success'
  const [ctaState, setCtaState] = useState("idle");
  const ctaTimeoutRef = useRef(null);

  const openModal = (member) => {
    setSelected(member);
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
    setTimeout(() => setSelected(null), 200);
  };

  // CTA click handler - shows loading then success (simulated async)
  const handleCTA = () => {
    if (ctaState === "loading") return;
    setCtaState("loading");
    clearTimeout(ctaTimeoutRef.current);
    // simulate network / processing delay
    ctaTimeoutRef.current = setTimeout(() => {
      setCtaState("success");
      // revert to idle after a short success display
      ctaTimeoutRef.current = setTimeout(() => setCtaState("idle"), 2200);
    }, 1400);
  };

  useEffect(() => {
    return () => {
      clearTimeout(ctaTimeoutRef.current);
    };
  }, []);

  return (
    <section className="team-section" aria-label="Team">
      <Container>
        <div className="team-heading-wrap">
          <h3 className="team-title">The Faces Guiding You to Fluency & Confidence</h3>
          <div className="typed-line" aria-live="polite">
            <span className="typed-text">{typed}</span>
            <span className="typed-cursor" aria-hidden="true">|</span>
          </div>
        </div>

        <div className="team-grid">
          <Row className="g-4">
            {TEAM.map((member) => (
              <Col key={member.id} xs={12} sm={6} md={6} lg={3}>
                <motion.article
                  className="team-card"
                  variants={cardVariants}
                  initial="initial"
                  animate="enter"
                  whileHover="hover"
                  whileFocus="hover"
                  tabIndex={0}
                  role="article"
                  aria-labelledby={`team-${member.id}-name`}
                >
                  <div className="team-card-inner">
                    <div className="avatar-wrap" aria-hidden="false">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="team-avatar"
                        loading="lazy"
                      />
                    </div>

                    <div className="team-info">
                      <h4 id={`team-${member.id}-name`} className="team-name">{member.name}</h4>
                      <p className="team-role">{member.role}</p>
                    </div>

                    <div className="team-action">
                      <button
                        className="know-btn"
                        aria-label={`Know more about ${member.name}`}
                        onClick={() => openModal(member)}
                      >
                        Know more <FaChevronRight />
                      </button>
                    </div>
                  </div>
                </motion.article>
              </Col>
            ))}
          </Row>

          {/* below-grid CTA button: shows loading and then success */}
          <div className="team-cta-wrap" style={{ marginTop: 22, textAlign: "center" }}>
            <button
              className={`team-cta-btn ${ctaState}`}
              onClick={handleCTA}
              aria-live="polite"
              aria-busy={ctaState === "loading"}
              aria-label={
                ctaState === "idle"
                  ? "Request a free consultation"
                  : ctaState === "loading"
                  ? "Request in progress"
                  : "Request completed"
              }
            >
              {ctaState === "idle" && "Request a free consultation"}
              {ctaState === "loading" && (
                <>
                  <span className="spinner" aria-hidden="true" /> Requesting...
                </>
              )}
              {ctaState === "success" && (
                <>
                  <span className="success-mark" aria-hidden="true">✓</span> Request sent
                </>
              )}
            </button>
          </div>

          {/* Modal for member details */}
          <Modal show={show} onHide={closeModal} centered aria-labelledby="team-member-modal">
            <Modal.Header closeButton>
              <Modal.Title id="team-member-modal">
                {selected ? selected.name : ""}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selected && (
                <div className="modal-body-member">
                  <div className="modal-avatar-wrap" aria-hidden="true">
                    <img src={selected.img} alt={selected.name} className="modal-avatar" />
                  </div>
                  <h5 className="modal-role">{selected.role}</h5>
                  <p className="modal-bio">{selected.bio}</p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </section>
  );
}
