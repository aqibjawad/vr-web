import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Cards = ({ data }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    // Extract the hall number from the name (e.g., "HALL I" -> "1")
    // or use the id directly if it's a number
    const hallId = typeof data.id === 'number' ? data.id : data.id.toString();
    
    // Navigate to the VR viewer with the hall ID
    navigate(`/vr-viewer?hallId=${hallId}`);
  };
  return (
    <Card className={`cards`} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
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