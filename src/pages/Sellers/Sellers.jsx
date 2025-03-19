import React from "react";
import "./sellers.css"; // Import CSS
import SellerCard from "./SellerCard";
import paint from "../../assets/paint.png"
import birds from "../../assets/birds.png"
import paints from "../../assets/paints.png"
import bird from "../../assets/bird.png"

const products = [
  { image: paint, name: "Canvas", price: "$49.99" },
  { image: birds, name: "Art", price: "$39.99" },
  { image: paints, name: "Water Painting", price: "$59.99" },
  { image: bird, name: "Art", price: "$29.99" },
];

const Sellers = () => {
  return (
    <section className="sellers-section">
      <div className="sellers-header">
        <div className="small-box"></div>
        <p className="month-text">This Month</p>
      </div>

      <div className="sellers-title">
        <h1>Top Sellers</h1>
        <button className="view-all-btn">View All</button>
      </div>

      {/* Display Seller Cards */}
      <div className="seller-cards-container">
        {products.map((product, index) => (
          <SellerCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default Sellers;
