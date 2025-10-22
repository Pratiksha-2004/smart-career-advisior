import React, { useState } from 'react'
import './CareerComparison.css'

function CareerComparison({ suggestedCareers, onClose }) {
  const [selectedCareers, setSelectedCareers] = useState([])
  const [showComparison, setShowComparison] = useState(false)

  const handleCareerSelect = (career) => {
    if (selectedCareers.find(c => c.id === career.id)) {
      // Remove if already selected
      setSelectedCareers(selectedCareers.filter(c => c.id !== career.id))
    } else if (selectedCareers.length < 3) {
      // Add if less than 3 selected
      setSelectedCareers([...selectedCareers, career])
    }
  }

  const startComparison = () => {
    if (selectedCareers.length >= 2) {
      setShowComparison(true)
    }
  }

  const getGrowthColor = (growth) => {
    switch (growth) {
      case 'Very High': return '#4caf50'
      case 'High': return '#8bc34a'
      case 'Moderate': return '#ff9800'
      default: return '#757575'
    }
  }

  const getComparisonScore = (career1, career2, metric) => {
    const values = {
      demand: { career1: career1.demand, career2: career2.demand },
      satisfaction: { career1: career1.satisfaction, career2: career2.satisfaction },
      salary: { 
        career1: parseInt(career1.salary.split(' - ')[1].replace(/[$,]/g, '')),
        career2: parseInt(career2.salary.split(' - ')[1].replace(/[$,]/g, ''))
      }
    }
    
    if (values[metric].career1 > values[metric].career2) return 'better'
    if (values[metric].career1 < values[metric].career2) return 'worse'
    return 'equal'
  }

  if (showComparison) {
    return (
      <div className="career-comparison-modal">
        <div className="comparison-container">
          <div className="comparison-header">
            <h2>Career Comparison</h2>
            <div className="comparison-actions">
              <button 
                className="back-btn"
                onClick={() => setShowComparison(false)}
              >
                ← Back to Selection
              </button>
              <button 
                className="close-btn"
                onClick={onClose}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="comparison-grid">
            {selectedCareers.map((career, index) => (
              <div key={career.id} className="comparison-card">
                <div className="comparison-card-header">
                  <h3>{career.title}</h3>
                  <div className="career-category">
                    {career.category}
                  </div>
                </div>

                <div className="comparison-metrics">
                  <div className="comparison-metric">
                    <span className="metric-label">Salary Range</span>
                    <span className="metric-value">{career.salary}</span>
                    <div className="metric-comparison">
                      {selectedCareers.length > 1 && index > 0 && (
                        <span className={`comparison-indicator ${getComparisonScore(career, selectedCareers[0], 'salary')}`}>
                          {getComparisonScore(career, selectedCareers[0], 'salary') === 'better' ? '↑' : 
                           getComparisonScore(career, selectedCareers[0], 'salary') === 'worse' ? '↓' : '='}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="comparison-metric">
                    <span className="metric-label">Growth Prospect</span>
                    <span 
                      className="metric-value"
                      style={{ color: getGrowthColor(career.growth) }}
                    >
                      {career.growth}
                    </span>
                  </div>

                  <div className="comparison-metric">
                    <span className="metric-label">Market Demand</span>
                    <div className="metric-with-bar">
                      <span className="metric-value">{career.demand}%</span>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill demand"
                          style={{ width: `${career.demand}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="comparison-metric">
                    <span className="metric-label">Job Satisfaction</span>
                    <div className="metric-with-bar">
                      <span className="metric-value">{career.satisfaction}%</span>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill satisfaction"
                          style={{ width: `${career.satisfaction}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="comparison-metric">
                    <span className="metric-label">Education Required</span>
                    <span className="metric-value">{career.education}</span>
                  </div>
                </div>

                <div className="career-description">
                  <h4>Description</h4>
                  <p>{career.description}</p>
                </div>

                <div className="career-skills">
                  <h4>Key Skills</h4>
                  <div className="skills-list">
                    {career.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="pros-cons">
                  <div className="pros">
                    <h5>Pros</h5>
                    <ul>
                      {career.demand >= 85 && <li>High market demand</li>}
                      {career.satisfaction >= 88 && <li>High job satisfaction</li>}
                      {career.growth === 'Very High' && <li>Excellent growth prospects</li>}
                      {parseInt(career.salary.split(' - ')[1].replace(/[$,]/g, '')) >= 100000 && <li>High earning potential</li>}
                    </ul>
                  </div>
                  <div className="cons">
                    <h5>Considerations</h5>
                    <ul>
                      {career.education.includes('Master') && <li>Requires advanced education</li>}
                      {career.education.includes('Doctoral') && <li>Requires doctoral degree</li>}
                      {career.demand < 80 && <li>Moderate market demand</li>}
                      {career.growth === 'Moderate' && <li>Moderate growth prospects</li>}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="comparison-summary">
            <h3>Quick Comparison Summary</h3>
            <div className="summary-table">
              <table>
                <thead>
                  <tr>
                    <th>Career</th>
                    <th>Salary Range</th>
                    <th>Growth</th>
                    <th>Demand</th>
                    <th>Satisfaction</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCareers.map(career => (
                    <tr key={career.id}>
                      <td className="career-name">{career.title}</td>
                      <td>{career.salary}</td>
                      <td style={{ color: getGrowthColor(career.growth) }}>
                        {career.growth}
                      </td>
                      <td>{career.demand}%</td>
                      <td>{career.satisfaction}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="career-comparison-modal">
      <div className="selection-container">
        <div className="selection-header">
          <h2>Career Recommendations Based on Your Skills</h2>
          <p>Select 2-3 careers from these recommendations to compare them</p>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="suggested-careers">
          {suggestedCareers.map(career => (
            <div 
              key={career.id} 
              className={`suggested-career-card ${selectedCareers.find(c => c.id === career.id) ? 'selected' : ''}`}
              onClick={() => handleCareerSelect(career)}
            >
              <div className="selection-checkbox">
                <div className={`checkbox ${selectedCareers.find(c => c.id === career.id) ? 'checked' : ''}`}>
                  {selectedCareers.find(c => c.id === career.id) && '✓'}
                </div>
              </div>

              <div className="career-info">
                <h3>{career.title}</h3>
                <p className="career-description">{career.description}</p>
                
                <div className="career-highlights">
                  <div className="highlight">
                    <span className="highlight-label">Salary:</span>
                    <span className="highlight-value">{career.salary}</span>
                  </div>
                  <div className="highlight">
                    <span className="highlight-label">Growth:</span>
                    <span 
                      className="highlight-value"
                      style={{ color: getGrowthColor(career.growth) }}
                    >
                      {career.growth}
                    </span>
                  </div>
                  <div className="highlight">
                    <span className="highlight-label">Demand:</span>
                    <span className="highlight-value">{career.demand}%</span>
                  </div>
                </div>

                <div className="match-score">
                  <span className="match-label">Skills Match:</span>
                  <div className="match-bar">
                    <div 
                      className="match-fill"
                      style={{ width: `${career.matchScore}%` }}
                    ></div>
                  </div>
                  <span className="match-percentage">{career.matchScore}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="selection-footer">
          <div className="selection-info">
            <p>
              {selectedCareers.length === 0 && "Select 2-3 careers to compare"}
              {selectedCareers.length === 1 && "Select 1-2 more careers to compare"}
              {selectedCareers.length === 2 && "You can select 1 more career or start comparing"}
              {selectedCareers.length === 3 && "Maximum 3 careers selected"}
            </p>
          </div>
          
          <button 
            className={`compare-btn ${selectedCareers.length >= 2 ? 'active' : 'disabled'}`}
            onClick={startComparison}
            disabled={selectedCareers.length < 2}
          >
            Compare Selected Careers ({selectedCareers.length})
          </button>
        </div>
      </div>
    </div>
  )
}

export default CareerComparison