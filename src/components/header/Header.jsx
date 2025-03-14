import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import "./header.css";
import MegaMenu from "../mega-menu/MegaMenu";

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">LOGO</div>

                {/* Desktop Navigation */}
                <nav className="nav-menu">
                    <a href="#">Home</a>
                    <a href="#">Our Story</a>
                    <a href="#">Products</a>
                    <a href="#">Services</a>
                    <a href="#">VR Museum</a>
                    <a href="#">Seller Account</a>
                    <a href="#">Contact Us</a>
                </nav>

                {/* Wishlist & Cart Icons */}
                <div className="icon-container">
                    <CiHeart />
                    <RiShoppingCart2Line />
                </div>
            </div>

            {/* Burger Menu Icon (Outside header-container) */}
            <FiMenu className="menu-icon" onClick={() => setMenuOpen(true)} />

            {/* Mega Menu Component */}
            <MegaMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
        </header>
    );
};

export default Header;
