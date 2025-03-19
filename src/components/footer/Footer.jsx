import React from "react";
import "./footer.css";
import { IoMdSend } from "react-icons/io";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import playstore from "../../assets/playstore.png"
import apppstore from "../../assets/apppstore.png"
import appstore from "../../assets/appstore.png"


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Exclusive Column */}
                <div className="footer-column exclusive-column">
                    <h3>Exclusive</h3>
                    <p>Subscribe</p>
                    <p>Get 10% off your first order</p>

                    <div className="footer-input">
                        <input type="text" placeholder="Enter your email" />
                        <IoMdSend className="send-icon" />
                    </div>

                </div>


                {/* Support Column */}
                <div className="footer-column">
                    <h3>Support</h3>
                    <p>111 Bijoy sarani,Dhaka, keajfoaj</p>
                    <p>DH 1515, Bangladesh</p>
                    <p>exclusive@gmail.com</p>
                    <p>+88139-75982-3745</p>
                </div>

                {/* Account Column */}
                <div className="footer-column">
                    <h3>Account</h3>
                    <p>My Account</p>
                    <p>Login / Register</p>
                    <p>Cart</p>
                    <p>Wishlist Order</p>
                    <p>Shop</p>
                </div>

                {/* Quick Links Column */}
                <div className="footer-column">
                    <h3>Quick Link</h3>
                    <p>Privacy Policy </p>
                    <p>Terms Of Use</p>
                    <p>FAQ</p>
                    <p>Contact</p>
                </div>

                {/* Download App Column */}
                <div className="footer-column download-column">
                    <h3>Download App</h3>
                    <p>Save $3 with App New User only</p>

                    {/* App Images Section */}
                    <div className="app-images">
                        {/* Left Image */}
                        <img src={playstore} alt="QR Code" className="qr-image" />

                        {/* Right Side - Two Stacked Images */}
                        <div className="app-store-images">
                            <img src={appstore} alt="Play Store" />
                            <img src={apppstore} alt="App Store" />
                        </div>
                    </div>

                    {/* Social Media Icons */}
                    <div className="social-icons">
                        <FaFacebookF />
                        <CiTwitter />
                        <FaLinkedinIn />
                        <FaInstagram />
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
