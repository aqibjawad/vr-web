import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./homeCollection.css"; // custom CSS file

const collectionCards = () => {
  const halls = [
    {
      id: 1,
      name: "Seascape",
      image: "/collect1.png",
    },
    {
      id: 2,
      name: "Realism",
      image: "/collect2.png",
    },
    {
      id: 3,
      name: "Avant Gard",
      image: "/collect2.png",
    },
    {
      id: 4,
      name: "Avant Gard",
      image: "/collect2.png",
    },
  ];

  return (
    <Container>
      <Row className="gy-4 mt-5">
        {halls.map((hall) => (
          <Col key={hall.id} xs={12} md={6} lg={3}>
            <Card className={`collection-card`} style={{ border: 'none' }}>
              <div className="collection-card-image-container">
                <Card.Img
                  variant="top"
                  src={hall.image}
                  className="collection-card-img"
                  style={{ border: 'none', outline: 'none' }}
                />
                <div className="collection-card-overlay" />
              </div>
              <Card.Body className="text-center text-white">
                <Card.Title className="collection-card-title">
                  {hall.name}
                </Card.Title>
                <div className="collection-card-line mx-auto"></div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default collectionCards;
