import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./homeVR.css"; // custom CSS file

const VRCards = () => {
  const halls = [
    {
      id: 1,
      name: "HALL I",
      bgColor: "bg-slate",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format",
    },
    {
      id: 2,
      name: "HALL II",
      bgColor: "bg-gray",
      image:
        "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=400&h=300&fit=crop&auto=format",
    },
    {
      id: 3,
      name: "HALL III",
      bgColor: "bg-zinc",
      image:
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&auto=format",
    },
    {
      id: 4,
      name: "HALL IV",
      bgColor: "bg-stone",
      image:
        "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400&h=300&fit=crop&auto=format",
    },
    {
      id: 5,
      name: "HALL V",
      bgColor: "bg-neutral",
      image:
        "https://images.unsplash.com/photo-1549490349-8643362f943f?w=400&h=300&fit=crop&auto=format",
    },
    {
      id: 6,
      name: "HALL VI",
      bgColor: "bg-slate-dark",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&auto=format",
    },
  ];

  return (
    <Container>
      <Row className="gy-4 mt-5">
        {halls.map((hall) => (
          <Col key={hall.id} xs={12} md={6} lg={4}>
            <Card className={`vr-card`}>
              <div className="vr-card-image-container">
                <Card.Img variant="top" src={hall.image} className="vr-card-img" />
                <div className="vr-card-overlay" />
              </div>
              <Card.Body className="text-center text-white">
                <Card.Title className="vr-card-title">{hall.name}</Card.Title>
                <div className="vr-card-line mx-auto"></div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VRCards;
