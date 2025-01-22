import React from 'react';
import { NavBar } from './navbar';
import HeroSection from './hero';
import CompanyLogos from './company-logos';
import CoursesSection from './courses-section';
import LearningJourney from './LearningJourney';
import TestSection from './testsection';
import Leaderboard from './leaderboard';
import WhyGenAiLearning from './whygenai';
import HireSection from './hire';
import TestimonialsSection from './testimonials';
import Footer from './footer';

const HomepgMain1 = () => {
  return (
    <div className="">
      <NavBar/>
      <HeroSection/>
      <CompanyLogos/>
      <CoursesSection/>
      <LearningJourney/>
      <TestSection/>
      <Leaderboard />
      <WhyGenAiLearning/>
      <TestimonialsSection/>
      <HireSection/>
      <Footer/>
    </div>
  );
};

export default HomepgMain1;
