import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../components/Toast';
import './CareerChat.css';

function CareerChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI Career Assistant. I can help you with career advice, job search tips, interview preparation, and more. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickReplies = [
    "How do I prepare for interviews?",
    "What skills should I develop?",
    "How to write a better resume?",
    "Career change advice",
    "Salary negotiation tips",
    "Remote work opportunities"
  ];

  // Generate a simple bot response based on user message
  const generateBotResponse = (userMessage) => {
    // You can expand this logic for more advanced responses
    if (userMessage.toLowerCase().includes('interview')) {
      return "To prepare for interviews, research the company, practice common questions, and review your resume.";
    }
    if (userMessage.toLowerCase().includes('resume')) {
      return "A better resume highlights your achievements, uses clear formatting, and is tailored to the job description.";
    }
    if (userMessage.toLowerCase().includes('skills')) {
      return "Develop both technical and soft skills relevant to your desired career path.";
    }
    if (userMessage.toLowerCase().includes('career change')) {
      return "Consider transferable skills, networking, and additional training when planning a career change.";
    }
    if (userMessage.toLowerCase().includes('salary')) {
      return "Research market rates, practice negotiation, and be confident when discussing salary.";
    }
    if (userMessage.toLowerCase().includes('remote')) {
      return "Remote work opportunities are growing; highlight your remote work skills and search on relevant job boards.";
    }
    return "I'm here to help! Please ask me anything about your career.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    if (!isAuthenticated) {
      toast.error('Please login to use this feature');
      return;
    }
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botReply = {
        id: messages.length + 2,
        type: 'bot',
        content: generateBotResponse(userMessage.content),
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    setInputValue(reply);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history? This action cannot be undone.')) {
      setMessages([
        {
          id: 1,
          type: 'bot',
          content: "Hello! I'm your AI Career Assistant. I can help you with career advice, job search tips, interview preparation, and more. What would you like to know?",
          timestamp: new Date()
        }
      ]);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
              <button 
                className="action-btn" 
                onClick={handleClearChat}
                title="Clear Chat"
              >
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
            <div ref={messagesEndRef}></div>
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
  );
}

export default CareerChat;