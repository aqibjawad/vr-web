import React, { useEffect, useState } from "react";

// Logo Animation Component
const LogoAnimation = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="intro-container">
      <div className="logo-container">
        <div className="logo">
          <img src="/logo2.png" alt="Logo" className="logo-image" />
        </div>
      </div>
    </div>
  );
};

// Company Name Animation Component
const CompanyNameAnimation = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="intro-container">
      <div className="logo-container">
        <div className="company-name">ARTIFACT AUTHENTIC ART INTELLIGENCE</div>
      </div>
    </div>
  );
};

// Main Intro Animation Manager
const IntroAnimation = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState("logo"); // 'logo' or 'company' or 'done'

  const handleLogoComplete = () => {
    setCurrentPage("company");
  };

  const handleCompanyComplete = () => {
    setCurrentPage("done");
    if (onComplete) onComplete();
  };

  if (currentPage === "done") {
    return null;
  }

  return (
    <>
      {currentPage === "logo" && (
        <LogoAnimation onComplete={handleLogoComplete} />
      )}
      {currentPage === "company" && (
        <CompanyNameAnimation onComplete={handleCompanyComplete} />
      )}
    </>
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
    position: fixed;
    left: 10%;
    top: 90%;
    transform: translate(-50%, -50%);
    animation: logoJourney 5s ease-in-out forwards;
    filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.5));
  }

  @keyframes logoJourney {
    0% {
      left: 10%;
      top: 90%;
      transform: translate(-50%, -50%) scale(0.6);
      opacity: 0.6;
    }
    40% {
      left: 50%;
      top: 35%;
      transform: translate(-50%, -50%) scale(1.6);
      opacity: 0.9;
    }
    60% {
      left: 50%;
      top: 35%;
      transform: translate(-50%, -50%) scale(4.0);
      opacity: 1;
    }
    70% {
      left: 50%;
      top: 35%;
      transform: translate(-50%, -50%) scale(5.0);
      opacity: 1;
    }
    85% {
      left: 50%;
      top: 35%;
      transform: translate(-50%, -50%) scale(5.0);
      opacity: 1;
    }
    100% {
      left: 50%;
      top: 35%;
      transform: translate(-50%, -50%) scale(5.0);
      opacity: 1;
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

  /* Company name styling and animation */
  .company-name {
    position: absolute;
    font-family: 'Algerian' !important;
    font-weight: bold;
    color: #FFA218;
    text-shadow: 
      0 1px 0 #ccc,
      0 2px 0 #c9c9c9,
      0 3px 0 #bbb,
      0 4px 0 #b9b9b9,
      0 5px 0 #aaa,
      0 6px 1px rgba(0,0,0,.1),
      0 0 5px rgba(0,0,0,.1),
      0 1px 3px rgba(0,0,0,.3),
      0 3px 5px rgba(0,0,0,.2),
      0 5px 10px rgba(0,0,0,.25),
      0 10px 10px rgba(0,0,0,.2),
      0 20px 20px rgba(0,0,0,.15);
    animation: companyNameDrop 3.5s ease-in-out forwards;
    white-space: nowrap;
    letter-spacing: 3px;
    width: 100%;
    text-align: center;
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  @keyframes companyNameDrop {
    0% {
      top: -50px;
      transform: scale(0.3);
      opacity: 0;
      font-size: 16px;
    }
    30% {
      top: 30%;
      transform: scale(0.7);
      opacity: 0.8;
      font-size: 24px;
    }
    60% {
      top: 50%;
      transform: scale(1.0);
      opacity: 1;
      font-size: 32px;
    }
    80% {
      top: 50%;
      transform: scale(1.0);
      opacity: 1;
      font-size: 32px;
    }
    100% {
      top: 50%;
      transform: scale(1.0);
      opacity: 1;
      font-size: 32px;
    }
  }
`;

// Inject styles into the document
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

export default IntroAnimation;
