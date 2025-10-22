import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './FloatingChatButton.css'

function FloatingChatButton() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  return (
    <div className="floating-chat-container">
      <Link 
        to="/chat" 
        className="floating-chat-button"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        title="Chat with AI Career Assistant"
      >
        <div className="chat-icon">💬</div>
        <div className="pulse-ring"></div>
        
        {isTooltipVisible && (
          <div className="chat-tooltip">
            <div className="tooltip-content">
              <div className="tooltip-title">AI Career Assistant</div>
              <div className="tooltip-text">Get instant career advice!</div>
            </div>
            <div className="tooltip-arrow"></div>
          </div>
        )}
      </Link>
    </div>
  )
}

export default FloatingChatButton