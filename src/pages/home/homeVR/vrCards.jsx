import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Cards from "../../../components/cards/cards";

const VRCards = () => {
  const cardsData = [
    {
      id: 1,
      name: "HALL I",
      bgColor: "bg-slate",
      image: "hall1.jpg",
    },
    {
      id: 2,
      name: "HALL II",
      bgColor: "bg-slate",
      image: "hall1.jpg",
    },
    {
      id: 3,
      name: "HALL III",
      bgColor: "bg-slate",
      image: "hall1.jpg",
    },
  ];

  return (
    <Container>
      <Row className="gy-4 mt-5">
        {cardsData.map((hall) => (
          <Col key={hall.id} xs={12} md={6} lg={4}>
            <Cards data={hall} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VRCards;
