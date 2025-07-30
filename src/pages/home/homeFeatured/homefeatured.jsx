import React from "react";
import "./homeFeatured.css";
import FeaturedCards from "./featuredCards";
const Homefeatured = () => {
  return (
    <div className="featuredMain">
      <div className="featuredTitle">Featured</div>
      <div>
        <FeaturedCards />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="moreBtn">Click For More</div>
      </div>
      {/* <div className="featuredQuote">
        "Art is a progress towards perfection!”
        <span className="featuredName"> Aristotle </span>
      </div> */}
    </div>
  );
};

export default Homefeatured;
