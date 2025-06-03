import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./homeGift.css"; // custom CSS file

const GiftCards = () => {
  const halls = [
    {
      id: 1,
      name: "HALL I",
      image: "/gift1.png",
    },
    {
      id: 2,
      name: "HALL II",
      image: "/gift2.png",
    },
    {
      id: 3,
      name: "HALL III",
      image: "/gift3.png",
    },
  ];

  return (
    <Container>
      <Row className="gy-4 mt-5">
        {halls.map((hall) => (
          <Col key={hall.id} xs={12} md={6} lg={3}>
            <Card className={`gift-card`}>
              <div className="gift-card-image-container">
                <Card.Img
                  variant="top"
                  src={hall.image}
                  className="gift-card-img"
                />
                <div className="gift-card-overlay" />
              </div>
              <Card.Body className="text-center text-white">
                <Card.Title className="gift-card-title">
                  {hall.name}
                </Card.Title>
                <div className="gift-card-line mx-auto"></div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GiftCards;
