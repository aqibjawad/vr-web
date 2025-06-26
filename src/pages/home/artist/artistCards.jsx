import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./homeArtist.css";

const ArtistCards = () => {
  const halls = [
    {
      id: 1,
      bgColor: "bg-slate",
      name: "Seascape",
      image: "/artist1.png",
    },
    {
      id: 2,
      bgColor: "bg-gray",
      name: "Seascape",
      image: "/artist1.png",
    },
    {
      id: 3,
      bgColor: "bg-zinc",
      name: "Seascape",
      image: "/artist1.png",
    },
    {
      id: 4,
      bgColor: "bg-zinc",
      name: "Seascape",
      image: "/artist1.png",
    },
  ];

  return (
    <div>
      <Row className="mt-5">
        {halls.map((hall) => (
          <Col key={hall.id} xs={12} md={6} lg={3}>
            <Card className={`artist-card`} style={{ border: "none" }}>
              <div className="artist-card-image-container">
                <Card.Img
                  variant="top"
                  src={hall.image}
                  className="artist-card-img"
                  style={{ border: "none", outline: "none" }}
                />
                <div className="artist-card-overlay" />
              </div>
              <Card.Body className="text-left text-white">
                <Card.Title className="artist-card-title">
                  {hall.name}
                </Card.Title>
                <div className="artist-card-line mx-auto"></div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ArtistCards;
