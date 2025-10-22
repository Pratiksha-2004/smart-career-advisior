import React, { useState } from 'react'
import './CareerComparison.css'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../components/Toast'

function CareerComparison() {
  const [selectedCareers, setSelectedCareers] = useState([])
  const [comparisonData, setComparisonData] = useState([])
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  const availableCareers = [
    {
      id: 1,
      title: 'Software Developer',
      salary: '$75,000 - $120,000',
      growth: 'Very High (22%)',
      education: "Bachelor's Degree",
      skills: ['JavaScript', 'Python', 'Problem Solving', 'Git'],
      workLife: 'Good',
      remoteFriendly: 'High',
      jobSecurity: 'High',
      stressLevel: 'Medium',
      creativity: 'High',
      teamwork: 'High'
    },
    {
      id: 2,
      title: 'Data Scientist',
      salary: '$80,000 - $130,000',
      growth: 'Very High (25%)',
      education: "Master's Degree Preferred",
      skills: ['Python', 'Statistics', 'Machine Learning', 'SQL'],
      workLife: 'Good',
      remoteFriendly: 'High',
      jobSecurity: 'High',
      stressLevel: 'Medium-High',
      creativity: 'High',
      teamwork: 'Medium'
    },
    {
      id: 3,
      title: 'UX Designer',
      salary: '$60,000 - $100,000',
      growth: 'High (13%)',
      education: "Bachelor's Degree",
      skills: ['Design Thinking', 'Prototyping', 'User Research', 'Figma'],
      workLife: 'Good',
      remoteFriendly: 'Medium',
      jobSecurity: 'Medium',
      stressLevel: 'Medium',
      creativity: 'Very High',
      teamwork: 'High'
    },
    {
      id: 4,
      title: 'Product Manager',
      salary: '$90,000 - $140,000',
      growth: 'High (15%)',
      education: "Bachelor's Degree",
      skills: ['Strategy', 'Communication', 'Analytics', 'Leadership'],
      workLife: 'Medium',
      remoteFriendly: 'Medium',
      jobSecurity: 'Medium',
      stressLevel: 'High',
      creativity: 'Medium',
      teamwork: 'Very High'
    },
    {
      id: 5,
      title: 'Digital Marketing Manager',
      salary: '$55,000 - $95,000',
      growth: 'High (10%)',
      education: "Bachelor's Degree",
      skills: ['SEO/SEM', 'Analytics', 'Content Strategy', 'Social Media'],
      workLife: 'Good',
      remoteFriendly: 'High',
      jobSecurity: 'Medium',
      stressLevel: 'Medium',
      creativity: 'High',
      teamwork: 'High'
    }
  ]

  const handleCareerSelect = (career) => {
    if (!isAuthenticated) {
      toast.error('Please login to use this feature');
      return;
    }
    if (selectedCareers.includes(career.id)) {
      setSelectedCareers(selectedCareers.filter(id => id !== career.id))
      setComparisonData(comparisonData.filter(c => c.id !== career.id))
    } else if (selectedCareers.length < 3) {
      setSelectedCareers([...selectedCareers, career.id])
      setComparisonData([...comparisonData, career])
    }
  }

  const clearComparison = () => {
    setSelectedCareers([])
    setComparisonData([])
  }

  const getValueColor = (category, value) => {
    const colorMap = {
      'Very High': '#4CAF50',
      'High': '#8BC34A',
      'Medium': '#FF9800',
      'Medium-High': '#FF5722',
      'Low': '#F44336',
      'Good': '#4CAF50',
      'Medium-Low': '#FF9800'
    }
    return colorMap[value] || '#666'
  }

  return (
    <div className="comparison-page">
      <div className="container">
        <div className="comparison-header">
          <h1>Career Comparison Tool</h1>
          <p>Compare up to 3 careers side by side to make informed decisions</p>
        </div>

        <div className="career-selection">
          <h2>Select Careers to Compare (Max 3)</h2>
          <div className="careers-grid">
            {availableCareers.map(career => (
              <div 
                key={career.id}
                className={`career-selector ${selectedCareers.includes(career.id) ? 'selected' : ''}`}
                onClick={() => handleCareerSelect(career)}
              >
                <h3>{career.title}</h3>
                <p className="salary">{career.salary}</p>
                <div className="growth">
                  <span>Growth: {career.growth}</span>
                </div>
                {selectedCareers.includes(career.id) && (
                  <div className="selected-indicator">✓ Selected</div>
                )}
              </div>
            ))}
          </div>
          
          {selectedCareers.length > 0 && (
            <div className="comparison-actions">
              <button onClick={clearComparison} className="clear-btn">
                Clear All
              </button>
              <span className="selection-count">
                {selectedCareers.length}/3 careers selected
              </span>
            </div>
          )}
        </div>

        {comparisonData.length > 0 && (
          <div className="comparison-table-container">
            <h2>Career Comparison</h2>
            <div className="comparison-table">
              <div className="comparison-header-row">
                <div className="attribute-column">
                  <h3>Attribute</h3>
                </div>
                {comparisonData.map(career => (
                  <div key={career.id} className="career-column">
                    <h3>{career.title}</h3>
                  </div>
                ))}
              </div>

              <div className="comparison-row">
                <div className="attribute-cell">
                  <strong>💰 Salary Range</strong>
                </div>
                {comparisonData.map(career => (
                  <div key={career.id} className="value-cell">
                    {career.salary}
                  </div>
                ))}
              </div>

              <div className="comparison-row">
                <div className="attribute-cell">
                  <strong>📈 Job Growth</strong>
                </div>
                {comparisonData.map(career => (
                  <div key={career.id} className="value-cell">
                    <span style={{ color: getValueColor('growth', career.growth.includes('Very High') ? 'Very High' : 'High') }}>
                      {career.growth}
                    </span>
                  </div>
                ))}
              </div>

              <div className="comparison-row">
                <div className="attribute-cell">
                  <strong>🎓 Education Required</strong>
                </div>
                {comparisonData.map(career => (
                  <div key={career.id} className="value-cell">
                    {career.education}
                  </div>
                ))}
              </div>

              <div className="comparison-row">
                <div className="attribute-cell">
                  <strong>⚖️ Work-Life Balance</strong>
                </div>
                {comparisonData.map(career => (
                  <div key={career.id} className="value-cell">
                    <span style={{ color: getValueColor('workLife', career.workLife) }}>
                      {career.workLife}
                    </span>
                  </div>
                ))}
              </div>

              <div className="comparison-row">
                <div className="attribute-cell">
                  <strong>🏠 Remote Work</strong>
                </div>
                {comparisonData.map(career => (
                  <div key={career.id} className="value-cell">
                    <span style={{ color: getValueColor('remote', career.remoteFriendly) }}>
                      {career.remoteFriendly}
                    </span>
                  </div>
                ))}
              </div>

              <div className="comparison-row">
                <div className="attribute-cell">
                  <strong>🔒 Job Security</strong>
                </div>
                {comparisonData.map(career => (
                  <div key={career.id} className="value-cell">
                    <span style={{ color: getValueColor('security', career.jobSecurity) }}>
                      {career.jobSecurity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="comparison-row">
                <div className="attribute-cell">
                  <strong>😰 Stress Level</strong>
                </div>
                {comparisonData.map(career => (
                  <div key={career.id} className="value-cell">
                    <span style={{ color: getValueColor('stress', career.stressLevel) }}>
                      {career.stressLevel}
                    </span>
                  </div>
                ))}
              </div>

              <div className="comparison-row">
                <div className="attribute-cell">
                  <strong>🎨 Creativity</strong>
                </div>
                {comparisonData.map(career => (
                  <div key={career.id} className="value-cell">
                    <span style={{ color: getValueColor('creativity', career.creativity) }}>
                      {career.creativity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="comparison-row">
                <div className="attribute-cell">
                  <strong>👥 Teamwork</strong>
                </div>
                {comparisonData.map(career => (
                  <div key={career.id} className="value-cell">
                    <span style={{ color: getValueColor('teamwork', career.teamwork) }}>
                      {career.teamwork}
                    </span>
                  </div>
                ))}
              </div>

              <div className="comparison-row skills-row">
                <div className="attribute-cell">
                  <strong>🛠️ Key Skills</strong>
                </div>
                {comparisonData.map(career => (
                  <div key={career.id} className="value-cell">
                    <div className="skills-list">
                      {career.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="comparison-actions-bottom">
              <button className="save-comparison-btn">
                Save Comparison
              </button>
              <button className="share-comparison-btn">
                Share Comparison
              </button>
              <button className="export-pdf-btn">
                Export PDF
              </button>
            </div>
          </div>
        )}

        {comparisonData.length === 0 && (
          <div className="empty-comparison">
            <div className="empty-icon">📊</div>
            <h3>No careers selected</h3>
            <p>Select careers from the list above to start comparing</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CareerComparison