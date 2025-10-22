import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth';
import Logo from './Logo'
import './Header.css'

function Header() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  // Debug: log auth state changes to help verify auto-refresh behavior during development
  // Debug: log auth state changes only in development and only when values change.
  // This prevents spamming the console from frequent re-renders.
  // eslint-disable-next-line no-console
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Header auth state changed:', { isAuthenticated, user });
    }
  }, [isAuthenticated, user]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logout();
    // Navigate to home after logout to update UI (SPA navigation)
    navigate('/');
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/assessment', label: 'Assessment' },
    { path: '/skills', label: 'Skills' },
    { path: '/careers', label: 'Careers' },
    { path: '/compare', label: 'Compare' },
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
            {isAuthenticated ? (
              <div className="user-menu">
                <div className="user-info" onClick={() => setShowUserDropdown(v => !v)} style={{ cursor: 'pointer', position: 'relative' }}>
                  <span className="user-icon">👤</span>
                  <span>Welcome, {user?.name || 'User'}</span>
                  <span style={{ marginLeft: 6 }}>▼</span>
                  {showUserDropdown && (
                    <div className="user-dropdown" style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', borderRadius: 8, minWidth: 140, zIndex: 10 }}>
                      <Link to="/dashboard" className="dashboard-btn" style={{ display: 'block', padding: '10px 16px', color: '#333', textDecoration: 'none' }} onClick={() => setShowUserDropdown(false)}>
                        <span>📊</span> Dashboard
                      </Link>
                      <button className="logout-btn" style={{ display: 'block', width: '100%', padding: '10px 16px', background: 'none', border: 'none', color: '#333', textAlign: 'left', cursor: 'pointer' }} onClick={() => { setShowUserDropdown(false); handleLogout(); }}>
                        <span>🚪</span> Logout
                      </button>
                    </div>
                  )}
                </div>
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
            {!isAuthenticated && (
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