import React, { useEffect, useState } from "react";

const IntroAnimation = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 7000); // Increased to 7 seconds for slower animation

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    visible && (
      <div className="intro-container">
        <div className="logo-container">
          <div className="logo">
            <img
              src="/logo2.png"
              alt="Logo"
              className="logo-image"
            />
          </div>
        </div>
      </div>
    )
  );
};

// CSS styles embedded in the component
const styles = `
  .intro-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    overflow: hidden;
  }

  .logo-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    position: absolute;
    animation: logoJourney 7s ease-in-out forwards;
    filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
  }

  @keyframes logoJourney {
    0% {
      transform: scale(0.3);
      opacity: 0.6;
      left: 20px;
      bottom: 20px;
      top: auto;
    }
    25% {
      transform: scale(0.8);
      opacity: 0.9;
      left: 35%;
      bottom: 35%;
      top: auto;
      margin-left: -40px;
      margin-bottom: -40px;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
      left: 50%;
      bottom: 50%;
      top: auto;
      margin-left: -40px;
      margin-bottom: -40px;
    }
    70% {
      transform: scale(1.5);
      opacity: 1;
      left: 50%;
      bottom: 50%;
      top: auto;
      margin-left: -40px;
      margin-bottom: -40px;
    }
    85% {
      transform: scale(1.5);
      opacity: 0.8;
      left: 50%;
      bottom: 50%;
      top: auto;
      margin-left: -40px;
      margin-bottom: -40px;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
      left: 50%;
      bottom: 50%;
      top: auto;
      margin-left: -40px;
      margin-bottom: -40px;
    }
  }

  /* Logo image styling */
  .logo-image {
    width: 80px;
    height: 80px;
    object-fit: contain;
    border-radius: 10px;
    animation: pulse 2s ease-in-out 2.5s infinite alternate;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.05);
    }
  }
`;

// Inject styles into the document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

export default IntroAnimation;