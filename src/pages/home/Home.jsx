import React from 'react';
import HomeVR from './homeVR/homeVR';
import HomeAR from './homeAR/homeAR.jsx';
import HomeArtist from "./artist/homeAtist.jsx";
import Homecollection from './homeCollection/homeCollection.jsx';
import Homehandi from "./homeHandiCrafts/homeHandi.jsx";
import Homegift from './homeGifts/homeGift.jsx';
import Homefeatured from "./homeFeatured/homefeatured.jsx"
import HomeExhibition from './homeExhibition/homeExhibition.jsx';
import HomeAuction from "../home/homeAuction/homeAuction.jsx";
import ArtGalleryFilter from "../home/homeTable/index.jsx";

import SimpleModelViewer from '../../components/three-js/SimpleModelViewer';

const Home = () => {
    return (
        <div>
            {/* 3D Gallery Section */}
            {/* <div style={{ 
                margin: '20px auto', 
                maxWidth: '1200px',
                padding: '0 20px'
            }}>
                <h2 style={{ 
                    textAlign: 'center', 
                    marginBottom: '20px',
                    color: '#333',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                }}>
                    3D VR Gallery Hall
                </h2>
                <p style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    color: '#666',
                    fontSize: '1.1rem'
                }}>
                    Explore our virtual reality gallery in 3D. Use your mouse to rotate, zoom, and navigate through the space.
                </p>
                <SimpleModelViewer />
                <div style={{
                    textAlign: 'center',
                    marginTop: '15px',
                    fontSize: '0.9rem',
                    color: '#888'
                }}>
                    <p>🖱️ Left click + drag to rotate | 🎯 Scroll to zoom | 🔄 Right click + drag to pan</p>
                </div>
            </div> */}

            {/* Other Home Components */}
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
    );
};

export default Home;