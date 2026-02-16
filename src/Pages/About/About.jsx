import React from 'react';
import PageHeroes from '../../Components/PageHeroes/PageHeroes';
import AboutSection from './AboutSection';
import StatsSection from './StatsSection';
import HistorySection from './HistorySection';
import MissionAndValues from './MissionAndValues';
import TransformSection from './TransformSection';
import AboutSummery from './AboutSummery';
import Statsection2 from './Statsection2';

const About = () => {
    return (
        <>
            <PageHeroes pageTitle={"About us"}></PageHeroes>
            <AboutSummery></AboutSummery>
            <Statsection2></Statsection2>
            <AboutSection></AboutSection>
            <StatsSection></StatsSection>
            <HistorySection></HistorySection>
            <MissionAndValues></MissionAndValues>

        </>
    );
};

export default About;