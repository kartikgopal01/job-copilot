import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { FaRocket, FaUserAstronaut, FaGlobeAsia } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);
  const brainModelRef = useRef(null);

  useEffect(() => {
    // Three.js animation setup
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x00f7ff, 2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add point light
    const pointLight = new THREE.PointLight(0x9747ff, 2);
    pointLight.position.set(-1, -1, -1);
    scene.add(pointLight);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x00f7ff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create a neural network visualization (simplified with spheres and lines)
    const neuralGroup = new THREE.Group();
    
    // Create nodes (spheres)
    const nodeGeometry = new THREE.SphereGeometry(0.03, 16, 16);
    const nodeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x9747ff,
      emissive: 0x9747ff,
      emissiveIntensity: 0.5,
      specular: 0xffffff
    });
    
    const nodes = [];
    const nodeCount = 20;
    const nodePositions = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const x = (Math.random() - 0.5) * 2;
      const y = (Math.random() - 0.5) * 2;
      const z = (Math.random() - 0.5) * 2;
      
      nodeMesh.position.set(x, y, z);
      nodePositions.push(new THREE.Vector3(x, y, z));
      nodes.push(nodeMesh);
      neuralGroup.add(nodeMesh);
    }
    
    // Create connections (lines)
    const connectionMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00f7ff,
      transparent: true,
      opacity: 0.3
    });
    
    // Connect each node to a few others
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.8) {
          const points = [nodePositions[i], nodePositions[j]];
          const connectionGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(connectionGeometry, connectionMaterial);
          neuralGroup.add(line);
        }
      }
    }
    
    scene.add(neuralGroup);
    neuralGroup.position.set(0, 0, -2);
    brainModelRef.current = neuralGroup;
    
    camera.position.z = 2;
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse movement effect
    const mouse = {
      x: 0,
      y: 0
    };
    
    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particles
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      // Move neural network based on mouse
      if (brainModelRef.current) {
        brainModelRef.current.rotation.x += 0.001;
        brainModelRef.current.rotation.y += 0.001;
        brainModelRef.current.position.x = mouse.x * 0.1;
        brainModelRef.current.position.y = mouse.y * 0.1;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', () => {});
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" />
      
      <div className="container hero-container">
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-title"
          >
            Your <span className="gradient-text">AI-Powered</span> Interview Companion
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-subtitle"
          >
            Prepare, practice, and ace your technical interviews with our intelligent copilot
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-buttons"
          >
            <button className="futuristic-btn primary-btn">
              <FaRocket className="btn-icon" /> Get Started
            </button>
            <button className="futuristic-btn secondary-btn">
              <FaGlobeAsia className="btn-icon" /> Learn More
            </button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-stats"
          >
            <div className="stat-item">
              <span className="stat-number gradient-text">10k+</span>
              <span className="stat-label">Interview Questions</span>
            </div>
            <div className="stat-item">
              <span className="stat-number gradient-text">5k+</span>
              <span className="stat-label">Coding Challenges</span>
            </div>
            <div className="stat-item">
              <span className="stat-number gradient-text">98%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hero-image-container"
        >
          <div className="hero-image">
            <div className="astronaut-icon">
              <FaUserAstronaut />
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow-container">
          <span className="arrow"></span>
        </div>
      </div>
    </div>
  );
};

export default Hero; 