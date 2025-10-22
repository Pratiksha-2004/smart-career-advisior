import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay, FiX } from 'react-icons/fi'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../components/Toast';
import './Hero.css'

function Hero() {
  const toast = useToast();
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const { isAuthenticated } = useAuth();

  const openVideoModal = () => {
    setShowVideoModal(true)
    setVideoError(false)
  }

  const closeVideoModal = () => {
    setShowVideoModal(false)
    setVideoError(false)
  }

  const handleVideoError = () => {
    setVideoError(true)
  }
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="floating-elements">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`floating-element element-${i + 1}`}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-text" variants={itemVariants}>
            <motion.h1>
              Discover Your
              <motion.span 
                className="highlight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Perfect Career Path
              </motion.span>
            </motion.h1>
            <motion.p variants={itemVariants}>
              Get personalized career recommendations based on your skills, interests, 
              and personality. Our AI-powered advisor helps you make informed decisions 
              about your future with confidence and clarity.
            </motion.p>
            
            <motion.div 
              className="hero-actions"
              variants={itemVariants}
            >
              <>
                <Link
                  to={isAuthenticated ? "/assessment" : "#"}
                  className="cta-primary"
                  onClick={e => {
                    if (!isAuthenticated) {
                      e.preventDefault();
                      toast.error('Please login to use this feature');
                    }
                  }}
                >
                  <span>Start Your Journey</span>
                  <FiArrowRight className="icon" />
                </Link>
                <button
                  className="cta-secondary"
                  onClick={isAuthenticated ? openVideoModal : () => toast.error('Please login to use this feature')}
                  title={isAuthenticated ? undefined : "Login to use this feature"}
                >
                  <FiPlay className="play-icon" />
                  <span>Watch Demo</span>
                </button>
              </>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero-features"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              {
                icon: '🧠',
                title: 'AI-Powered Analysis',
                description: 'Advanced algorithms analyze your profile to find perfect matches'
              },
              {
                icon: '📊',
                title: 'Personalized Results',
                description: 'Tailored career recommendations designed specifically for you'
              },
              {
                icon: '🚀',
                title: 'Career Roadmap',
                description: 'Clear, actionable steps to achieve your professional goals'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature"
                variants={featureVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  z: 50
                }}
                whileTap={{ scale: 0.95 }}
                custom={index}
              >
                <motion.span 
                  className="feature-icon"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360 
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                
                <motion.div 
                  className="feature-glow"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <motion.div 
          className="video-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeVideoModal}
        >
          <motion.div 
            className="video-modal-content"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="video-close-btn" onClick={closeVideoModal}>
              <FiX />
            </button>
            <div className="video-container">
              <div className="demo-simulation">
                <div className="demo-header">
                  <div className="demo-title">Smart Career Advisor Demo</div>
                  <div className="demo-subtitle">See How Our AI Helps You Find Your Perfect Career</div>
                </div>
                <div className="demo-steps">
                  <div className="demo-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Take Assessment</h4>
                      <p>Answer questions about your interests, skills, and goals</p>
                    </div>
                  </div>
                  <div className="demo-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>AI Analysis</h4>
                      <p>Our AI analyzes your responses and matches careers</p>
                    </div>
                  </div>
                  <div className="demo-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Get Results</h4>
                      <p>Receive personalized career recommendations</p>
                    </div>
                  </div>
                  <div className="demo-step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>Plan Your Path</h4>
                      <p>Get a roadmap to achieve your career goals</p>
                    </div>
                  </div>
                </div>
                <div className="demo-cta">
                  <Link to="/assessment" className="demo-start-btn">
                    Start Your Assessment Now
                    <FiArrowRight />
                  </Link>
                  <button className="demo-close-btn" onClick={closeVideoModal}>
                    <FiX />
                    Close Demo
                  </button>
                </div>
              </div>
            </div>
            <div className="video-info">
              <h3>AI-Powered Career Guidance Demo</h3>
              <p>Discover how AI is revolutionizing career guidance and see how our platform helps you find your perfect career path through intelligent assessments and personalized recommendations.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default Hero