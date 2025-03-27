import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaBrain, FaGithub } from 'react-icons/fa';
import { BsFillLightningFill } from 'react-icons/bs';
import { RiMenu4Fill, RiCloseFill } from 'react-icons/ri';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if scrolled more than 100px
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navVariants = {
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 20 
      }
    },
    hidden: { 
      opacity: 0, 
      y: -100,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 20 
      }
    }
  };

  const logoVariants = {
    hover: {
      scale: 1.1,
      textShadow: "0 0 8px rgb(0, 247, 255)",
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const navItemVariants = {
    hover: {
      scale: 1.1,
      color: "#00f7ff",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      variants={navVariants}
      initial="visible"
      animate={isNavVisible ? "visible" : "hidden"}
    >
      <div className="navbar-container">
        <motion.div 
          className="logo"
          variants={logoVariants}
          whileHover="hover"
        >
          <FaBrain className="logo-icon" />
          <span className="gradient-text">Interview Copilot</span>
        </motion.div>
        
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <RiCloseFill /> : <RiMenu4Fill />}
        </div>
        
        <AnimatePresence>
          {(isNavVisible || isMobileMenuOpen) && (
            <motion.ul 
              className={`nav-links ${isMobileMenuOpen ? 'mobile-active' : ''}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.li variants={navItemVariants} whileHover="hover">
                <a href="#features">
                  <BsFillLightningFill className="nav-icon" />
                  <span>Features</span>
                </a>
              </motion.li>
              <motion.li variants={navItemVariants} whileHover="hover">
                <a href="#code-editor">
                  <FaRobot className="nav-icon" />
                  <span>Code Editor</span>
                </a>
              </motion.li>
              <motion.li variants={navItemVariants} whileHover="hover">
                <a href="#api">
                  <FaGithub className="nav-icon" />
                  <span>API</span>
                </a>
              </motion.li>
              <motion.li>
                <a href="#start" className="futuristic-btn">Get Started</a>
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; 