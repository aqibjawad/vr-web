// components/IntroAnimation.js
import React, { useEffect, useState } from "react";
import "./IntroAnimation.css";

const IntroAnimation = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 3000); // Animation duration (3 seconds)

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    visible && (
      <div className="intro-container">
        <h1 className="animated-name">ARTIFACT</h1>
      </div>
    )
  );
};

export default IntroAnimation;
