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
    // {
    //   id: 2,
    //   name: "HALL II",
    //   bgColor: "bg-gray",
    //   image:
    //     "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=400&h=300&fit=crop&auto=format",
    // },
    // {
    //   id: 3,
    //   name: "HALL III",
    //   bgColor: "bg-zinc",
    //   image:
    //     "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&auto=format",
    // }
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
