import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Cards from "../../../components/cards/cards";

const ExhibitionCards = () => {
  const exhibitionData = [
    {
      id: 1,
      name: "Exhibition 1",
      image: "/46.png",
    },
    // {
    //   id: 2,
    //   name: "Gift 2",
    //   image: "/gift1.png",
    // },
    // {
    //   id: 2,
    //   name: "Gift 3",
    //   image: "/gift1.png",
    // },
    // {
    //   id: 2,
    //   name: "Gift 4",
    //   image: "/gift1.png",
    // }
    
  ];

  return (
    <Container>
      <Row className="gy-4 mt-5">
        {exhibitionData.map((gifts) => (
          <Col key={gifts.id} xs={12} md={12} lg={12}>
            <Cards data={gifts} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExhibitionCards;
