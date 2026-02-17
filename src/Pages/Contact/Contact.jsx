import React from 'react';
import PageHeroes from '../../Components/PageHeroes/PageHeroes';
import MainContactSection from './MainContactSection';

const Contact = () => {
    return (
        <>
            <PageHeroes pageTitle={"Contact us"}></PageHeroes>
            <MainContactSection></MainContactSection>
        </>
    );
};

export default Contact;