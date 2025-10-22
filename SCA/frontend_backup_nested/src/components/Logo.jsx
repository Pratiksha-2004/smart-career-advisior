import './Logo.css'

function Logo({ size = 'medium' }) {
  return (
    <div className={`brand-logo ${size}`}>
      <div className="logo-symbol">
        <svg viewBox="0 0 40 40" className="logo-svg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" />
          <path 
            d="M12 20 L18 26 L28 14" 
            stroke="white" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="logo-brand">
        <span className="brand-name">SCA</span>
        <span className="brand-tagline">Career Advisor</span>
      </div>
    </div>
  )
}

export default Logo