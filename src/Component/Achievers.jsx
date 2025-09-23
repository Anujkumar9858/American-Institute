import React, { useEffect, useState, useRef } from "react";
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

/**
 * useTyping - improved typing hook
 * - lines: array of strings
 * - opts: { typingSpeed, deletingSpeed, pauseAfterTyping, paused, onFirstTyped }
 */
function useTyping(lines = [], opts = {}) {
  const { typingSpeed = 60, deletingSpeed = 45, pauseAfterTyping = 1000, paused = false, onFirstTyped } = opts;
  const [text, setText] = useState("");
  const idxRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);
  const timerRef = useRef(null);
  const firstTypedRef = useRef(false);
  const pausedRef = useRef(Boolean(paused));

  useEffect(() => { pausedRef.current = Boolean(paused); }, [paused]);

  useEffect(() => {
    if (!lines || lines.length === 0) return;

    function tick() {
      if (pausedRef.current) {
        timerRef.current = setTimeout(tick, 200);
        return;
      }

      const current = lines[idxRef.current % lines.length];

      if (!deletingRef.current) {
        charRef.current = Math.min(charRef.current + 1, current.length);
        setText(current.slice(0, charRef.current));

        if (charRef.current === current.length) {
          if (!firstTypedRef.current) {
            firstTypedRef.current = true;
            if (typeof onFirstTyped === "function") {
              try { onFirstTyped(); } catch (e) { /* ignore */ }
            }
          }
          timerRef.current = setTimeout(() => {
            deletingRef.current = true;
            tick();
          }, pauseAfterTyping);
          return;
        }
        timerRef.current = setTimeout(tick, typingSpeed);
      } else {
        charRef.current = Math.max(charRef.current - 1, 0);
        setText(current.slice(0, charRef.current));

        if (charRef.current === 0) {
          deletingRef.current = false;
          idxRef.current = (idxRef.current + 1) % lines.length;
          timerRef.current = setTimeout(tick, typingSpeed);
        } else {
          timerRef.current = setTimeout(tick, deletingSpeed);
        }
      }
    }

    timerRef.current = setTimeout(tick, typingSpeed);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join("|"), typingSpeed, deletingSpeed, pauseAfterTyping]);

  return text;
}

export default function AchieversAnimated({ items = SAMPLE }) {
  const [cols, setCols] = useState(getCols(window.innerWidth));
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 599);
  const [showAll, setShowAll] = useState(false);

  // typed lines
  const subtitleLines = [
    "Celebrating Growth, Grit, and Greatness.",
    "Turning Dreams Into Achievements.",
    "From Learners To Leaders."
  ];
  const pillLines = [
    "They Did It. So Can You.",
    "Your Success Story Starts Here.",
    "Next Achiever Could Be You."
  ];

  // control when pill starts
  const [startPill, setStartPill] = useState(false);

  // subtitle starts immediately; when it first fully types, we enable pill after a short delay
  const typedSubtitle = useTyping(subtitleLines, {
    typingSpeed: 55,
    deletingSpeed: 40,
    pauseAfterTyping: 1200,
    onFirstTyped: () => {
      setTimeout(() => setStartPill(true), 600); // tweak delay if needed
    }
  });

  // pill stays paused until startPill is true; also render it on its own line (see markup)
  const typedPill = useTyping(pillLines, {
    typingSpeed: 55,
    deletingSpeed: 40,
    pauseAfterTyping: 1400,
    paused: !startPill
  });

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

  const visibleItems = isPhone && !showAll
    ? items.slice(0, 4).map((it, idx) => ({ ...it, __origIndex: idx }))
    : items.map((it, idx) => ({ ...it, __origIndex: idx }));

  const parentKey = isPhone ? (showAll ? "phone-all" : "phone-collapsed") : "desktop-full";

  return (
    <section className="achievers-animated">
      <Container>
        <div className="ach-header text-center">
          <h2 className="ach-title">Our Proud Achievers</h2>

          {/* Subtitle — upper line */}
          <div className="ach-sub-wrap">
            <p className="ach-sub typed-sub" aria-live="polite">
              {typedSubtitle}
              <span className="typed-cursor" />
            </p>
          </div>

          {/* Pill — separate lower line */}
          <div className="ach-pill-wrap">
            <div className="ach-pill typed-pill" aria-live="polite">
              {typedPill}
              <span className="typed-cursor" />
            </div>
          </div>
        </div>

        <motion.div
          key={parentKey}
          className="ach-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
        >
          {visibleItems.map((a) => {
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
                key={origIndex}
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
