import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import "./Achievers.css";

const SAMPLE = [
  { name: "Ved Sharivastav", role: "Speaker at Unity", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Akhila Paul", role: "Placed at Fortunite", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Kabir Verma", role: "Placed at Dreamworks", img: "https://randomuser.me/api/portraits/men/52.jpg" },
  { name: "Aryan Bhardwaj", role: "Speaker at Igdc", img: "https://randomuser.me/api/portraits/men/76.jpg" },
  { name: "Naina Sharma", role: "Placed at Pixar", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Atharva Roy", role: "Placed at Ubisoft", img: "https://randomuser.me/api/portraits/men/85.jpg" },
  { name: "Ananya Gupta", role: "Placed at Netflix", img: "https://randomuser.me/api/portraits/women/21.jpg" },
  { name: "Rohit Kumar", role: "Placed at Google", img: "https://randomuser.me/api/portraits/men/90.jpg" },
  { name: "Meera Singh", role: "Placed at Meta", img: "https://randomuser.me/api/portraits/women/12.jpg" },
  { name: "Sahil Jain", role: "Speaker at DevFest", img: "https://randomuser.me/api/portraits/men/15.jpg" },
  { name: "Priya Desai", role: "Placed at Adobe", img: "https://randomuser.me/api/portraits/women/33.jpg" },
  { name: "Karthik Rao", role: "Placed at Intel", img: "https://randomuser.me/api/portraits/men/40.jpg" }
];

export default function AchieversAnimated({ items = SAMPLE }) {
  const [cols, setCols] = useState(getCols(window.innerWidth));
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 599);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setCols(getCols(w));
      setIsPhone(w <= 599);
      if (w > 599) setShowAll(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function getCols(w) {
    if (w >= 1400) return 6;
    if (w >= 1100) return 5;
    if (w >= 900) return 4;
    if (w >= 600) return 3;
    return 2;
  }

  // If phone & not expanded -> show first 4, but keep reference to original indices
  const visibleItems = isPhone && !showAll
    ? items.slice(0, 4).map((it, idx) => ({ ...it, __origIndex: idx })) // orig index = 0..3
    : items.map((it, idx) => ({ ...it, __origIndex: idx })); // full list with original indices

  // Key the motion parent so it remounts when toggling showAll on phone (forces framer to re-run animations)
  const parentKey = isPhone ? (showAll ? "phone-all" : "phone-collapsed") : "desktop-full";

  return (
    <section className="achievers-animated">
      <Container>
        <div className="ach-header text-center">
          <h2 className="ach-title">Our Proud Achievers</h2>
          <p className="ach-sub">Celebrating Growth, Grit, and Greatness.</p>
          <div className="ach-pill">They Did It. So Can You.</div>
        </div>

        <motion.div
          key={parentKey}
          className="ach-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09 } }
          }}
        >
          {visibleItems.map((a, i) => {
            // use original index for consistent row calculation
            const origIndex = a.__origIndex;
            const rowIndex = Math.floor(origIndex / cols);
            const fromLeft = rowIndex % 2 === 0;
            const itemVariants = {
              hidden: { opacity: 0, x: fromLeft ? -80 : 80, scale: 0.98 },
              show: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.55, ease: [0.2, 0.9, 0.3, 1] } }
            };

            return (
              <motion.div
                className="ach-card"
                key={origIndex}          // use original index as key
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="ach-media">
                  <img src={a.img} alt={a.name} loading="lazy" />
                </div>
                <div className="ach-chip">
                  <div className="chip-inner">
                    <div className="chip-name">{a.name}</div>
                    <div className="chip-role">{a.role}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {isPhone && items.length > 4 && (
          <div className="ach-more-wrap">
            <button
              className="view-more-btn"
              onClick={() => setShowAll(prev => !prev)}
              aria-expanded={showAll}
            >
              {showAll ? "View Less" : `View More (${items.length - 4})`}
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
