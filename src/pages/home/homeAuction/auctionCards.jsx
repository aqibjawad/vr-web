import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Cards from "../../../components/cards/cards";

const AuctionCards = () => {
  const auctionData = [
    {
      id: 1,
      image: "/46.png",
    },
  ];

  return (
    <Container>
      <Row className="gy-4 mt-5">
        {auctionData.map((auction) => (
          <Col key={auction.id} xs={12} md={12} lg={12}>
            <Cards data={auction} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AuctionCards;
