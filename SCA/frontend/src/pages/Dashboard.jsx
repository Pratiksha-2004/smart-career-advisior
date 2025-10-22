import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const { user: authUser } = useAuth()
  const user = {
    name: authUser?.name || 'User',
    email: authUser?.email || 'john@example.com',
    completedAssessments: 3,
    savedCareers: 8,
    skillsProgress: 65
  }

  const recentAssessments = [
    {
      id: 1,
      type: 'Career Match Assessment',
      date: '2025-09-20',
      score: 92,
      topMatch: 'Software Developer'
    },
    {
      id: 2,
      type: 'Skills Assessment',
      date: '2025-09-18',
      score: 88,
      topMatch: 'Data Scientist'
    },
    {
      id: 3,
      type: 'Personality Assessment',
      date: '2025-09-15',
      score: 95,
      topMatch: 'Product Manager'
    }
  ]

  const savedCareers = [
    { id: 1, title: 'Software Developer', match: 95, salary: '$75k-$120k' },
    { id: 2, title: 'Data Scientist', match: 88, salary: '$80k-$130k' },
    { id: 3, title: 'UX Designer', match: 82, salary: '$60k-$100k' },
    { id: 4, title: 'Product Manager', match: 90, salary: '$90k-$140k' }
  ]

  const skillProgress = [
    { skill: 'JavaScript', level: 85, target: 90 },
    { skill: 'Python', level: 70, target: 85 },
    { skill: 'Leadership', level: 60, target: 80 },
    { skill: 'Communication', level: 75, target: 85 }
  ]

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome back, {user.name}! 👋</h1>
            <p>Track your career journey and continue building your future</p>
          </div>
          <div className="quick-actions">
            <Link to="/assessment" className="action-btn primary">
              New Assessment
            </Link>
            <Link to="/careers" className="action-btn secondary">
              Browse Careers
            </Link>
          </div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>{user.completedAssessments}</h3>
              <p>Assessments Completed</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💾</div>
            <div className="stat-info">
              <h3>{user.savedCareers}</h3>
              <p>Saved Careers</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <h3>{user.skillsProgress}%</h3>
              <p>Skills Progress</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <h3>Bronze</h3>
              <p>Current Level</p>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Assessments</h2>
              <Link to="/assessment" className="see-all">View All</Link>
            </div>
            <div className="assessments-list">
              {recentAssessments.map(assessment => (
                <div key={assessment.id} className="assessment-card">
                  <div className="assessment-info">
                    <h4>{assessment.type}</h4>
                    <p className="assessment-date">{new Date(assessment.date).toLocaleDateString()}</p>
                  </div>
                  <div className="assessment-results">
                    <div className="score">
                      <span className="score-value">{assessment.score}%</span>
                      <span className="score-label">Match Score</span>
                    </div>
                    <div className="top-match">
                      <span className="match-label">Top Match:</span>
                      <span className="match-value">{assessment.topMatch}</span>
                    </div>
                  </div>
                  <button className="view-btn">View Details</button>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Saved Careers</h2>
              <Link to="/careers" className="see-all">Browse More</Link>
            </div>
            <div className="saved-careers-grid">
              {savedCareers.map(career => (
                <div key={career.id} className="career-card">
                  <div className="career-info">
                    <h4>{career.title}</h4>
                    <p className="salary">{career.salary}</p>
                  </div>
                  <div className="match-score">
                    <div className="score-circle">
                      <span>{career.match}%</span>
                    </div>
                  </div>
                  <div className="career-actions">
                    <button className="btn-primary">Learn More</button>
                    <button className="btn-secondary">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Skill Development</h2>
              <Link to="/skills" className="see-all">Manage Skills</Link>
            </div>
            <div className="skills-progress">
              {skillProgress.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-info">
                    <h4>{skill.skill}</h4>
                    <span className="skill-percentage">{skill.level}% / {skill.target}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress-fill"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                    <div 
                      className="skill-target"
                      style={{ left: `${skill.target}%` }}
                    ></div>
                  </div>
                  <button className="improve-btn">Improve</button>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recommended Actions</h2>
            </div>
            <div className="recommendations">
              <div className="recommendation-card">
                <div className="rec-icon">📚</div>
                <div className="rec-content">
                  <h4>Complete JavaScript Course</h4>
                  <p>Boost your JavaScript skills to reach your 90% target</p>
                </div>
                <Link to="/careers" className="rec-btn" aria-label="Start learning - go to Careers">
                  Start Learning
                </Link>
              </div>
              <div className="recommendation-card">
                <div className="rec-icon">🤝</div>
                <div className="rec-content">
                  <h4>Connect with Mentors</h4>
                  <p>Find experienced professionals in your field of interest</p>
                </div>
                <Link to="/chat" className="rec-btn" aria-label="Find mentors - open chat">
                  Find Mentors
                </Link>
              </div>
              <div className="recommendation-card">
                <div className="rec-icon">📄</div>
                <div className="rec-content">
                  <h4>Update Your Resume</h4>
                  <p>Optimize your resume based on your assessment results</p>
                </div>
                <Link to="/resume-builder" className="rec-btn" aria-label="Build resume - open resume builder">
                  Build Resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard