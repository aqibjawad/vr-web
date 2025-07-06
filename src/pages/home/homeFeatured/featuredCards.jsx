import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Cards from "../../../components/cards/cards";

const FeaturedCards = () => {
  const giftsData = [
    {
      id: 1,
      name: "Gift 1",
      image: "/gift4.png",
    },
    {
      id: 2,
      name: "Gift 2",
      image: "/gift1.png",
    },
    {
      id: 2,
      name: "Gift 3",
      image: "/gift1.png",
    },
    {
      id: 2,
      name: "Gift 4",
      image: "/gift1.png",
    },
  ];

  return (
    <Container>
      <Row className="gy-4 mt-5">
        {giftsData.map((gifts) => (
          <Col key={gifts.id} xs={12} md={6} lg={6}>
            <Cards data={gifts} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedCards;
