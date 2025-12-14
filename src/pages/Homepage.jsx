import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Carousel from "../components/Carousel";
import LegalFoot from "../components/LegalFoot";
import GrowthSection from "../components/GrowthSection";
import GetStartedSection from "../components/GetStartedSection";
import Reviews from "../components/Reviews";

export function Homepage() {
  return (
    <>
      <Hero />
      <Features />
      <Carousel />
      <GrowthSection />
      <Reviews />
      <GetStartedSection />
      <LegalFoot />
    </>
  );
}

export default Homepage;
