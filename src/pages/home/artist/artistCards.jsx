import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Cards from "../../../components/cards/cards";

const ArtistCards = () => {
  const artistsData = [
    {
      id: 1,
      bgColor: "bg-slate",
      name: "Seascape",
      image: "/38.png",
    },
    {
      id: 2,
      bgColor: "bg-gray",
      name: "Seascape",
      image: "/33.png",
    },
    {
      id: 3,
      bgColor: "bg-slate",
      name: "Seascape",
      image: "/38.png",
    },
    {
      id: 4,
      bgColor: "bg-gray",
      name: "Seascape",
      image: "/33.png",
    },
    // {
    //   id: 3,
    //   bgColor: "bg-zinc",
    //   name: "Seascape",
    //   image: "/artist1.png",
    // },
    // {
    //   id: 4,
    //   bgColor: "bg-zinc",
    //   name: "Seascape",
    //   image: "/artist1.png",
    // },
  ];

  return (
    <Container>
      <Row className="gy-4  mt-5">
        {artistsData.map((artists) => (
          <Col key={artists.id} xs={12} md={6} lg={3}>
            <Cards data={artists} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ArtistCards;
