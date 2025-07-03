import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Cards from "../../../components/cards/cards";

const collectionCards = () => {
  
  const collectoinData = [
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
        {collectoinData.map((collections) => (
          <Col key={collections.id} xs={12} md={6} lg={3}>
            <Cards data={collections} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default collectionCards;
