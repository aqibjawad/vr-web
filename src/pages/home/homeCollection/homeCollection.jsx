import React from "react";
import "./homeCollection.css";
import HallGallery from "./collectionCards";
const Homecollection = () => {
  return (
    <div className="collectionMain">
      <div className="collectionQuote">
        “The world of reality has its limits; the world of <br /> imagination is
        boundless.”
        <span className="collectionName"> Jean-Jacques Rousseau </span>
      </div>
      <div className="collectionTitle">Collections</div>
      <div className="mt-3">
        <HallGallery />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="moreBtn">Click For More</div>
      </div>

      <div className="collectionQuote">
        "The aim of art is to represent not the outward appearance <br /> of
        things, but their inward significance."
        <span className="collectionName"> Tolstoy </span>
      </div>
    </div>
  );
};

export default Homecollection;
