import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Cards from "../../../components/cards/cards";

const VRCards = () => {
  const cardsData = Array.from({ length: 3 }, (_, index) => {
    const hallNumber = index + 1;
    return {
      id: hallNumber,
      name: `HALL ${hallNumber}`,
      bgColor: "bg-slate",
      image: "hall1.jpg", // Use hall1.jpg as a placeholder for all halls
    };
  });

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
