import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./homeAR.css";

const ARCards = ({ halls = [], gridConfig = {} }) => {
  // Default grid configuration
  const defaultGridConfig = {
    xs: 12,
    sm: 6,
    md: 6,
    lg: 3,
  };

  // Merge with passed grid config
  const grid = { ...defaultGridConfig, ...gridConfig };

  // Fallback data if no halls provided (for backward compatibility)
  const fallbackHalls = [
    {
      id: 1,
      bgColor: "bg-slate",
      image: "/10.png",
      name: "Hall 1",
      qrCode: "/qr-hall1.jpg", // Add QR code for each hall
    },
    {
      id: 2,
      bgColor: "bg-gray",
      image: "/32.png",
      name: "Hall 2",
      qrCode: "/qr-hall1.jpg",
    },
    {
      id: 3,
      bgColor: "bg-zinc",
      image: "/40.png",
      name: "Hall 3",
      qrCode: "/qr-hall1.jpg",
    },
    {
      id: 4,
      bgColor: "bg-zinc",
      image: "/47.png",
      name: "Hall 4",
      qrCode: "/qr-hall1.jpg",
    },
  ];

  const displayHalls = halls.length > 0 ? halls : fallbackHalls;

  return (
    <div>
      <Row className="mt-5">
        {displayHalls.map((hall) => (
          <Col
            key={hall.id}
            xs={grid.xs}
            sm={grid.sm}
            md={grid.md}
            lg={grid.lg}
            className="mb-4"
          >
            <Card className={`ar-card`} style={{ border: "none" }}>
              <div className="ar-card-image-container">
                <Card.Img
                  variant="top"
                  src={hall.image}
                  className="ar-card-img"
                  style={{ border: "none", outline: "none" }}
                />
                <div className="ar-card-overlay" />
                
                {/* QR Code with hover effect */}
                <div className="qr-code-container">
                  <img
                    src={hall.qrCode || "/default-qr.png"}
                    alt={`QR Code for ${hall.name}`}
                    className="qr-code-small"
                  />
                </div>
              </div>
              <Card.Body className="text-center text-white">
                <Card.Title className="ar-card-title">{hall.name}</Card.Title>
                <div className="ar-card-line mx-auto"></div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ARCards;