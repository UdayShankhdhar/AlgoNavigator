// Home.jsx
import React from "react";
import HeroSection from "../components/HeroSection";
import FeatureCards from "../components/FeatureCards";

const Home = ({ theme }) => {
  return (
    <>
      <HeroSection theme={theme} />
      <FeatureCards theme={theme} />
    </>
  );
};

export default Home;
