import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "./StatsAmerican.css";

/* CountUp now waits for `start` prop before animating */
const CountUp = ({ end, duration = 2, start = false }) => {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start) return;
    if (startedRef.current) return;
    startedRef.current = true;

    let startVal = 0;
    const steps = Math.max(1, Math.floor(duration * 60));
    const increment = end / steps;
    const intervalMs = Math.max(10, Math.floor((duration * 1000) / steps));

    const timer = setInterval(() => {
      startVal += increment;
      if (startVal >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(startVal));
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [end, duration, start]);

  return (
    <span className="gradient-number">
      {count.toLocaleString()}<span className="plus-sign">+</span>
    </span>
  );
};

/* Typewriter that only runs when `active` becomes true and hides cursor on done */
const Typewriter = ({ text = "", speed = 26, startDelay = 0, active = false, onDone }) => {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplay(text);
      setDone(true);
      if (onDone) onDone();
      return;
    }

    if (!active) return; // wait until active becomes true
    if (startedRef.current) return;
    startedRef.current = true;

    let mounted = true;
    let i = 0;
    const startTimer = setTimeout(() => {
      const id = setInterval(() => {
        if (!mounted) return;
        if (i >= text.length) {
          clearInterval(id);
          setDone(true); // hide cursor when finished
          if (onDone) onDone();
          return;
        }
        setDisplay((prev) => prev + text.charAt(i));
        i += 1;
      }, speed);
    }, startDelay);

    return () => {
      mounted = false;
      clearTimeout(startTimer);
    };
  }, [text, speed, startDelay, active, onDone]);

  return (
    <span className="stat-typewriter">
      {display}
      {!done && <span aria-hidden="true" className="stat-typewriter-cursor" />}
    </span>
  );
};

const StatsAmerican = () => {
  const stats = [
    { number: 500, text: "Students learning currently in offline class" },
    { number: 800, text: "Students learning currently in online class" },
    { number: 12000, text: "Students taught and get placed at companies" },
  ];

  // track which cards have been activated (in-view)
  const [activated, setActivated] = useState(() => new Array(stats.length).fill(false));

  const handleEnter = (idx) => {
    setActivated((prev) => {
      if (prev[idx]) return prev;
      const copy = [...prev];
      copy[idx] = true;
      return copy;
    });
  };

  return (
    <Container className="my-5">
      <Row>
        {stats.map((stat, idx) => {
          const countDuration = 2; // seconds
          const typeStartDelay = 120; // ms after activation

          return (
            <Col key={idx} md={4} className="mb-3">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.12 }}
                viewport={{ once: true, amount: 0.5 }}
                onViewportEnter={() => handleEnter(idx)}
              >
                <Card className="stat-card p-4 border-0">
                  <h2 className="stat-number">
                    <CountUp end={stat.number} duration={countDuration} start={activated[idx]} />
                  </h2>
                  <p className="stat-text">
                    <Typewriter
                      text={stat.text}
                      speed={26}
                      startDelay={typeStartDelay}
                      active={activated[idx]}
                    />
                  </p>
                </Card>
              </motion.div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default StatsAmerican;
