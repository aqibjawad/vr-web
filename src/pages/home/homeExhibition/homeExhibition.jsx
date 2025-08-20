import React from "react";
import "./homeExhibition.css";
import ExhibitionCards from "./exhibitionCards";
const HomeExhibition = () => {
  return (
    <div className="exhibitionMain">
      <div className="exhibitionTitle">Exhibition</div>
      <div className="exhibitionQuote">
        Painting is a means of self-enlightenment."
        <span className="exhibitionName"> John Olsen </span>
      </div>
      <div>
        <ExhibitionCards />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="moreBtn">Click For More</div>
      </div>
      {/* <div className="exhibitionQuote">
        Painting is a means of self-enlightenment."
        <span className="exhibitionName"> John Olsen </span>
      </div> */}
    </div>
  );
};

export default HomeExhibition;
