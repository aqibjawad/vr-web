import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Cards from "../../../components/cards/cards";

const GiftCards = () => {
  const giftsData = [
    {
      id: 1,
      name: "Gift 1",
      image: "/43.png",
    },
    {
      id: 2,
      name: "Gift 2",
      image: "/44.png",
    },
    // {
    //   id: 3,
    //   name: "Gift 3",
    //   image: "/gift2.png",
    // },
    // {
    //   id: 4,
    //   name: "Gift 4",
    //   image: "/gift3.png",
    // },
  ];

  return (
    <div>
      <Row className="gy-4 mt-5">
        {giftsData.map((gifts) => (
          <Col key={gifts.id} xs={12} md={6} lg={6}>
            <Cards data={gifts} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GiftCards;
