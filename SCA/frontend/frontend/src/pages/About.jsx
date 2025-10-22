import React from 'react'
import './About.css'

function About() {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'CEO & Career Psychology Expert',
      avatar: '👩‍💼',
      bio: 'PhD in Organizational Psychology with 15+ years in career development and talent management.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO & AI Specialist',
      avatar: '👨‍💻',
      bio: 'Former Google engineer specializing in machine learning and AI-driven recommendation systems.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Career Research',
      avatar: '👩‍🔬',
      bio: 'Labor market analyst with expertise in employment trends and workforce development.'
    },
    {
      name: 'David Kim',
      role: 'UX Design Lead',
      avatar: '👨‍🎨',
      bio: 'Award-winning designer focused on creating intuitive and accessible user experiences.'
    }
  ]

  const stats = [
    { number: '500K+', label: 'Users Helped', icon: '👥' },
    { number: '95%', label: 'Success Rate', icon: '🎯' },
    { number: '1000+', label: 'Career Paths', icon: '🛤️' },
    { number: '50+', label: 'Industries Covered', icon: '🏢' }
  ]

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with a vision to democratize career guidance using AI technology.'
    },
    {
      year: '2021',
      title: 'First 10K Users',
      description: 'Reached our first major milestone with positive user feedback and 90% satisfaction rate.'
    },
    {
      year: '2022',
      title: 'AI Algorithm Launch',
      description: 'Launched our proprietary AI matching algorithm with 95% accuracy in career predictions.'
    },
    {
      year: '2023',
      title: 'Enterprise Solutions',
      description: 'Expanded to serve Fortune 500 companies with employee career development programs.'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Extended our services to 25+ countries with localized career insights and opportunities.'
    }
  ]

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About Smart Career Advisor</h1>
            <p className="hero-subtitle">
              We're on a mission to help everyone find their perfect career path through 
              the power of artificial intelligence and personalized guidance.
            </p>
          </div>
        </div>
      </div>

      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-content">
              <h2>Our Mission</h2>
              <p>
                At Smart Career Advisor, we believe everyone deserves to find fulfilling work 
                that aligns with their passions, skills, and life goals. Our AI-powered platform 
                analyzes millions of data points to provide personalized career recommendations 
                that help people make informed decisions about their professional future.
              </p>
              <div className="mission-values">
                <div className="value">
                  <div className="value-icon">🎯</div>
                  <h3>Accuracy</h3>
                  <p>Data-driven insights for precise career matching</p>
                </div>
                <div className="value">
                  <div className="value-icon">🤝</div>
                  <h3>Accessibility</h3>
                  <p>Career guidance for everyone, regardless of background</p>
                </div>
                <div className="value">
                  <div className="value-icon">🚀</div>
                  <h3>Innovation</h3>
                  <p>Cutting-edge technology to solve career challenges</p>
                </div>
              </div>
            </div>
            <div className="mission-visual">
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <p className="team-intro">
            Our diverse team of experts combines psychology, technology, and design 
            to create the best career guidance experience.
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">{member.avatar}</div>
                <h3>{member.name}</h3>
                <div className="member-role">{member.role}</div>
                <p className="member-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="journey-section">
        <div className="container">
          <h2>Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker">
                  <span className="year">{milestone.year}</span>
                </div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="technology-section">
        <div className="container">
          <div className="tech-grid">
            <div className="tech-content">
              <h2>Our Technology</h2>
              <p>
                Our proprietary AI algorithm analyzes over 50 different factors including 
                personality traits, skills, interests, market trends, and career trajectories 
                to provide accurate career recommendations.
              </p>
              <div className="tech-features">
                <div className="tech-feature">
                  <span className="feature-icon">🧠</span>
                  <div>
                    <h4>Machine Learning</h4>
                    <p>Continuously improving recommendations based on user outcomes</p>
                  </div>
                </div>
                <div className="tech-feature">
                  <span className="feature-icon">📊</span>
                  <div>
                    <h4>Big Data Analytics</h4>
                    <p>Processing millions of job market data points in real-time</p>
                  </div>
                </div>
                <div className="tech-feature">
                  <span className="feature-icon">🔒</span>
                  <div>
                    <h4>Privacy First</h4>
                    <p>Your data is encrypted and never shared with third parties</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="tech-visual">
              <div className="ai-animation">
                <div className="neural-network">
                  <div className="node node-1"></div>
                  <div className="node node-2"></div>
                  <div className="node node-3"></div>
                  <div className="node node-4"></div>
                  <div className="connection con-1"></div>
                  <div className="connection con-2"></div>
                  <div className="connection con-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join thousands of professionals who have found their dream careers with our help.</p>
            <div className="cta-buttons">
              <a href="/assessment" className="primary-btn">Take Assessment</a>
              <a href="/careers" className="secondary-btn">Explore Careers</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About