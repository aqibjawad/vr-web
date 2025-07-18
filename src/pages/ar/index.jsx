import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ARCards from "../home/homeAR/arCards";
import SearchBar from "../../components/searhbar";
import ArFilters from "./filter";

const AR = () => {
  return (
    <Container fluid className="mt-5">
      {" "}
      {/* Container add karein */}
      <Row>
        <Col lg={4} md={4} sm={6} xs={12}>
          <div style={{ padding: "20px" }}>
            <ArFilters />
          </div>
        </Col>
        <Col lg={8} md={4} sm={6} xs={12}>
          <SearchBar />
          <div style={{ padding: "20px" }}>
            <ARCards
              gridConfig={{
                xs: 12, // 1 card per row on extra small screens
                sm: 6, // 2 cards per row on small screens
                md: 6, // 2 cards per row on medium screens
                lg: 4, // 2 cards per row on large screens (since this is 8/12 width)
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AR;
