import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaBrain, FaRobot, FaCode, FaLaptopCode, FaUserTie, FaDatabase } from 'react-icons/fa';
import './Features.css';

const featureData = [
  {
    id: 1,
    icon: <FaBrain />,
    title: 'AI Interview Coach',
    description: 'Get personalized interview preparation with our advanced AI coach that adapts to your skill level.',
    color: '#00f7ff'
  },
  {
    id: 2,
    icon: <FaCode />,
    title: 'Coding Challenges',
    description: 'Practice with thousands of coding challenges tailored to your target companies and positions.',
    color: '#9747ff'
  },
  {
    id: 3,
    icon: <FaRobot />,
    title: 'Mock Interviews',
    description: 'Simulate real interview conditions with our AI interviewer and receive detailed feedback.',
    color: '#f3ff00'
  },
  {
    id: 4,
    icon: <FaLaptopCode />,
    title: 'Live Coding',
    description: 'Solve problems in our integrated code editor with real-time feedback and suggestions.',
    color: '#00f7ff'
  },
  {
    id: 5,
    icon: <FaUserTie />,
    title: 'Career Guidance',
    description: 'Get personalized career advice and interview strategies from industry experts.',
    color: '#9747ff'
  },
  {
    id: 6,
    icon: <FaDatabase />,
    title: 'Knowledge Base',
    description: 'Access a vast library of interview questions, answers, and explanations.',
    color: '#f3ff00'
  }
];

const Features = () => {
  const controls = useAnimation();
  const featuresRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, [controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="features-section section" id="features" ref={featuresRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="gradient-text">Powerful</span> Features
          </h2>
          <p className="section-subtitle">
            Designed to help you ace your technical interviews with confidence
          </p>
        </div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {featureData.map((feature) => (
            <motion.div
              key={feature.id}
              className="feature-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: `0 10px 30px rgba(${feature.color === '#00f7ff' ? '0, 247, 255' : feature.color === '#9747ff' ? '151, 71, 255' : '243, 255, 0'}, 0.3)` 
              }}
              style={{
                '--card-color': feature.color
              }}
            >
              <div className="feature-icon" style={{ color: feature.color }}>
                {feature.icon}
                <div className="icon-glow" style={{ background: `radial-gradient(circle at center, ${feature.color}33, transparent 70%)` }}></div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-card-corner top-left"></div>
              <div className="feature-card-corner top-right"></div>
              <div className="feature-card-corner bottom-left"></div>
              <div className="feature-card-corner bottom-right"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="features-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3>Ready to level up your interview skills?</h3>
          <button className="futuristic-btn primary-btn">Start Practicing Now</button>
        </motion.div>
      </div>

      <div className="features-bg-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
    </section>
  );
};

export default Features; 