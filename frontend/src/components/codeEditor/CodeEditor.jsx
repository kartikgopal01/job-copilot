import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeEditor.css';

const CodeEditor = () => {
  const [code, setCode] = useState(
`// Interview copilot AI code example
function analyzeFeedback(interview) {
  const { answers, feedback } = interview;
  
  // Process feedback with AI models
  const strengths = answers.filter(a => a.score > 7)
    .map(a => a.topic);
    
  const areasToImprove = answers.filter(a => a.score < 5)
    .map(a => a.topic);
    
  return {
    strengths,
    areasToImprove,
    overallScore: calculateScore(answers),
    nextSteps: generateNextSteps(areasToImprove)
  };
}

// More code coming as you type...`
  );
  
  const [typingText, setTypingText] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ line: 4, ch: 2 });
  const typingSpeed = 50; // ms per character
  const editorRef = useRef(null);
  const cursorRef = useRef(null);
  const controls = useAnimation();
  
  const additionalCode = `
function calculateScore(answers) {
  return answers.reduce((sum, answer) => 
    sum + answer.score, 0) / answers.length;
}

function generateNextSteps(areasToImprove) {
  // AI recommends personalized improvement steps
  return areasToImprove.map(area => ({
    area,
    resources: findResources(area),
    practiceExercises: generateExercises(area)
  }));
}`;

  // Simulate typing effect
  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;
    
    const typeNextCharacter = () => {
      if (currentIndex < additionalCode.length) {
        currentText += additionalCode[currentIndex];
        setTypingText(currentText);
        currentIndex++;
        setTimeout(typeNextCharacter, Math.random() * 100 + typingSpeed);
      }
    };
    
    // Start typing after a delay
    const typingTimeout = setTimeout(() => {
      typeNextCharacter();
    }, 2000);
    
    return () => clearTimeout(typingTimeout);
  }, []);
  
  // Blinking cursor animation
  useEffect(() => {
    const blinkCursor = async () => {
      while (true) {
        await controls.start({ opacity: 1 });
        await controls.start({ opacity: 0, transition: { delay: 0.5 } });
        await controls.start({ opacity: 1, transition: { delay: 0.5 } });
      }
    };
    
    blinkCursor();
  }, [controls]);
  
  // Move cursor to simulate typing
  useEffect(() => {
    if (typingText.length > 0 && cursorRef.current) {
      const lines = typingText.split('\n');
      const lastLineIndex = lines.length - 1;
      const lastPosition = lines[lastLineIndex].length;
      
      setCursorPosition({
        line: code.split('\n').length + lastLineIndex,
        ch: lastPosition
      });
    }
  }, [typingText, code]);
  
  // Handle clicking in the editor
  const handleEditorClick = (e) => {
    if (editorRef.current) {
      const rect = editorRef.current.getBoundingClientRect();
      const line = Math.floor((e.clientY - rect.top) / 20); // Assuming 20px line height
      const ch = Math.floor((e.clientX - rect.left) / 9.6); // Approximate character width
      
      setCursorPosition({ line, ch });
    }
  };
  
  // Render line numbers
  const renderLineNumbers = () => {
    const totalLines = (code + typingText).split('\n').length;
    return (
      <div className="line-numbers">
        {Array.from({ length: totalLines }, (_, i) => (
          <div key={i} className="line-number">{i + 1}</div>
        ))}
      </div>
    );
  };
  
  // Render the cursor
  const renderCursor = () => {
    const top = cursorPosition.line * 20; // 20px line height
    const left = cursorPosition.ch * 9.6; // Approximate character width
    
    return (
      <motion.div
        className="cursor"
        style={{ top, left }}
        animate={controls}
        ref={cursorRef}
      />
    );
  };
  
  return (
    <motion.div 
      className="code-editor"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="editor-header">
        <div className="editor-buttons">
          <div className="editor-button close"></div>
          <div className="editor-button minimize"></div>
          <div className="editor-button maximize"></div>
        </div>
        <div className="editor-title">interview-analysis.js</div>
      </div>
      
      <div className="editor-body" ref={editorRef} onClick={handleEditorClick}>
        {renderLineNumbers()}
        
        <div className="editor-content">
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            customStyle={{ 
              background: 'transparent',
              margin: 0,
              padding: 0,
              overflow: 'visible'
            }}
            codeTagProps={{ 
              style: { 
                display: 'block',
                fontFamily: "'JetBrains Mono', monospace" 
              } 
            }}
          >
            {code + typingText}
          </SyntaxHighlighter>
          
          {renderCursor()}
        </div>
      </div>
      
      <div className="editor-footer">
        <div className="editor-status">JavaScript</div>
        <div className="editor-position">Ln {cursorPosition.line + 1}, Col {cursorPosition.ch + 1}</div>
      </div>
      
      <div className="interactive-elements">
        <motion.div 
          className="suggestion-tooltip"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          <div className="suggestion-header">
            <span className="ai-icon">🤖</span> AI suggests:
          </div>
          <div className="suggestion-body">
            Add error handling for edge cases
          </div>
        </motion.div>
        
        <motion.div 
          className="ai-assistant"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="ai-assistant-icon">🧠</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CodeEditor; 