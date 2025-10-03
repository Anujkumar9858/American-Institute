import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./CourseEnroll.css";

export default function CourseEnroll() {
  const [course, setCourse] = useState("");
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    country: "",
    city: "",
    zipcode: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!course) {
      alert("⚠️ Please select a course before proceeding.");
      return;
    }
    console.log("Form Data:", { ...formData, course });
    navigate("/payment");
  };

  return (
    <section className="enroll-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="enroll-card">
              {/* Course Selection - always on top */}
              <div className="course-select-block">
                <motion.h3
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  🎓 Choose your Course
                </motion.h3>

                <div className="course-options">
                  {["English Mastery Course (Online)", "English Mastery Course (Offline)"].map(
                    (c, i) => (
                      <label
                        key={i}
                        className={`course-option ${course === c ? "active" : ""}`}
                      >
                        <input
                          type="radio"
                          name="course"
                          value={c}
                          checked={course === c}
                          onChange={(e) => setCourse(e.target.value)}
                        />
                        {c}
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Fill in Details - below course block */}
              <div className="details-block mt-4">
                <h4>📝 Fill in Details</h4>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="First name"
                          name="first"
                          value={formData.first}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Last name"
                          name="last"
                          value={formData.last}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="City"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Zipcode"
                          name="zipcode"
                          value={formData.zipcode}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Phone number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="next-btn mt-3"
                  >
                    Continue to Payment →
                  </motion.button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
