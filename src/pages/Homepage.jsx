import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HardwareCarousel from '../components/HardwareCarousel';
import LegalFootnotes from '../components/LegalFootnotes';
import FeatureExplorer from '../components/FeatureExplorer';
import ClosingCta from '../components/ClosingCta';


export function Homepage() {
    return (
        <>
       <Hero/>
       <Features/>
       <HardwareCarousel/>

         <FeatureExplorer/>    
         <ClosingCta/>
       <LegalFootnotes/>
     
       </>
    );
}

export default Homepage;