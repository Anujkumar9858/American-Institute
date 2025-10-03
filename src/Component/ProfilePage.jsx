// src/components/ProfilePage.jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";  // ✅ use logout
import "./ProfilePage.css";

export default function ProfilePage() {
  const { logout } = useAuth(); // ✅ logout from context

  const [profile, setProfile] = useState({
    fullName: "Anuj Kumar",
    email: "anuj@example.com",
    country: "India",
    city: "Bhopal",
    zip: "462001",
    phone: "9876543210",
    profilePic: "https://i.pravatar.cc/150?img=5"
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Profile updated:", profile);
    alert("✅ Changes saved successfully!");
  };

  return (
    <section className="profile-section">
      <Container>
        <Row>
          {/* Sidebar */}
          <Col md={3} className="sidebar">
            <Nav className="flex-column">
              <Nav.Link className="active">Profile</Nav.Link>
              <Nav.Link>Enrolled Course</Nav.Link>
              <Nav.Link>Payment History</Nav.Link>
              <Nav.Link>Certificate</Nav.Link>

              {/* ✅ Logout Button */}
              <Button 
                variant="danger" 
                className="logout-btn mt-4 d-flex align-items-center justify-content-center gap-2"
                onClick={logout}
              >
                <FaSignOutAlt /> Logout
              </Button>
            </Nav>
          </Col>

          {/* Main Profile */}
          <Col md={9} className="profile-content">
            <h3>Your Information</h3>
            <div className="profile-avatar-wrap">
              <img src={profile.profilePic} alt="Profile" className="profile-avatar" />
              <button className="edit-btn"><FaEdit /></button>
            </div>

            <Form className="profile-form">
              <Form.Group className="mb-3">
                <Form.Label>Full name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      value={profile.country}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={profile.city}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Zip code</Form.Label>
                    <Form.Control
                      type="text"
                      name="zip"
                      value={profile.zip}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" className="save-btn" onClick={handleSave}>
                Save Changes
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
