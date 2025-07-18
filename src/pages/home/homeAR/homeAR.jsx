import React from "react";
import "./homeAR.css";
import ARCards from "./arCards";
import { Link } from "react-router-dom";

const HomeAR = () => {
  return (
    <div className="arMain">
      <div className="arTitle">AR Gallery</div>
      <div>
        <ARCards />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="moreBtn">
          <Link to="/ar" style={{textDecoration:"none", color:"black"}}>Click For More</Link>
        </div>
      </div>
    </div>
  );
};

export default HomeAR;
