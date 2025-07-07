import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Cards from "../../../components/cards/cards";

const CollectionCards = () => {
  const collectoinData = [
    {
      id: 1,
      name: "Seascape",
      image: "/5.png",
    },
    {
      id: 2,
      name: "Realism",
      image: "/34.png",
    },
    {
      id: 3,
      name: "Avant Gard",
      image: "/34.png",
    },
    {
      id: 4,
      name: "Avant Gard",
      image: "/34.png",
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

export default CollectionCards;
