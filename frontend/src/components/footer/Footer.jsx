import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { 
      id: 1, 
      icon: <FaTwitter />, 
      url: 'https://twitter.com/interviewcopilot',
      label: 'Twitter'
    },
    { 
      id: 2, 
      icon: <FaGithub />, 
      url: 'https://github.com/interviewcopilot',
      label: 'GitHub'
    },
    { 
      id: 3, 
      icon: <FaLinkedin />, 
      url: 'https://linkedin.com/company/interviewcopilot',
      label: 'LinkedIn'
    },
    { 
      id: 4, 
      icon: <FaDiscord />, 
      url: 'https://discord.gg/interviewcopilot',
      label: 'Discord'
    }
  ];

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', url: '#features' },
        { name: 'Code Editor', url: '#code-editor' },
        { name: 'API', url: '#api' },
        { name: 'Pricing', url: '#pricing' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', url: '#docs' },
        { name: 'Tutorials', url: '#tutorials' },
        { name: 'Blog', url: '#blog' },
        { name: 'FAQ', url: '#faq' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', url: '#about' },
        { name: 'Careers', url: '#careers' },
        { name: 'Contact', url: '#contact' },
        { name: 'Partners', url: '#partners' }
      ]
    }
  ];

  return (
    <footer className="footer-section">
      <div className="footer-grid-overlay"></div>
      
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <motion.div 
              className="footer-logo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="gradient-text">Interview Copilot</span>
            </motion.div>
            <p className="footer-tagline">
              Your AI-powered interview preparation companion
            </p>
            
            <div className="footer-social">
              {socialLinks.map((social) => (
                <motion.a 
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ 
                    y: -5, 
                    color: '#00f7ff',
                    transition: { duration: 0.2 }
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="footer-links-container">
            {footerLinks.map((group, index) => (
              <div key={index} className="footer-links-group">
                <h4 className="footer-group-title">{group.title}</h4>
                <ul className="footer-links">
                  {group.links.map((link, i) => (
                    <motion.li 
                      key={i}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <a href={link.url}>{link.name}</a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="footer-newsletter">
            <h4 className="footer-group-title">Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest updates and features.</p>
            
            <form className="newsletter-form">
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {currentYear} Interview Copilot. All rights reserved.
          </div>
          
          <div className="footer-legal">
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
      
      <div className="footer-decoration">
        <div className="footer-circuit-lines"></div>
        <div className="glowing-dots">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`dot dot-${i + 1}`}></div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 