import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./homeAR.css"

const ARCards = () => {
  const halls = [
    {
      id: 1,
      bgColor: "bg-slate",
      image: "/ar1.png",
    },
    {
      id: 2,
      bgColor: "bg-gray",
      image: "/ar2.png",
    },
    {
      id: 3,
      bgColor: "bg-zinc",
      image: "/ar3.png",
    },
    {
      id: 4,
      bgColor: "bg-zinc",
      image: "/ar4.png",
    },
  ];

  return (
    <div>
      <Row className="mt-5">
        {halls.map((hall) => (
          <Col key={hall.id} xs={12} md={6} lg={3}>
            <Card className={`ar-card`} style={{ border: 'none' }}>
              <div className="ar-card-image-container">
                <Card.Img
                  variant="top"
                  src={hall.image}
                  className="ar-card-img"
                  style={{ border: 'none', outline: 'none' }}
                />
                <div className="ar-card-overlay" />
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