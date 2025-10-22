import React from 'react'
import './LoadingStates.css'

// Generic Loading Spinner
export const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => (
  <div className={`loading-spinner ${size} ${color}`}>
    <div className="spinner"></div>
  </div>
)

// Skeleton Card for career cards, testimonials, etc.
export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-header">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-text-group">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-subtitle"></div>
      </div>
    </div>
    <div className="skeleton-content">
      <div className="skeleton-line skeleton-full"></div>
      <div className="skeleton-line skeleton-medium"></div>
      <div className="skeleton-line skeleton-small"></div>
    </div>
    <div className="skeleton-footer">
      <div className="skeleton-button"></div>
      <div className="skeleton-rating">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton-star"></div>
        ))}
      </div>
    </div>
  </div>
)

// Skeleton for Dashboard Stats
export const SkeletonStats = () => (
  <div className="skeleton-stats-grid">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="skeleton-stat-card">
        <div className="skeleton-stat-icon"></div>
        <div className="skeleton-stat-content">
          <div className="skeleton-line skeleton-number"></div>
          <div className="skeleton-line skeleton-label"></div>
        </div>
      </div>
    ))}
  </div>
)

// Skeleton for Assessment Questions
export const SkeletonAssessment = () => (
  <div className="skeleton-assessment">
    <div className="skeleton-progress-bar"></div>
    <div className="skeleton-question">
      <div className="skeleton-line skeleton-full"></div>
      <div className="skeleton-line skeleton-medium"></div>
    </div>
    <div className="skeleton-options">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="skeleton-option"></div>
      ))}
    </div>
  </div>
)

// Generic Loading State with message
export const LoadingState = ({ 
  message = 'Loading...', 
  subMessage = '', 
  showSpinner = true 
}) => (
  <div className="loading-state">
    {showSpinner && <LoadingSpinner />}
    <h3>{message}</h3>
    {subMessage && <p>{subMessage}</p>}
  </div>
)

// Page Loading Overlay
export const LoadingOverlay = ({ isVisible, message = 'Loading...' }) => {
  if (!isVisible) return null

  return (
    <div className="loading-overlay">
      <div className="loading-overlay-content">
        <LoadingSpinner size="large" />
        <h3>{message}</h3>
      </div>
    </div>
  )
}