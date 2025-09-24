import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Logo from './Logo'
import './Header.css'

function Header() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from a context/auth provider
  const [user, setUser] = useState(null) // This would come from a context/auth provider

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    // Clear auth state and navigate
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/assessment', label: 'Assessment' },
    { path: '/skills', label: 'Skills' },
    { path: '/careers', label: 'Careers' },
    { path: '/compare', label: 'Compare' },
    { path: '/chat', label: 'Chat' },
    { path: '/about', label: 'About' }
  ]

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" className="logo-link">
              <Logo size="medium" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav desktop-nav">
            <ul>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={location.pathname === link.path ? 'active' : ''}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Actions */}
          <div className="user-actions">
            {isLoggedIn ? (
              <div className="user-menu">
                <div className="user-info">
                  <span className="user-icon">👤</span>
                  <span>Welcome, {user?.name || 'User'}</span>
                </div>
                <Link to="/dashboard" className="dashboard-btn">
                  <span>📊</span>
                  Dashboard
                </Link>
                <button 
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  <span>🚪</span>
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="login-btn">Login</Link>
                <Link to="/signup" className="signup-btn">Sign Up</Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            {navLinks.map((link, index) => (
              <li key={link.path}>
                <Link 
                  to={link.path} 
                  className={location.pathname === link.path ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {!isLoggedIn && (
              <>
                <li>
                  <Link 
                    to="/login"
                    className="mobile-auth-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/signup"
                    className="mobile-auth-link signup"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header