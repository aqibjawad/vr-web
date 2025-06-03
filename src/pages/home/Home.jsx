import React from 'react'
import HomeVR from './homeVR/homeVR'
import HomeAR from './homeAR/homeAR.jsx'
import Homecollection from './homeCollection/homeCollection.jsx'

const Home = () => {
    return (
        <div>
            <HomeVR />
            <HomeAR />
            <Homecollection />
        </div>
    )
}

export default Home