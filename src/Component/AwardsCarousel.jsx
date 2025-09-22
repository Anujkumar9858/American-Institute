import React, { useState, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./AwardsCarousel.css";

export default function AwardsStrip({ items }) {
  const demo = [
    { id: "a1", title: "Cert 1", img: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXdhcmR8ZW58MHx8MHx8fDA%3D" },
    { id: "a2", title: "Cert 2", img: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXdhcmR8ZW58MHx8MHx8fDA%3D" },
    { id: "a3", title: "Cert 3", img: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXdhcmR8ZW58MHx8MHx8fDA%3D" },
    { id: "a4", title: "Cert 4", img: "https://images.unsplash.com/photo-1514820720301-4c4790309f46?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGF3YXJkfGVufDB8fDB8fHww" },
    { id: "a5", title: "Cert 5", img: "https://images.unsplash.com/photo-1665074240972-fb19507f6ec8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGF3YXJkfGVufDB8fDB8fHww" }
  ];
  const data = Array.isArray(items) && items.length ? items : demo;

  const [index, setIndex] = useState(Math.floor(data.length / 2));
  const [dir, setDir] = useState(0); // 1 forward, -1 back — used for animation direction

  const mod = (n) => ((n % data.length) + data.length) % data.length;

  const goNext = useCallback(() => {
    setDir(1);
    setIndex((i) => mod(i + 1));
  }, [data.length]);

  const goPrev = useCallback(() => {
    setDir(-1);
    setIndex((i) => mod(i - 1));
  }, [data.length]);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // visible window: compute 4 items centered on index
  const visibleCount = 4;
  const half = Math.floor(visibleCount / 2);
  const getVisible = () => {
    const arr = [];
    // ensure we always return visibleCount items (wrap around)
    for (let offset = -half; offset < -half + visibleCount; offset++) {
      arr.push(data[mod(index + offset)]);
    }
    return arr;
  };
  const visible = getVisible();

  // framer variants
  const cardVariants = {
    enter: (d) => ({ opacity: 0, y: d > 0 ? 12 : -12, scale: 0.98 }),
    center: { opacity: 1, y: 0, scale: 1 },
    exit: (d) => ({ opacity: 0, y: d > 0 ? -12 : 12, scale: 0.98 })
  };

  return (
    <section className="awards-strip" aria-label="Awards and certificates">
      <Container className="p-0">
        <div className="strip-header">
          <h3 className="strip-title">Awards & Certificates</h3>

          <div className="nav-buttons">
            <button className="nav-btn prev" onClick={goPrev} aria-label="Previous">
              <FaChevronLeft />
            </button>
            <button className="nav-btn next" onClick={goNext} aria-label="Next">
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="strip-row" role="list" aria-label="Certificates list">
          <AnimatePresence initial={false} custom={dir}>
            {visible.map((item, pos) => {
              const centerPos = Math.floor(visible.length / 2);
              const isActive = pos === centerPos;

              return (
                <motion.button
                  key={item.id}
                  className={`strip-card ${isActive ? "active" : ""}`}
                  onClick={() => {
                    setDir(data.indexOf(item) > index ? 1 : -1);
                    setIndex(data.indexOf(item));
                  }}
                  custom={dir}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={cardVariants}
                  transition={{ duration: 0.34, ease: "easeOut" }}
                  role="listitem"
                  aria-current={isActive}
                >
                  <div className="card-inner">
                    {item.img ? (
                      <img src={item.img} alt={item.title} className="card-img" />
                    ) : (
                      <div className="card-placeholder" aria-hidden="true" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="strip-dots" role="tablist" aria-label="Certificates pages">
          {data.map((d, i) => (
            <button
              key={d.id}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => {
                setDir(i > index ? 1 : -1);
                setIndex(i);
              }}
              aria-label={`Go to ${d.title}`}
              aria-selected={i === index}
              role="tab"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
