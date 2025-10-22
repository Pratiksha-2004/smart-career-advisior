import { useState } from 'react'
import './CareerForm.css'

function CareerForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    education: '',
    interests: '',
    skills: '',
    experience: '',
    goals: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <section className="career-form-section">
      <div className="container">
        <form onSubmit={handleSubmit} className="career-form">
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  min="16"
                  max="100"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="education">Education Level</label>
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your education level</option>
                  <option value="high-school">High School</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="experience">Years of Experience</label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select experience level</option>
                  <option value="0-1">0-1 years</option>
                  <option value="2-5">2-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">About You</h3>
            <div className="form-group">
              <label htmlFor="interests">Interests & Passions</label>
              <textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="Tell us what you're passionate about, what activities excite you, and what subjects you enjoy learning about..."
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="skills">Skills & Strengths</label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="List your key skills, strengths, and abilities. Include both technical and soft skills..."
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="goals">Career Goals</label>
              <textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                placeholder="What are your career aspirations? What do you hope to achieve in your professional life?"
                rows="3"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Get Career Recommendations'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default CareerForm