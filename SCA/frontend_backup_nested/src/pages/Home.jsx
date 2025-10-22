


import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiStar, FiUsers, FiTrendingUp, FiAward } from 'react-icons/fi'
import Hero from '../components/Hero'
import './Home.css'

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const features = [
    {
      icon: <FiTrendingUp />,
      title: 'Personalized Matching',
      description: 'Our AI analyzes your unique profile to match you with careers that align with your strengths and interests.',
      color: '#667eea'
    },
    {
      icon: <FiUsers />,
      title: 'Market Insights',
      description: 'Get real-time data on job market trends, salary expectations, and growth opportunities in your field.',
      color: '#f093fb'
    },
    {
      icon: <FiStar />,
      title: 'Learning Pathways',
      description: 'Discover the skills and qualifications you need to achieve your career goals with personalized learning recommendations.',
      color: '#ffecd2'
    },
    {
      icon: <FiAward />,
      title: 'Expert Guidance',
      description: 'Access career advice from industry professionals and mentors who can guide your journey.',
      color: '#a8edea'
    }
  ]

  const testimonials = [
    {
      content: "Smart Career Advisor helped me transition from marketing to UX design. The personalized recommendations were spot-on!",
      author: "Sarah Johnson",
      role: "UX Designer at Tech Corp",
      avatar: "🙋‍♀️",
      rating: 5
    },
    {
      content: "The career assessment revealed opportunities I never considered. Now I'm thriving as a data scientist!",
      author: "Michael Chen",
      role: "Data Scientist at Analytics Pro",
      avatar: "🙋‍♂️",
      rating: 5
    },
    {
      content: "The skill development roadmap was exactly what I needed. I got promoted within 6 months!",
      author: "Emily Rodriguez",
      role: "Senior Product Manager",
      avatar: "🙋‍♀️",
      rating: 5
    }
  ]

  const stats = [
    { number: '50K+', label: 'Careers Matched', icon: <FiUsers /> },
    { number: '95%', label: 'User Satisfaction', icon: <FiStar /> },
    { number: '500+', label: 'Career Options', icon: <FiTrendingUp /> },
    { number: '15min', label: 'Avg. Assessment Time', icon: <FiAward /> }
  ]

  return (
    <div className="home-page">
      <Hero />
      
      {/* Features Section */}
      <motion.section 
        className="features-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">Why Choose Smart Career Advisor?</h2>
            <p className="section-subtitle">
              Discover the power of AI-driven career guidance and unlock your professional potential
            </p>
          </motion.div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className="feature-icon"
                  style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}80)` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                
                <motion.div 
                  className="feature-overlay"
                  style={{ background: `linear-gradient(135deg, ${feature.color}20, transparent)` }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="stats-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="stat-icon">
                  {stat.icon}
                </div>
                <motion.div 
                  className="stat-number"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="cta-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="cta-background">
          <div className="cta-shapes">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`cta-shape cta-shape-${i + 1}`}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container">
          <div className="cta-content">
            <motion.div className="cta-text" variants={itemVariants}>
              <h2 className="section-title white">Ready to Discover Your Dream Career?</h2>
              <p>Take our comprehensive career assessment and unlock your potential today. Join thousands of professionals who found their perfect career path.</p>
              
              <motion.div 
                className="cta-actions"
                variants={itemVariants}
              >
                <Link 
                  to="/assessment" 
                  className="cta-button primary"
                >
                  <span>Start Your Assessment</span>
                  <FiArrowRight className="arrow" />
                </Link>
                <Link 
                  to="/careers" 
                  className="cta-button secondary"
                >
                  Browse Careers
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div className="cta-visual" variants={itemVariants}>
              <div className="floating-card">
                <h4>Success Stories</h4>
                <div className="success-stats">
                  <div className="stat">
                    <span className="number">95%</span>
                    <span className="label">User Satisfaction</span>
                  </div>
                  <div className="stat">
                    <span className="number">50K+</span>
                    <span className="label">Careers Matched</span>
                  </div>
                </div>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                  <span className="rating-text">Trusted by professionals</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="testimonials-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="section-header" variants={itemVariants}>
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">
              Real stories from professionals who transformed their careers with our guidance
            </p>
          </motion.div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="testimonial-content">
                  <div className="rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                  <p>"{testimonial.content}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <h4>{testimonial.author}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
                
                <motion.div 
                  className="testimonial-glow"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        className="newsletter-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="newsletter-content" variants={itemVariants}>
            <h3>Stay Updated</h3>
            <p>Get the latest career insights, tips, and opportunities delivered to your inbox.</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <motion.button 
                className="newsletter-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
            <p className="newsletter-note">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home
