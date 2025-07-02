import { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div 
        className="hero-background"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      />
      <div className="hero-content">
        <h1>Welcome to Café Delight</h1>
        <p>Experience the perfect blend of artisanal coffee and delightful treats</p>
        <button 
          onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
          className="cta-button"
        >
          Explore Our Menu
        </button>
      </div>
    </section>
  );
};

export default Hero; 