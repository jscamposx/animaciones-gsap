import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HardwareCarousel from '../components/HardwareCarousel';
export function Homepage() {
    return (
        <>
       <Hero/>
       <Features/>
       <HardwareCarousel/>
       </>
    );
}

export default Homepage;