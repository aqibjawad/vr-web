import React from 'react'
import HomeVR from './homeVR/homeVR'
import HomeAR from './homeAR/homeAR.jsx'
import Homecollection from './homeCollection/homeCollection.jsx'
import Homehandi from "./homeHandiCrafts/homeHandi.jsx";
import Homegift from './homeGifts/homeGift.jsx';

const Home = () => {
    return (
        <div>
            <HomeVR />
            <HomeAR />
            <Homecollection />
            <Homehandi />
            <Homegift />
        </div>
    )
}

export default Home