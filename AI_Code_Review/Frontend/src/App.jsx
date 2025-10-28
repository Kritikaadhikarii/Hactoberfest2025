import { useState, useRef, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import axios from "axios"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import './App.css'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [code, setCode] = useState(`
    function sum() {
      return 2+2;
    }
  `)
  const [review, setReview] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('editor')
  const confettiRef = useRef(null)
  
  // For mobile view switching between editor and review
  const isMobileView = () => window.innerWidth < 768
  
  useEffect(() => {
    // Initialize Prism
    prism.highlightAll()
    
    // Set initial tab based on screen size
    if (isMobileView()) {
      setActiveTab('editor')
    }
  }, [])

  async function reviewCode() {
    setIsLoading(true)
    
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data)
      
      // Show confetti when review is complete
      if (confettiRef.current) {
        const rect = confettiRef.current.getBoundingClientRect()
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { 
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight
          }
        })
      }
      
      // Switch to review tab on mobile after getting review
      if (isMobileView()) {
        setActiveTab('review')
      }
    } catch (error) {
      console.error('Error getting review:', error)
      setReview('Error getting review. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-logo">
          <div className="logo-icon">{'</>'}</div>
          <h1 className="logo-text">CodeReviewAI</h1>
        </div>
        <div className="header-actions">
          <motion.a 
            href="https://github.com" 
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="header-icon"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </motion.a>
          <motion.a 
            href="#"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="header-icon"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
              <line x1="6" x2="6" y1="2" y2="4"></line>
              <line x1="10" x2="10" y1="2" y2="4"></line>
              <line x1="14" x2="14" y1="2" y2="4"></line>
            </svg>
          </motion.a>
        </div>
      </header>

      <main>
        <div className="app-intro">
          <h2 className="intro-title">AI-Powered Code Review</h2>
          <p className="intro-description">
            Write or paste your code below and get instant feedback from our AI assistant.
            Improve your code quality with professional recommendations.
          </p>
        </div>

        {/* Mobile Tabs */}
        <div className="mobile-tabs">
          <div className="tabs-container">
            <button 
              className={`tab-button ${activeTab === 'editor' ? 'active' : ''}`}
              onClick={() => setActiveTab('editor')}
            >
              Editor
            </button>
            <button 
              className={`tab-button ${activeTab === 'review' ? 'active' : ''}`}
              onClick={() => setActiveTab('review')}
            >
              Review
            </button>
          </div>
        </div>

        <div className="app-content">
          {/* Code Editor Section */}
          <AnimatePresence mode="wait">
            {(!isMobileView() || activeTab === 'editor') && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="left"
              >
                <div className="editor-header">
                  <div className="window-controls">
                    <div className="control red"></div>
                    <div className="control yellow"></div>
                    <div className="control green"></div>
                  </div>
                  <div className="file-name">javascript.js</div>
                </div>
                <div className="code">
                  <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                    padding={20}
                    style={{
                      fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                      fontSize: 14,
                      backgroundColor: 'transparent',
                      color: '#fff',
                      height: '100%',
                      width: '100%',
                    }}
                  />
                  <div ref={confettiRef} className="review-button-container">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button 
                        onClick={reviewCode} 
                        disabled={isLoading}
                        className="review"
                      >
                        {isLoading ? (
                          <>
                            <span className="loading-spinner"></span>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <span className="sparkle-icon">✨</span>
                            Review Code
                          </>
                        )}
                      </button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Review Section */}
          <AnimatePresence mode="wait">
            {(!isMobileView() || activeTab === 'review') && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="right"
              >
                <div className="review-header">
                  <h3 className="review-title">
                    <span className="sparkle-icon">✨</span>
                    AI Review Results
                  </h3>
                </div>
                <div className="review-content">
                  {isLoading ? (
                    <div className="loading-container">
                      <div className="loading-spinner large"></div>
                      <p>Analyzing your code...</p>
                      <p className="loading-subtitle">This may take a few seconds</p>
                    </div>
                  ) : review ? (
                    <div className="markdown-container">
                      <Markdown rehypePlugins={[rehypeHighlight]}>
                        {review}
                      </Markdown>
                    </div>
                  ) : (
                    <div className="empty-review">
                      <div className="code-icon">{'</>'}</div>
                      <p>
                        Your code review will appear here after you click the "Review Code" button.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default App