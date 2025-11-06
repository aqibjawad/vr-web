import React from "react";
import "./homeAR.css";
import ARCards from "./arCards";
import { Link } from "react-router-dom";

const HomeAR = () => {
  return (
    <div className="arMain">
      <div className="arQuote">
        “The world of reality has its limits; the world of imagination is
        boundless.” <br />
        <span className="vrName"> Jean-Jacques Rousseau </span>
      </div>
      <div className="arTitle mt-5">AR Gallery</div>
      <div>
        <ARCards />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="moreBtn">
          <Link to="/ar" style={{ textDecoration: "none", color: "black" }}>
            Click For More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeAR;
