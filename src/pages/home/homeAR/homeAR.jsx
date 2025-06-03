import React from "react";
import "./homeAR.css";
import ARCards from "./arCards";

const HomeAR = () => {
  return (
    <div className="arMain">
      <div className="arTitle">AR Gallery</div>
      <div>
        <ARCards />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="moreBtn">Click For More</div>
      </div>
    </div>
  );
};

export default HomeAR;
