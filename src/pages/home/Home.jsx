import React, { useState } from "react";
import IntroAnimation from "../intro/intro";
import HomeVR from './homeVR/homeVR';
import HomeAR from './homeAR/homeAR.jsx';
import HomeArtist from "./artist/homeAtist.jsx";
import Homecollection from './homeCollection/homeCollection.jsx';
import Homehandi from "./homeHandiCrafts/homeHandi.jsx";
import Homegift from './homeGifts/homeGift.jsx';
import Homefeatured from "./homeFeatured/homefeatured.jsx";
import HomeExhibition from './homeExhibition/homeExhibition.jsx';
import HomeAuction from "../home/homeAuction/homeAuction.jsx";
import ArtGalleryFilter from "../home/homeTable/index.jsx";

const Home = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleAnimationComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="home-container">
      {showIntro ? (
        <IntroAnimation onComplete={handleAnimationComplete} />
      ) : (
        <div className="home-content">
          {/* All Home Components */}
          <HomeVR />
          <HomeAR />
          <Homecollection />
          <HomeArtist />
          <Homehandi />
          <Homegift />
          <Homefeatured />
          <HomeExhibition />
          <HomeAuction />
          <ArtGalleryFilter />
        </div>
      )}
    </div>
  );
};

export default Home;