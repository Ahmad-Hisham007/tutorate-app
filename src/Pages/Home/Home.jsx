import React from 'react';
import HeroBanner from './HeroBanner';
import TopInstructors from './TopInstructors';
import WhyChooseUs from './WhyChooseUs';
import LatestTuitions from './LatestTuitions';
import DynamicStats from './DynamicStats';


const Home = () => {
    return (

        <>
            <HeroBanner />
            <DynamicStats />

            <TopInstructors></TopInstructors>
            <WhyChooseUs></WhyChooseUs>
            <LatestTuitions></LatestTuitions>
        </>
    );
};

export default Home;