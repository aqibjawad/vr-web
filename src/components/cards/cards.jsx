import React from "react";
import { Card } from "react-bootstrap";
import "./index.css";

const Cards = ({ data }) => {
  return (
    <Card className={`cards`}>
      <div className="cards-image-container">
        <Card.Img variant="top" src={data.image} className="cards-img" />
        <div className="cards-overlay" />
      </div>
      <Card.Body className="text-center text-white">
        <Card.Title className="cards-title">{data.name}</Card.Title>
        <div className="cards-line mx-auto"></div>
      </Card.Body>
    </Card>
  );
};

export default Cards;