import { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      {
        threshold: 0.1
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-content">
        <h2>Our Story</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              Founded in 2020, Café Delight began with a simple mission: to create a warm,
              welcoming space where quality coffee meets community. Our journey started
              with a passion for perfectly roasted beans and the art of coffee making.
            </p>
            <p>
              Today, we pride ourselves on sourcing the finest coffee beans from sustainable
              farms around the world. Each cup is crafted with care by our expert baristas,
              ensuring a delightful experience with every sip.
            </p>
            <p>
              But we're more than just a coffee shop. We're a gathering place for friends,
              a quiet corner for contemplation, and a hub for our local community. Come
              join us and be part of our story.
            </p>
          </div>
          <div className="about-features">
            <div className="feature">
              <span className="feature-icon">🌱</span>
              <h3>Sustainable</h3>
              <p>Ethically sourced beans from fair-trade farms</p>
            </div>
            <div className="feature">
              <span className="feature-icon">👨‍🍳</span>
              <h3>Artisanal</h3>
              <p>Handcrafted beverages by skilled baristas</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🤝</span>
              <h3>Community</h3>
              <p>A welcoming space for everyone</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 