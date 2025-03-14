import React from "react";
import { CiHeart } from "react-icons/ci";
import { RiShoppingCart2Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import "./megaMenu.css";

const MegaMenu = ({ isOpen, onClose }) => {
    return (
        <div className={`mega-menu ${isOpen ? "open" : ""}`}>
            {/* Close Button */}
            <button className="close-btn" onClick={onClose}>
                <AiOutlineClose />
            </button>

            {/* Navigation Links */}
            <nav className="mega-nav">
                <a href="#">Home</a>
                <a href="#">Our Story</a>
                <a href="#">Products</a>
                <a href="#">Services</a>
                <a href="#">VR Museum</a>
                <a href="#">Seller Account</a>
                <a href="#">Contact Us</a>
            </nav>

            {/* Icons */}
            <div className="mega-icons">
                <CiHeart />
                <RiShoppingCart2Line />
            </div>
        </div>
    );
};

export default MegaMenu;
