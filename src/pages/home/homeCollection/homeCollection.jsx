import React from "react";
import "./homeCollection.css";
import CollectionCards from "./collectionCards";
const Homecollection = () => {
  return (
    <div className="collectionMain">
      <div className="collectionQuote">
        “The object of art is not to reproduce reality, but to create a reality
        of the same intensity.” <br />
        <span className="collectionName"> Alberto Giacometti </span>
      </div>
      <div className="collectionTitle">Collections</div>
      <div className="mt-3">
        <CollectionCards />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="moreBtn">Click For More</div>
      </div>

      {/* <div className="collectionQuote">
        "The aim of art is to represent not the outward appearance of things,
        but their inward significance." <br />
        <span className="collectionName"> Tolstoy </span>
      </div> */}
    </div>
  );
};

export default Homecollection;
