import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Cards from "../../../components/cards/cards";

const HandiCards = () => {
  const handiCrafts = [
    {
      id: 1,
      name: "HALL I",
      image: "/42.png",
    },
    {
      id: 2,
      name: "HALL II",
      image: "/41.png",
    },
    // {
    //   id: 3,
    //   name: "HALL III",
    //   image: "/handi3.png",
    // },
    // {
    //   id: 4,
    //   name: "HALL IV",
    //   image: "/handi4.png",
    // },
  ];

  return (
    <Container>
      <Row className="gy-4 mt-5">
        {handiCrafts.map((handicrafts) => (
          <Col key={handicrafts.id} xs={12} md={6} lg={3}>
            <Cards data={handicrafts} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HandiCards;
