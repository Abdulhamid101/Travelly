import React from "react";
import Hero from "../components/Hero/Hero.jsx";
import Steps from "../components/Steps/Steps.jsx";
import DestinationHero from "../components/DestinationHero/DestinationHero.jsx";
import TestimonialMap from "../components/TestimonialMap/TestimonialMap.jsx";
import PromoSubscribe from "../components/PromoSubscribe/PromoSubscribe.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <Steps />
      <DestinationHero />
      <TestimonialMap />
      <PromoSubscribe />
    </>
  );
}
