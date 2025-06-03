import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./homehandi.css"; // custom CSS file

const HandiCards = () => {
  const halls = [
    {
      id: 1,
      name: "HALL I",
      image: "/handi1.png",
    },
    {
      id: 2,
      name: "HALL II",
      image: "/handi2.png",
    },
    {
      id: 3,
      name: "HALL III",
      image: "/handi3.png",
    },
    {
      id: 4,
      name: "HALL IV",
      image: "/handi4.png",
    },
  ];

  return (
    <Container>
      <Row className="gy-4 mt-5">
        {halls.map((hall) => (
          <Col key={hall.id} xs={12} md={6} lg={3}>
            <Card className={`handi-card`}>
              <div className="handi-card-image-container">
                <Card.Img
                  variant="top"
                  src={hall.image}
                  className="handi-card-img"
                />
                <div className="handi-card-overlay" />
              </div>
              <Card.Body className="text-center text-white">
                <Card.Title className="handi-card-title">
                  {hall.name}
                </Card.Title>
                <div className="handi-card-line mx-auto"></div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HandiCards;
