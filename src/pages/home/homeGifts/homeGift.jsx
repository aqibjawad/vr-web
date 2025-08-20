import React from "react";
import "./homeGift.css";
import GiftCards from "./giftCards";
const Homegift = () => {
  return (
    <div className="giftMain">
      <div className="collectionQuote">
        “"Creativity is piercing the mundane to find the marvelous.” <br />
        <span className="collectionName"> Bill Moyers </span>
      </div>

      <div className="giftTitle">Gifts</div>
      <div>
        <GiftCards />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="moreBtn">Click For More</div>
      </div>
      {/* <div className="giftQuote">
        "Art is a progress towards perfection!”
        <span className="giftName"> Aristotle </span>
      </div> */}
    </div>
  );
};

export default Homegift;
