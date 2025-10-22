// import React, { useState } from 'react'
// import CareerForm from '../components/CareerForm'
// import Results from '../components/Results'
// import './Assessment.css'

// function Assessment() {
//   const [careerAdvice, setCareerAdvice] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [currentStep, setCurrentStep] = useState(1)

//   const handleCareerSubmit = async (formData) => {
//     setIsLoading(true)
//     setCurrentStep(2)
    
//     // Simulate API call - replace with actual backend integration
//     setTimeout(() => {
//       const mockAdvice = {
//         suggestedCareers: [
//           'Software Developer',
//           'Data Scientist',
//           'Product Manager',
//           'UX Designer',
//           'Digital Marketing Manager'
//         ],
//         skills: ['JavaScript', 'Python', 'Problem Solving', 'Communication', 'Leadership'],
//         recommendations: `Based on your interests in ${formData.interests} and your skills in ${formData.skills}, we recommend focusing on technology and creative roles. Your educational background and experience level suggest you're well-positioned for growth in these areas.`,
//         matchScore: 92,
//         personalityType: 'Analytical Thinker',
//         careerPaths: [
//           {
//             title: 'Software Developer',
//             match: 95,
//             salary: '$75,000 - $120,000',
//             growth: 'High',
//             description: 'Perfect match for your analytical skills and technical interests.'
//           },
//           {
//             title: 'Data Scientist',
//             match: 88,
//             salary: '$80,000 - $130,000',
//             growth: 'Very High',
//             description: 'Great fit for your problem-solving abilities and mathematical thinking.'
//           }
//         ]
//       }
//       setCareerAdvice(mockAdvice)
//       setIsLoading(false)
//       setCurrentStep(3)
//     }, 3000)
//   }

//   const resetAssessment = () => {
//     setCareerAdvice(null)
//     setIsLoading(false)
//     setCurrentStep(1)
//   }

//   return (
//     <div className="assessment-page">
//       <div className="assessment-header">
//         <div className="container">
//           <h1>Career Assessment</h1>
//           <p>Tell us about yourself to get personalized career recommendations</p>
          
//           <div className="progress-indicator">
//             <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
//               <span className="step-number">1</span>
//               <span className="step-label">Assessment</span>
//             </div>
//             <div className="progress-line"></div>
//             <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
//               <span className="step-number">2</span>
//               <span className="step-label">Analysis</span>
//             </div>
//             <div className="progress-line"></div>
//             <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
//               <span className="step-number">3</span>
//               <span className="step-label">Results</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {currentStep === 1 && (
//         <div className="assessment-intro">
//           <div className="container">
//             <div className="section-header">
//               <h2>How It Works</h2>
//             </div>
//             <div className="features-grid">
//               <div className="feature-card">
//                 <div className="process-icon">📝</div>
//                 <h3>Tell Us About Yourself</h3>
//                 <p>Share your background, interests, and career goals</p>
//               </div>
//               <div className="feature-card">
//                 <div className="process-icon">🧠</div>
//                 <h3>AI Analysis</h3>
//                 <p>Our advanced algorithms analyze your profile</p>
//               </div>
//               <div className="feature-card">
//                 <div className="process-icon">🎯</div>
//                 <h3>Get Recommendations</h3>
//                 <p>Receive personalized career matches and guidance</p>
//               </div>
//             </div>
//             <div className="intro-stats">
//               <div className="stat-card">
//                 <h3>15 Minutes</h3>
//                 <p>Average completion time</p>
//               </div>
//               <div className="stat-card">
//                 <h3>95%</h3>
//                 <p>Accuracy rate</p>
//               </div>
//               <div className="stat-card">
//                 <h3>500+</h3>
//                 <p>Career options</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {currentStep === 2 && isLoading && (
//         <div className="analysis-section">
//           <div className="container">
//             <div className="analysis-content">
//               <div className="analysis-animation">
//                 <div className="brain-icon">🧠</div>
//                 <div className="analysis-waves">
//                   <div className="wave"></div>
//                   <div className="wave"></div>
//                   <div className="wave"></div>
//                 </div>
//               </div>
//               <h2>Analyzing Your Profile...</h2>
//               <p>Our AI is processing your information to find the perfect career matches</p>
//               <div className="analysis-steps">
//                 <div className="analysis-step active">
//                   <span>✓</span> Processing personal information
//                 </div>
//                 <div className="analysis-step active">
//                   <span>✓</span> Analyzing skills and interests
//                 </div>
//                 <div className="analysis-step active">
//                   <span>⏳</span> Matching with career database
//                 </div>
//                 <div className="analysis-step">
//                   <span>⏳</span> Generating recommendations
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {currentStep === 1 && <CareerForm onSubmit={handleCareerSubmit} isLoading={isLoading} />}
      
