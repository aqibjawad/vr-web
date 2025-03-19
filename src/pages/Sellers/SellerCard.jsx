import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import "./sellerCard.css"; // Import CSS

const SellerCard = ({ image, name, price }) => {
  return (
    <div className="seller-card">
      {/* Product Image */}
      <img src={image} alt={name} className="product-image" />

      {/* Icons (Eye & Heart) */}
      <div className="card-icons">
        <MdOutlineRemoveRedEye className="icon" />
        <CiHeart className="icon" />
      </div>

      {/* Product Details */}
      <p className="product-name">{name}</p>
      <p className="product-price">{price}</p>

      {/* Rating (5 Stars + (60) */}
      <div className="rating">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="star-icon" />
        ))}
        <span className="rating-number">(60)</span>
      </div>
    </div>
  );
};

export default SellerCard;
