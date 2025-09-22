import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "./StatsAmerican.css";

const CountUp = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60); // 60 fps approx
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(start));
      }
    }, 25);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}+</span>;
};

const StatsAmerican = () => {
  const stats = [
    { number: 500, text: "Students learning currently in offline class" },
    { number: 800, text: "Students learning currently in online class" },
    { number: 12000, text: "Students taught and get placed at companies" },
  ];

  return (
    <Container className="my-5">
      <Row>
        {stats.map((stat, idx) => (
          <Col key={idx} md={4} className="mb-3">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="stat-card p-4 border-0">
                <h2 className="stat-number">
                  <CountUp end={stat.number} duration={2} />
                </h2>
                <p className="stat-text">{stat.text}</p>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StatsAmerican;
