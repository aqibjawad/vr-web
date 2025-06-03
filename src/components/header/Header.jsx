import React, { useState } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FiMenu, FiSearch } from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";
import "./header.css";
import MegaMenu from "../mega-menu/MegaMenu";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      {/* First Line: Logo and Search Bar with Cart */}
      <div className="header-container">
        <div className="logo-section">
          <div className="logo">LOGO</div>
          <div className="brand-name">ARTIFACT</div>
        </div>
        
        {/* Search Bar and Cart Icon grouped together */}
        <div className="right-section">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search" 
              className="search-bar"
            />
          </div>
          
          <div className="icon-container">
            <RiShoppingCart2Line className="cart-icon" />
          </div>
        </div>
      </div>

      {/* Second Line: Navigation Menu */}
      <div className="nav-container">
        <nav className="nav-menu">
          <a href="#" className="nav-item">
            OUR STORY <IoChevronDown className="dropdown-icon" />
          </a>
          <a href="#" className="nav-item">AR GALLERIES</a>
          <a href="#" className="nav-item">VR TOURS</a>
          <a href="#" className="nav-item">EXHIBITIONS</a>
          <a href="#" className="nav-item">COLLECTIONS</a>
          <a href="#" className="nav-item">
            PRODUCTS <IoChevronDown className="dropdown-icon" />
          </a>
          <a href="#" className="nav-item">FEATURED</a>
          <a href="#" className="nav-item">AUCTIONS</a>
          <a href="#" className="nav-item">
            SPECIAL OFFERS <IoChevronDown className="dropdown-icon" />
          </a>
          <a href="#" className="nav-item">
            LOGIN <IoChevronDown className="dropdown-icon" />
          </a>
        </nav>
      </div>

      {/* Burger Menu Icon */}
      <FiMenu className="menu-icon" onClick={() => setMenuOpen(true)} />

      {/* Mega Menu Component */}
      <MegaMenu isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
};

export default Header;