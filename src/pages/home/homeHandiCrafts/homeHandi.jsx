import React from "react";
import "./homeHandi.css";
import HandiCards from "./handiCards";
const Homehandi = () => {
  return (
    <div className="handiMain">
      <div className="handiTitle">Handi Crafts</div>
      <div>
        <HandiCards />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="moreBtn">Click For More</div>
      </div>
    </div>
  );
};

export default Homehandi;
