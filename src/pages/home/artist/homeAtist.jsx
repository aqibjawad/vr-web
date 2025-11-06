import React from "react";
import "./homeArtist.css";
import ArtistCards from "./artistCards";

const HomeArtist = () => {
  return (
    <div className="artistMain">
      <div className="artistQuote">
        “The aim of art is to represent not the outward appearance of things,
        but their inward significance.” <br />
        <span className="collectionName"> Aristotle </span>
      </div>

      <div className="arTitle mt-5"> Artists </div>
      <div>
        <ArtistCards />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="moreBtn">Click For More</div>
      </div>

      <div className="artistQuote">
        "A work of art which isn't based on feeling isn't art at all." <br />
        <span className="collectionName"> Paul Cézanne </span>
      </div>
    </div>
  );
};

export default HomeArtist;
