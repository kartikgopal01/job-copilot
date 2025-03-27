import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaServer, FaExchangeAlt, FaLock, FaCode, FaUserFriends, FaDatabase } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import './ApiSection.css';

const ApiSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  if (inView) {
    controls.start('visible');
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  const apiEndpoints = [
    {
      id: 1,
      icon: <FaCode />,
      name: 'Code Execution',
      endpoint: '/api/execute',
      description: 'Run code in multiple languages in a secure sandbox environment',
      method: 'POST'
    },
    {
      id: 2,
      icon: <FaUserFriends />,
      name: 'Interview Sessions',
      endpoint: '/api/sessions',
      description: 'Create and manage mock interview sessions with AI interviewers',
      method: 'GET/POST'
    },
    {
      id: 3,
      icon: <FaDatabase />,
      name: 'Problem Database',
      endpoint: '/api/problems',
      description: 'Access thousands of coding challenges with difficulty ratings',
      method: 'GET'
    },
    {
      id: 4,
      icon: <FaExchangeAlt />,
      name: 'Real-time Feedback',
      endpoint: '/api/feedback',
      description: 'Get instant AI analysis and feedback on your code solutions',
      method: 'POST'
    }
  ];

  return (
    <section className="api-section section" id="api">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Powerful <span className="gradient-text">API Integration</span>
          </h2>
          <p className="section-subtitle">
            Connect your frontend to our powerful backend services
          </p>
        </div>

        <motion.div
          className="api-overview"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div className="api-server" variants={itemVariants}>
            <div className="server-icon">
              <FaServer />
            </div>
            <div className="server-details">
              <h3>Interview Copilot API</h3>
              <p>Base URL: <span className="highlight-text">https://api.interviewcopilot.ai/v1</span></p>
              <div className="server-stats">
                <div className="stat">
                  <span className="stat-value">99.9%</span>
                  <span className="stat-label">Uptime</span>
                </div>
                <div className="stat">
                  <span className="stat-value">&lt;100ms</span>
                  <span className="stat-label">Response Time</span>
                </div>
                <div className="stat">
                  <span className="stat-value">128-bit</span>
                  <span className="stat-label">SSL Encryption</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="api-endpoints">
            {apiEndpoints.map((endpoint) => (
              <motion.div 
                key={endpoint.id} 
                className="endpoint-card"
                variants={itemVariants}
              >
                <div className="endpoint-header">
                  <div className="endpoint-icon">{endpoint.icon}</div>
                  <h3>{endpoint.name}</h3>
                </div>
                <div className="endpoint-body">
                  <div className="endpoint-url">
                    <span className="method">{endpoint.method}</span>
                    <span className="url">{endpoint.endpoint}</span>
                  </div>
                  <p className="endpoint-description">{endpoint.description}</p>
                </div>
                <div className="endpoint-footer">
                  <button className="endpoint-docs-btn">View Documentation</button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="api-features" variants={itemVariants}>
            <div className="api-feature">
              <div className="api-feature-icon">
                <FaExchangeAlt />
              </div>
              <div className="api-feature-details">
                <h4>WebSocket Support</h4>
                <p>Real-time code updates and collaborative editing</p>
              </div>
            </div>
            <div className="api-feature">
              <div className="api-feature-icon">
                <FaLock />
              </div>
              <div className="api-feature-details">
                <h4>OAuth Authentication</h4>
                <p>Secure authentication with role-based access control</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="api-cta" variants={itemVariants}>
            <div className="api-demo-code">
              <pre>
                <code>
{`// Example: Execute code and get feedback
fetch('https://api.interviewcopilot.ai/v1/execute', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    language: 'javascript',
    code: \`function maxSubArray(nums) {
  // Your solution here
}\`,
    timeout: 5000
  })
})
.then(response => response.json())
.then(data => console.log(data));`}
                </code>
              </pre>
            </div>
            <div className="api-access">
              <h3>Ready to integrate?</h3>
              <p>Get API access and start building your custom interview prep platform</p>
              <button className="futuristic-btn primary-btn">Request API Key</button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="api-bg-graphics">
        <div className="data-flow"></div>
        <div className="circuit-node node-1"></div>
        <div className="circuit-node node-2"></div>
        <div className="circuit-node node-3"></div>
      </div>
    </section>
  );
};

export default ApiSection; 