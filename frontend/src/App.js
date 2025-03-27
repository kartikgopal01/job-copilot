import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Features from './components/features/Features';
import CodeEditor from './components/codeEditor/CodeEditor';
import ApiSection from './components/api/ApiSection';
import Footer from './components/footer/Footer';
import './App.css';

const App = () => {
  // Intersection Observer for animations
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Add reveal animation to elements when they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Scroll event for various effects
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CodeEditor />
        <ApiSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
