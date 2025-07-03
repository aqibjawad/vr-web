import React from "react";
import "./homeVR.css";
import HallGallery from "./vrCards";
const HomeVR = () => {
  return (
    <div className="vrMain">
      <div className="homeVRhead">
        Welcome to the world of art, where any possibility could be real
        and any reality could be possible!
      </div>
      <div className="vrTitle">VR Gallery</div>
      <div>
        <HallGallery />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="moreBtn">Click For More</div>
      </div>

      <div className="vrQuote">
        “The world of reality has its limits; the world of imagination is boundless.” <br />
        <span className="vrName"> Jean-Jacques Rousseau </span>
      </div>
    </div>
  );
};

export default HomeVR;