//       {currentStep === 3 && careerAdvice && (
//         <div className="results-wrapper">
//           <Results advice={careerAdvice} />
//           <div className="results-actions">
//             <div className="container">
//               <button onClick={resetAssessment} className="retake-button">
//                 Take Assessment Again
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Assessment


// import React, { useState } from 'react'
// import CareerForm from '../components/CareerForm'
// import Results from '../components/Results'
// import './Assessment.css'

// function Assessment() {
//   const [careerAdvice, setCareerAdvice] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [currentStep, setCurrentStep] = useState(1)

//   const handleCareerSubmit = async (formData) => {
//     setIsLoading(true)
//     setCurrentStep(2)

//     // Simulate API call
//     setTimeout(() => {
//       const mockAdvice = {
//         suggestedCareers: [
//           'Software Developer',
//           'Data Scientist',
//           'Product Manager',
//           'UX Designer',
//           'Digital Marketing Manager'
//         ],
//         skills: ['JavaScript', 'Python', 'Problem Solving', 'Communication', 'Leadership'],
//         recommendations: `Based on your interests in ${formData.interests} and your skills in ${formData.skills}, we recommend focusing on technology and creative roles.`,
//         matchScore: 92,
//         personalityType: 'Analytical Thinker',
//         careerPaths: [
//           {
//             title: 'Software Developer',
//             match: 95,
//             salary: '$75,000 - $120,000',
//             growth: 'High',
//             description: 'Perfect match for your analytical skills and technical interests.'
//           },
//           {
//             title: 'Data Scientist',
//             match: 88,
//             salary: '$80,000 - $130,000',
//             growth: 'Very High',
//             description: 'Great fit for your problem-solving abilities and mathematical thinking.'
//           }
//         ]
//       }
//       setCareerAdvice(mockAdvice)
//       setIsLoading(false)
//       setCurrentStep(3)
//     }, 3000)
//   }

//   const resetAssessment = () => {
//     setCareerAdvice(null)
//     setIsLoading(false)
//     setCurrentStep(1)
//   }

//   return (
//     <div className="assessment-page">
//       {/* Header */}
//       <div className="assessment-header">
//         <div className="container">
//           <h1>Career Assessment</h1>
//           <p>Tell us about yourself to get personalized career recommendations</p>

//           {/* Progress Steps */}
//           <div className="progress-indicator">
//             <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
//               <span className="step-number">1</span>
//               <span className="step-label">Assessment</span>
//             </div>
//             <div className="progress-line"></div>
//             <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
//               <span className="step-number">2</span>
//               <span className="step-label">Analysis</span>
//             </div>
//             <div className="progress-line"></div>
//             <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
//               <span className="step-number">3</span>
//               <span className="step-label">Results</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Step 1 - How it Works */}
//       {currentStep === 1 && (
//         <div className="assessment-intro">
//           <div className="container">
//             <h2 className="section-header">How It Works</h2>

//             <div className="features-grid">
//               <div className="feature-card">
//                 <div className="process-icon">📝</div>
//                 <h3>Tell Us About Yourself</h3>
//                 <p>Share your background, interests, and career goals</p>
//               </div>
//               <div className="feature-card">
//                 <div className="process-icon">🧠</div>
//                 <h3>AI Analysis</h3>
//                 <p>Our advanced algorithms analyze your profile</p>
//               </div>
//               <div className="feature-card">
//                 <div className="process-icon">🎯</div>
//                 <h3>Get Recommendations</h3>
//                 <p>Receive personalized career matches and guidance</p>
//               </div>
//             </div>

//             <div className="intro-stats">
//               <div className="stat-card">
//                 <h3>15 Minutes</h3>
//                 <p>Average completion time</p>
//               </div>
//               <div className="stat-card">
//                 <h3>95%</h3>
//                 <p>Accuracy rate</p>
//               </div>
//               <div className="stat-card">
//                 <h3>500+</h3>
//                 <p>Career options</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Step 2 - Loading */}
//       {currentStep === 2 && isLoading && (
//         <div className="analysis-section">
//           <div className="container">
//             <div className="analysis-content">
//               <div className="analysis-animation">
//                 <div className="brain-icon">🧠</div>
//                 <div className="analysis-waves">
//                   <div className="wave"></div>
//                   <div className="wave"></div>
//                   <div className="wave"></div>
//                 </div>
//               </div>
//               <h2>Analyzing Your Profile...</h2>
//               <p>Our AI is processing your information to find the perfect career matches</p>
//               <div className="analysis-steps">
//                 <div className="analysis-step active">
//                   <span>✓</span> Processing personal information
//                 </div>
//                 <div className="analysis-step active">
//                   <span>✓</span> Analyzing skills and interests
//                 </div>
//                 <div className="analysis-step active">
//                   <span>⏳</span> Matching with career database
//                 </div>
//                 <div className="analysis-step">
//                   <span>⏳</span> Generating recommendations
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Career Form */}
//       {currentStep === 1 && <CareerForm onSubmit={handleCareerSubmit} isLoading={isLoading} />}

