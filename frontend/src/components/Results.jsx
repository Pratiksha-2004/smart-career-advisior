import './Results.css'

function Results({ advice }) {
  return (
    <section className="results-section">
      <div className="container">
        <h2>Your Career Recommendations</h2>
        
        <div className="results-grid">
          <div className="result-card">
            <h3>🎯 Recommended Careers</h3>
            <div className="career-list">
              {advice.suggestedCareers.map((career, index) => (
                <div key={index} className="career-item">
                  <span className="career-rank">#{index + 1}</span>
                  <span className="career-name">{career}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="result-card">
            <h3>💪 Key Skills to Develop</h3>
            <div className="skills-list">
              {advice.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="result-card full-width">
            <h3>📋 Recommendations</h3>
            <p className="recommendations-text">
              {advice.recommendations}
            </p>
          </div>
        </div>

        <div className="next-steps">
          <h3>Next Steps</h3>
          <div className="steps-grid">
            <div className="step">
              <span className="step-number">1</span>
              <div className="step-content">
                <h4>Research Your Top Career Choice</h4>
                <p>Learn more about job responsibilities, salary expectations, and growth opportunities</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <div className="step-content">
                <h4>Develop Key Skills</h4>
                <p>Focus on building the skills highlighted in your recommendations</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <div className="step-content">
                <h4>Network & Connect</h4>
                <p>Connect with professionals in your target field through LinkedIn and industry events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Results