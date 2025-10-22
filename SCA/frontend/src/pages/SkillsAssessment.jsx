import React, { useState } from 'react'
import './SkillsAssessment.css'
import CareerComparison from '../components/CareerComparison'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../components/Toast'

function SkillsAssessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [results, setResults] = useState(null)
  const [showCareerComparison, setShowCareerComparison] = useState(false)
  const [suggestedCareers, setSuggestedCareers] = useState([])
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  // Sample careers data with skill requirements
  const careersDatabase = [
    {
      id: 1,
      title: 'Software Developer',
      category: 'technology',
      salary: '$75,000 - $120,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Design, develop, and maintain software applications and systems.',
      skills: ['Programming', 'Problem Solving', 'Algorithms', 'Debugging'],
      demand: 95,
      satisfaction: 88,
      skillRequirements: { 'Technical Skills': 4, 'Communication Skills': 3, 'Leadership Skills': 2, 'Creative Skills': 3 }
    },
    {
      id: 2,
      title: 'Data Scientist',
      category: 'technology',
      salary: '$80,000 - $130,000',
      growth: 'Very High',
      education: 'Bachelor\'s/Master\'s Degree',
      description: 'Extract insights from large datasets to drive business decisions.',
      skills: ['Statistics', 'Python/R', 'Machine Learning', 'Data Visualization'],
      demand: 92,
      satisfaction: 85,
      skillRequirements: { 'Technical Skills': 5, 'Communication Skills': 3, 'Leadership Skills': 2, 'Creative Skills': 3 }
    },
    {
      id: 3,
      title: 'UX Designer',
      category: 'creative',
      salary: '$65,000 - $110,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Create intuitive and engaging user experiences for digital products.',
      skills: ['Design Thinking', 'Prototyping', 'User Research', 'Figma/Sketch'],
      demand: 88,
      satisfaction: 90,
      skillRequirements: { 'Technical Skills': 3, 'Communication Skills': 4, 'Leadership Skills': 3, 'Creative Skills': 5 }
    },
    {
      id: 4,
      title: 'Product Manager',
      category: 'business',
      salary: '$85,000 - $140,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Guide product development from conception to launch.',
      skills: ['Strategy', 'Communication', 'Analytics', 'Leadership'],
      demand: 85,
      satisfaction: 87,
      skillRequirements: { 'Technical Skills': 3, 'Communication Skills': 5, 'Leadership Skills': 5, 'Creative Skills': 4 }
    },
    {
      id: 5,
      title: 'Marketing Specialist',
      category: 'business',
      salary: '$50,000 - $85,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Develop and implement marketing campaigns to promote products or services.',
      skills: ['Market Research', 'Campaign Development', 'Brand Management', 'Analytics'],
      demand: 84,
      satisfaction: 83,
      skillRequirements: { 'Technical Skills': 2, 'Communication Skills': 5, 'Leadership Skills': 3, 'Creative Skills': 5 }
    },
    {
      id: 6,
      title: 'Business Analyst',
      category: 'business',
      salary: '$65,000 - $105,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Analyze business processes and recommend improvements.',
      skills: ['Data Analysis', 'Process Mapping', 'Requirements Gathering', 'Communication'],
      demand: 86,
      satisfaction: 83,
      skillRequirements: { 'Technical Skills': 4, 'Communication Skills': 4, 'Leadership Skills': 3, 'Creative Skills': 2 }
    },
    {
      id: 7,
      title: 'Project Manager',
      category: 'business',
      salary: '$70,000 - $120,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Plan, execute, and oversee projects from initiation to completion.',
      skills: ['Project Planning', 'Risk Management', 'Team Leadership', 'Communication'],
      demand: 88,
      satisfaction: 85,
      skillRequirements: { 'Technical Skills': 2, 'Communication Skills': 5, 'Leadership Skills': 5, 'Creative Skills': 3 }
    },
    {
      id: 8,
      title: 'Graphic Designer',
      category: 'creative',
      salary: '$45,000 - $75,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree',
      description: 'Create visual concepts and designs for various media platforms.',
      skills: ['Adobe Creative Suite', 'Typography', 'Brand Design', 'Creative Thinking'],
      demand: 73,
      satisfaction: 88,
      skillRequirements: { 'Technical Skills': 3, 'Communication Skills': 3, 'Leadership Skills': 2, 'Creative Skills': 5 }
    },
    {
      id: 9,
      title: 'Web Designer',
      category: 'creative',
      salary: '$50,000 - $85,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Design and create visually appealing and functional websites.',
      skills: ['HTML/CSS', 'Responsive Design', 'UI Design', 'User Experience'],
      demand: 85,
      satisfaction: 86,
      skillRequirements: { 'Technical Skills': 4, 'Communication Skills': 3, 'Leadership Skills': 2, 'Creative Skills': 5 }
    },
    {
      id: 10,
      title: 'Content Creator',
      category: 'creative',
      salary: '$40,000 - $80,000',
      growth: 'High',
      education: 'Bachelor\'s Degree',
      description: 'Produce engaging content for digital platforms and social media.',
      skills: ['Content Strategy', 'Video Editing', 'Social Media', 'Storytelling'],
      demand: 87,
      satisfaction: 92,
      skillRequirements: { 'Technical Skills': 3, 'Communication Skills': 5, 'Leadership Skills': 2, 'Creative Skills': 5 }
    },
    {
      id: 11,
      title: 'High School Teacher',
      category: 'education',
      salary: '$50,000 - $80,000',
      growth: 'Moderate',
      education: 'Bachelor\'s Degree + Certification',
      description: 'Educate high school students in specific subject areas.',
      skills: ['Subject Expertise', 'Classroom Management', 'Curriculum Development', 'Assessment'],
      demand: 76,
      satisfaction: 87,
      skillRequirements: { 'Technical Skills': 2, 'Communication Skills': 5, 'Leadership Skills': 4, 'Creative Skills': 4 }
    },
    {
      id: 12,
      title: 'Software Engineer',
      category: 'engineering',
      salary: '$80,000 - $130,000',
      growth: 'Very High',
      education: 'Bachelor\'s Degree',
      description: 'Apply engineering principles to software development and systems.',
      skills: ['Software Architecture', 'System Design', 'Programming', 'Testing'],
      demand: 95,
      satisfaction: 89,
      skillRequirements: { 'Technical Skills': 5, 'Communication Skills': 3, 'Leadership Skills': 3, 'Creative Skills': 3 }
    }
  ]

  const skillCategories = [
    {
      name: 'Technical Skills',
      icon: '💻',
      questions: [
        {
          id: 'tech1',
          question: 'How comfortable are you with programming languages?',
          options: [
            { value: 1, label: 'Never programmed before' },
            { value: 2, label: 'Basic understanding' },
            { value: 3, label: 'Can write simple programs' },
            { value: 4, label: 'Comfortable with multiple languages' },
            { value: 5, label: 'Expert level programmer' }
          ]
        },
        {
          id: 'tech2',
          question: 'How skilled are you with data analysis and statistics?',
          options: [
            { value: 1, label: 'No experience' },
            { value: 2, label: 'Basic spreadsheet skills' },
            { value: 3, label: 'Can create charts and basic analysis' },
            { value: 4, label: 'Comfortable with statistical software' },
            { value: 5, label: 'Advanced statistical analysis' }
          ]
        },
        {
          id: 'tech3',
          question: 'How comfortable are you with digital design tools?',
          options: [
            { value: 1, label: 'Never used design software' },
            { value: 2, label: 'Basic photo editing' },
            { value: 3, label: 'Can create simple designs' },
            { value: 4, label: 'Proficient with design software' },
            { value: 5, label: 'Professional designer level' }
          ]
        }
      ]
    },
    {
      name: 'Communication Skills',
      icon: '🗣️',
      questions: [
        {
          id: 'comm1',
          question: 'How comfortable are you with public speaking?',
          options: [
            { value: 1, label: 'Very anxious about speaking publicly' },
            { value: 2, label: 'Uncomfortable but can manage' },
            { value: 3, label: 'Neutral, depends on the topic' },
            { value: 4, label: 'Comfortable speaking to groups' },
            { value: 5, label: 'Love presenting and speaking publicly' }
          ]
        },
        {
          id: 'comm2',
          question: 'How skilled are you at written communication?',
          options: [
            { value: 1, label: 'Struggle with writing' },
            { value: 2, label: 'Basic writing skills' },
            { value: 3, label: 'Can write clearly when needed' },
            { value: 4, label: 'Strong writing abilities' },
            { value: 5, label: 'Exceptional writer' }
          ]
        },
        {
          id: 'comm3',
          question: 'How comfortable are you in team discussions?',
          options: [
            { value: 1, label: 'Prefer to listen only' },
            { value: 2, label: 'Occasionally contribute' },
            { value: 3, label: 'Participate when asked' },
            { value: 4, label: 'Actively participate' },
            { value: 5, label: 'Often lead discussions' }
          ]
        }
      ]
    },
    {
      name: 'Leadership Skills',
      icon: '👑',
      questions: [
        {
          id: 'lead1',
          question: 'How comfortable are you making decisions for a group?',
          options: [
            { value: 1, label: 'Prefer others to decide' },
            { value: 2, label: 'Can decide when forced to' },
            { value: 3, label: 'Comfortable with small decisions' },
            { value: 4, label: 'Confident decision maker' },
            { value: 5, label: 'Love making strategic decisions' }
          ]
        },
        {
          id: 'lead2',
          question: 'How skilled are you at motivating others?',
          options: [
            { value: 1, label: 'Not good at motivating others' },
            { value: 2, label: 'Can encourage close friends' },
            { value: 3, label: 'Sometimes help motivate teammates' },
            { value: 4, label: 'Good at inspiring others' },
            { value: 5, label: 'Natural motivator and leader' }
          ]
        },
        {
          id: 'lead3',
          question: 'How comfortable are you managing conflicts?',
          options: [
            { value: 1, label: 'Avoid conflicts completely' },
            { value: 2, label: 'Try to stay neutral' },
            { value: 3, label: 'Can mediate when necessary' },
            { value: 4, label: 'Good at resolving disputes' },
            { value: 5, label: 'Excel at conflict resolution' }
          ]
        }
      ]
    },
    {
      name: 'Creative Skills',
      icon: '🎨',
      questions: [
        {
          id: 'creative1',
          question: 'How creative are you in problem-solving?',
          options: [
            { value: 1, label: 'Prefer standard solutions' },
            { value: 2, label: 'Sometimes think outside the box' },
            { value: 3, label: 'Can be creative when needed' },
            { value: 4, label: 'Often find unique solutions' },
            { value: 5, label: 'Always approach problems creatively' }
          ]
        },
        {
          id: 'creative2',
          question: 'How skilled are you in artistic expression?',
          options: [
            { value: 1, label: 'No artistic abilities' },
            { value: 2, label: 'Basic artistic skills' },
            { value: 3, label: 'Can create decent art occasionally' },
            { value: 4, label: 'Strong artistic abilities' },
            { value: 5, label: 'Exceptional artistic talent' }
          ]
        },
        {
          id: 'creative3',
          question: 'How good are you at generating new ideas?',
          options: [
            { value: 1, label: 'Rarely have original ideas' },
            { value: 2, label: 'Occasionally have good ideas' },
            { value: 3, label: 'Sometimes contribute creative input' },
            { value: 4, label: 'Often generate innovative ideas' },
            { value: 5, label: 'Constant source of new ideas' }
          ]
        }
      ]
    }
  ]

  const allQuestions = skillCategories.flatMap(category => 
    category.questions.map(q => ({ ...q, category: category.name, icon: category.icon }))
  )

  const currentQuestion = allQuestions[currentQuestionIndex]

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const nextQuestion = () => {
    if (!isAuthenticated) {
      toast.error('Please login to use this feature');
      return;
    }
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      calculateResults()
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const calculateResults = () => {
    const categoryScores = {}
    
    skillCategories.forEach(category => {
      const categoryQuestions = category.questions
      const categoryAnswers = categoryQuestions.map(q => answers[q.id] || 0)
      const average = categoryAnswers.reduce((sum, score) => sum + score, 0) / categoryQuestions.length
      
      categoryScores[category.name] = {
        score: Math.round(average * 20), // Convert to percentage
        level: getSkillLevel(average),
        icon: category.icon,
        recommendations: getRecommendations(category.name, average)
      }
    })

    // Calculate career matches
    const careerMatches = calculateCareerMatches(categoryScores)
    setSuggestedCareers(careerMatches)
    
    setResults(categoryScores)
    setIsCompleted(true)
  }

  const calculateCareerMatches = (userScores) => {
    const matches = careersDatabase.map(career => {
      let totalMatch = 0
      let totalWeight = 0

      // Calculate match score for each skill category
      Object.entries(career.skillRequirements).forEach(([skillCategory, requiredLevel]) => {
        const userLevel = (userScores[skillCategory]?.score || 0) / 20 // Convert percentage back to 1-5 scale
        const weight = requiredLevel // Higher required skills have more weight
        
        // Calculate match based on how close user's skill is to required level
        const skillMatch = Math.max(0, 100 - Math.abs(userLevel - requiredLevel) * 20)
        
        totalMatch += skillMatch * weight
        totalWeight += weight * 100 // Maximum possible score per skill
      })

      const matchScore = totalWeight > 0 ? Math.round((totalMatch / totalWeight) * 100) : 0
      
      return {
        ...career,
        matchScore: Math.min(99, Math.max(65, matchScore)) // Keep scores between 65-99 for realism
      }
    })

    // Sort by match score and return top 4
    return matches
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 4)
  }

  const getSkillLevel = (average) => {
    if (average >= 4.5) return 'Expert'
    if (average >= 3.5) return 'Advanced'
    if (average >= 2.5) return 'Intermediate'
    if (average >= 1.5) return 'Beginner'
    return 'Novice'
  }

  const getRecommendations = (category, average) => {
    const recommendations = {
      'Technical Skills': {
        low: ['Take online coding courses', 'Practice with coding challenges', 'Build simple projects'],
        medium: ['Learn advanced frameworks', 'Contribute to open source', 'Take specialized courses'],
        high: ['Mentor others', 'Lead technical projects', 'Create your own frameworks']
      },
      'Communication Skills': {
        low: ['Join public speaking groups', 'Practice active listening', 'Take writing courses'],
        medium: ['Lead team presentations', 'Write technical documentation', 'Practice storytelling'],
        high: ['Become a conference speaker', 'Write industry articles', 'Mentor communication skills']
      },
      'Leadership Skills': {
        low: ['Take on small leadership roles', 'Learn conflict resolution', 'Practice decision making'],
        medium: ['Lead project teams', 'Mentor junior members', 'Take leadership courses'],
        high: ['Lead major initiatives', 'Develop leadership programs', 'Executive coaching']
      },
      'Creative Skills': {
        low: ['Try creative hobbies', 'Practice brainstorming', 'Take art or design classes'],
        medium: ['Lead creative projects', 'Experiment with new techniques', 'Collaborate with artists'],
        high: ['Innovate in your field', 'Teach creativity workshops', 'Lead design thinking sessions']
      }
    }

    if (average >= 3.5) return recommendations[category].high
    if (average >= 2.5) return recommendations[category].medium
    return recommendations[category].low
  }

  const resetAssessment = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setIsCompleted(false)
    setResults(null)
  }

  const progressPercentage = ((currentQuestionIndex + 1) / allQuestions.length) * 100

  if (isCompleted && results) {
    return (
      <div className="skills-assessment-page">
        <div className="container">
          <div className="results-container">
            <div className="results-header">
              <h1>Your Skills Assessment Results</h1>
              <p>Here's how you scored across different skill categories</p>
            </div>

            <div className="results-grid">
              {Object.entries(results).map(([category, data]) => (
                <div key={category} className="result-card">
                  <div className="result-header">
                    <div className="result-icon">{data.icon}</div>
                    <h3>{category}</h3>
                    <div className="skill-level">{data.level}</div>
                  </div>
                  
                  <div className="score-display">
                    <div className="score-circle">
                      <div className="score-value">{data.score}%</div>
                    </div>
                  </div>

                  <div className="recommendations">
                    <h4>Recommendations:</h4>
                    <ul>
                      {data.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="results-actions">
              <button onClick={resetAssessment} className="retake-btn">
                Retake Assessment
              </button>
              <button className="save-results-btn">
                Save Results
              </button>
              <button 
                className="view-careers-btn"
                onClick={() => {
                  if (!isAuthenticated) {
                    toast.error('Please login to use this feature');
                    return;
                  }
                  setShowCareerComparison(true)
                }}
              >
                View Matching Careers ({suggestedCareers.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="skills-assessment-page">
      <div className="container">
        <div className="assessment-header">
          <h1>Skills Assessment</h1>
          <p>Discover your strengths and areas for improvement</p>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="progress-text">
              Question {currentQuestionIndex + 1} of {allQuestions.length}
            </div>
          </div>
        </div>

        <div className="question-container">
          <div className="question-card">
            <div className="question-header">
              <div className="category-badge">
                <span className="category-icon">{currentQuestion.icon}</span>
                {currentQuestion.category}
              </div>
            </div>

            <div className="question-content">
              <h2>{currentQuestion.question}</h2>
              
              <div className="options-grid">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-button ${answers[currentQuestion.id] === option.value ? 'selected' : ''}`}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  >
                    <div className="option-value">{option.value}</div>
                    <div className="option-label">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="question-navigation">
              <button 
                onClick={prevQuestion} 
                disabled={currentQuestionIndex === 0}
                className="nav-btn prev-btn"
              >
                ← Previous
              </button>
              
              <button 
                onClick={nextQuestion}
                disabled={!answers[currentQuestion.id]}
                className="nav-btn next-btn"
              >
                {currentQuestionIndex === allQuestions.length - 1 ? 'Get Results' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Career Comparison Modal */}
      {showCareerComparison && (
        <CareerComparison 
          suggestedCareers={suggestedCareers}
          onClose={() => setShowCareerComparison(false)}
        />
      )}
    </div>
  )
}

export default SkillsAssessment