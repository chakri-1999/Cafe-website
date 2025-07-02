import { useState } from 'react';
import './Navbar.css';
import SignInModal from './SignInModal';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const handleSignIn = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setIsSignInModalOpen(false);
  };

  const handleSignOut = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>Café Delight</h1>
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li>
            <button 
              className={activeSection === 'home' ? 'active' : ''}
              onClick={() => scrollToSection('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              className={activeSection === 'menu' ? 'active' : ''}
              onClick={() => scrollToSection('menu')}
            >
              Menu
            </button>
          </li>
          <li>
            <button 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={() => scrollToSection('about')}
            >
              About
            </button>
          </li>
          <li>
            <button 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </li>
          <li className="auth-buttons">
            {isLoggedIn ? (
              <div className="user-menu">
                <button className="user-button">
                  👤 {user.name}
                </button>
                <div className="user-dropdown">
                  <button onClick={handleSignOut}>Sign Out</button>
                </div>
              </div>
            ) : (
              <button 
                className="sign-in-btn"
                onClick={() => setIsSignInModalOpen(true)}
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </nav>
      <SignInModal 
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSignIn={handleSignIn}
      />
    </>
  );
};

export default Navbar; 