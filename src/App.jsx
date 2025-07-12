import React, { useState } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import IntroAnimation from "./pages/intro/intro"; // <-- Import animation

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleAnimationComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="app-container">
      {showIntro ? (
        <IntroAnimation onComplete={handleAnimationComplete} />
      ) : (
        <>
          <Header />
          <main className="main-content">
            <Home />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