//       {/* Step 3 - Results */}
//       {currentStep === 3 && careerAdvice && (
//         <div className="results-wrapper">
//           <Results advice={careerAdvice} />
//           <div className="results-actions">
//             <div className="container">
//               <button onClick={resetAssessment} className="retake-button">
//                 Take Assessment Again
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Assessment



import React, { useState } from 'react'
import CareerForm from '../components/CareerForm'
import Results from '../components/Results'
import './Assessment.css'

function Assessment() {
  const [careerAdvice, setCareerAdvice] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleCareerSubmit = async (formData) => {
    setIsLoading(true)
    setCurrentStep(2)

    setTimeout(() => {
      const mockAdvice = {
        suggestedCareers: [
          'Software Developer',
          'Data Scientist',
          'Product Manager',
          'UX Designer',
          'Digital Marketing Manager'
        ],
        skills: ['JavaScript', 'Python', 'Problem Solving', 'Communication', 'Leadership'],
        recommendations: `Based on your interests in ${formData.interests} and your skills in ${formData.skills}, we recommend focusing on technology and creative roles.`,
        matchScore: 92,
        personalityType: 'Analytical Thinker',
        careerPaths: [
          {
            title: 'Software Developer',
            match: 95,
            salary: '$75,000 - $120,000',
            growth: 'High',
            description: 'Perfect match for your analytical skills and technical interests.'
          },
          {
            title: 'Data Scientist',
            match: 88,
            salary: '$80,000 - $130,000',
            growth: 'Very High',
            description: 'Great fit for your problem-solving abilities and mathematical thinking.'
          }
        ]
      }
      setCareerAdvice(mockAdvice)
      setIsLoading(false)
      setCurrentStep(3)
    }, 3000)
  }

  const resetAssessment = () => {
    setCareerAdvice(null)
    setIsLoading(false)
    setCurrentStep(1)
  }

  return (
    <div className="assessment-page">
      {/* Header */}
      <div className="assessment-header">
        <div className="container">
          <h1>Career Assessment</h1>
          <p>Tell us about yourself to get personalized career recommendations</p>

          {/* Progress Steps */}
          <div className="progress-indicator">
            <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Assessment</span>
            </div>
            <div className="progress-line"></div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Analysis</span>
            </div>
            <div className="progress-line"></div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1 - How it Works */}
      {currentStep === 1 && (
        <div className="assessment-intro">
          <div className="container">
            {/* Centered Heading */}
            <h2 className="section-title">How It Works</h2>

            {/* Three cards */}
            <div className="features-grid">
              <div className="feature-card">
                <div className="process-icon">📝</div>
                <h3>Tell Us About Yourself</h3>
                <p>Share your background, interests, and career goals</p>
              </div>
              <div className="feature-card">
                <div className="process-icon">🧠</div>
                <h3>AI Analysis</h3>
                <p>Our advanced algorithms analyze your profile</p>
              </div>
              <div className="feature-card">
                <div className="process-icon">🎯</div>
                <h3>Get Recommendations</h3>
                <p>Receive personalized career matches and guidance</p>
              </div>
            </div>

            {/* Stats */}
            <div className="intro-stats">
              <div className="stat-card">
                <h3>15 Minutes</h3>
                <p>Average completion time</p>
              </div>
              <div className="stat-card">
                <h3>95%</h3>
                <p>Accuracy rate</p>
              </div>
              <div className="stat-card">
                <h3>500+</h3>
                <p>Career options</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 - Loading */}
      {currentStep === 2 && isLoading && (
        <div className="analysis-section">
          <div className="container">
            <div className="analysis-content">
              <div className="analysis-animation">
                <div className="brain-icon">🧠</div>
                <div className="analysis-waves">
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                </div>
              </div>
              <h2>Analyzing Your Profile...</h2>
              <p>Our AI is processing your information to find the perfect career matches</p>
              <div className="analysis-steps">
                <div className="analysis-step active">
                  <span>✓</span> Processing personal information
                </div>
                <div className="analysis-step active">
                  <span>✓</span> Analyzing skills and interests
                </div>
                <div className="analysis-step active">
                  <span>⏳</span> Matching with career database
                </div>
                <div className="analysis-step">
                  <span>⏳</span> Generating recommendations
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Career Form */}
      {currentStep === 1 && <CareerForm onSubmit={handleCareerSubmit} isLoading={isLoading} />}

      {/* Step 3 - Results */}
      {currentStep === 3 && careerAdvice && (
        <div className="results-wrapper">
          <Results advice={careerAdvice} />
          <div className="results-actions">
            <div className="container">
              <button onClick={resetAssessment} className="retake-button">
                Take Assessment Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Assessment
