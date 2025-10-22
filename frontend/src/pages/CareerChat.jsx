import React, { useState, useRef, useEffect } from 'react'
import './CareerChat.css'

function CareerChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI Career Assistant. I can help you with career advice, job search tips, interview preparation, and more. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickReplies = [
    "How do I prepare for interviews?",
    "What skills should I develop?",
    "How to write a better resume?",
    "Career change advice",
    "Salary negotiation tips",
    "Remote work opportunities"
  ]

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue)
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase()
    
    if (input.includes('interview') || input.includes('prepare')) {
      return `Great question about interview preparation! Here are my top tips:
      
✅ **Research the Company**: Know their mission, values, and recent news
✅ **Practice Common Questions**: Use the STAR method for behavioral questions
✅ **Prepare Your Questions**: Ask about company culture, growth opportunities
✅ **Mock Interviews**: Practice with friends or use online platforms
✅ **Plan Your Outfit**: Dress professionally and prepare everything the night before

Would you like me to help you with specific interview questions or company research techniques?`
    }
    
    if (input.includes('skill') || input.includes('learn')) {
      return `Excellent! Developing the right skills is crucial for career growth. Here are the most in-demand skills:

🔥 **Technical Skills**:
• Programming (Python, JavaScript, SQL)
• Data Analysis & Visualization
• Digital Marketing & SEO
• Cloud Computing (AWS, Azure)

🧠 **Soft Skills**:
• Communication & Leadership
• Problem-solving & Critical thinking
• Adaptability & Learning agility
• Emotional Intelligence

I recommend starting with one technical and one soft skill. What industry are you interested in?`
    }
    
    if (input.includes('resume') || input.includes('cv')) {
      return `Let me help you create a standout resume! Here's what makes a resume effective:

📝 **Resume Best Practices**:
• Keep it to 1-2 pages maximum
• Use action verbs (achieved, led, improved)
• Quantify your accomplishments with numbers
• Tailor it to each job application
• Use a clean, ATS-friendly format

📊 **Key Sections**:
1. Professional Summary (2-3 lines)
2. Work Experience (most recent first)
3. Skills & Technologies
4. Education & Certifications

Would you like me to help you write a specific section or review your current resume?`
    }
    
    if (input.includes('career change') || input.includes('switch')) {
      return `Career changes can be exciting! Here's a strategic approach:

🎯 **Career Change Strategy**:
1. **Self-Assessment**: Identify your values, interests, and transferable skills
2. **Research**: Explore new industries and required qualifications
3. **Skill Gap Analysis**: Identify what skills you need to develop
4. **Network**: Connect with professionals in your target field
5. **Transition Plan**: Consider gradual transitions or additional education

💡 **Transferable Skills**: Most skills transfer between roles (leadership, communication, project management)

What field are you considering moving into? I can provide more specific advice!`
    }
    
    if (input.includes('salary') || input.includes('negotiate')) {
      return `Salary negotiation is a crucial skill! Here's how to approach it:

💰 **Negotiation Tips**:
• Research market rates (use Glassdoor, PayScale, LinkedIn)
• Know your worth and document your achievements
• Consider the total compensation package
• Practice your pitch beforehand
• Be confident but flexible

📈 **When to Negotiate**:
• After receiving a job offer
• During performance reviews
• When taking on additional responsibilities
• After completing major projects successfully

🎯 **What to Negotiate**:
• Base salary, bonuses, stock options
• Vacation time, flexible work arrangements
• Professional development budget
• Work-from-home options

What's your current situation? I can help you prepare for a specific negotiation!`
    }
    
    if (input.includes('remote') || input.includes('work from home')) {
      return `Remote work is more popular than ever! Here's what you need to know:

🏠 **Remote Work Tips**:
• Set up a dedicated workspace
• Establish clear boundaries and routines
• Over-communicate with your team
• Use productivity tools effectively
• Take regular breaks and stay social

💼 **Finding Remote Jobs**:
• Remote-specific job boards (Remote.co, FlexJobs)
• Company websites (Buffer, GitLab, Zapier)
• LinkedIn with location filter "Remote"
• Network with remote workers in your field

🔧 **Essential Remote Skills**:
• Self-motivation and time management
• Digital communication tools
• Problem-solving independently
• Technical troubleshooting

Which aspect of remote work interests you most?`
    }
    
    if (input.includes('thank') || input.includes('help')) {
      return `You're very welcome! I'm here to help you succeed in your career journey. 

Is there anything else you'd like to know about:
• Job search strategies
• Professional networking
• Industry trends
• Work-life balance
• Career development planning

Feel free to ask me anything career-related! 🚀`
    }
    
    // Default response
    return `That's an interesting question! While I can help with many career-related topics, I specialize in:

🎯 **My Expertise**:
• Career planning and development
• Job search strategies
• Interview preparation
• Resume and LinkedIn optimization
• Skill development recommendations
• Salary negotiation
• Career transitions
• Professional networking

Could you rephrase your question or ask about one of these topics? I'm here to help you advance your career! 🚀`
  }

  const handleQuickReply = (reply) => {
    setInputValue(reply)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="career-chat-page">
      <div className="container">
        <div className="chat-page-header">
          <h1 className="chat-main-title">
            <span className="title-icon">💬</span>
            Career Guidance Chat
            <span className="title-badge">AI Powered</span>
          </h1>
          <p className="chat-subtitle">
            Get personalized career advice, interview tips, and professional guidance from our AI assistant
          </p>
        </div>
        
        <div className="chat-container">
          <div className="chat-header">
            <div className="bot-info">
              <div className="bot-avatar">🤖</div>
              <div className="bot-details">
                <h3 className="bot-name">
                  AI Career Assistant
                  <span className="bot-speciality">Professional Guidance</span>
                </h3>
                <p className="bot-status">
                  <span className="status-dot"></span>
                  Online - Ready to Help
                </p>
              </div>
            </div>
            <div className="chat-actions">
              <button className="action-btn" title="Clear Chat">
                🗑️
              </button>
              <button className="action-btn" title="Settings">
                ⚙️
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === 'bot' ? '🤖' : '👤'}
                </div>
                <div className="message-content">
                  <div className="message-text">
                    {message.content.split('\n').map((line, index) => (
                      <div key={index}>
                        {line}
                        {index < message.content.split('\n').length - 1 && <br />}
                      </div>
                    ))}
                  </div>
                  <div className="message-time">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="quick-replies">
            <div className="quick-replies-header">Quick Questions:</div>
            <div className="quick-replies-grid">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  className="quick-reply-btn"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          <div className="chat-input-container">
            <div className="chat-input">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your career..."
                rows="1"
                className="input-field"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="send-btn"
              >
                📤
              </button>
            </div>
            <div className="input-hint">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerChat