import React from "react";
import "./homeArtist.css";
import ArtistCards from "./artistCards";

const HomeArtist = () => {
  return (
    <div className="arMain">
      <div className="arTitle"> Artists </div>
      <div>
        <ArtistCards />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="moreBtn">Click For More</div>
      </div>
    </div>
  );
};

export default HomeArtist;
