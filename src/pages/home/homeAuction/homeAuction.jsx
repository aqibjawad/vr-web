import React from "react";
import "./homeAuction.css";
import AuctionCards from "./auctionCards";

const HomeAuction = () => {
  return (
    <div className="auctionMain">
      <div className="auctionTitle">Auction</div>
      <div className="auctionQuote">
        Painting is poetry that is seen rather than felt, and poetry is painting that is felt rather than seen.”
        <span className="auctionName"> Leonardo da Vinci </span>
      </div>
      <div>
        <AuctionCards />
      </div>
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="moreBtn">Click For More</div>
      </div> */}
      {/* <div className="auctionQuote">
        Painting is a means of self-enlightenment."
        <span className="auctionName"> John Olsen </span>
      </div> */}
    </div>
  );
};

export default HomeAuction;
