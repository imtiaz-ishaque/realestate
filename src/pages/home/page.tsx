
import React from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import AboutPlatform from './components/AboutPlatform';
import FeaturedProperties from './components/FeaturedProperties';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutPlatform />
      <FeaturedProperties />
      <Footer />
    </div>
  );
};

export default HomePage;
