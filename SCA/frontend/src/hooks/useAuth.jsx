import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchUserProfile } from '../api/auth';

// Shared Auth context so login state is global across the app
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));
  const [user, setUser] = useState(() => {
    const storedName = localStorage.getItem('user_name');
    const storedEmail = localStorage.getItem('user_email');
    return token ? { token, name: storedName, email: storedEmail } : null;
  });
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      if (!token) {
        setUser(null);
        setIsAuthReady(true);
        return;
      }

      // attempt to fetch latest profile from backend
      try {
        const profile = await fetchUserProfile(token);
        if (cancelled) return;
        if (profile) {
          // Normalize to first name only
          let rawName = profile.first_name || profile.username || localStorage.getItem('user_name') || '';
          const email = profile.email || localStorage.getItem('user_email') || '';
          if (!rawName && email) rawName = email.split('@')[0];
          // If rawName is an email (stored earlier), extract local-part; otherwise take first space-separated token
          let firstName = 'User';
          if (rawName) {
            firstName = rawName.includes('@') ? rawName.split('@')[0] : rawName.split(' ')[0];
          }
          localStorage.setItem('user_name', firstName);
          if (email) localStorage.setItem('user_email', email);
          setUser({ token, name: firstName, email });
        } else {
          // fallback to stored name
          const storedNameRaw = localStorage.getItem('user_name');
          const storedEmail = localStorage.getItem('user_email');
          let firstName = 'User';
          if (storedNameRaw) {
            firstName = storedNameRaw.includes('@') ? storedNameRaw.split('@')[0] : storedNameRaw.split(' ')[0];
          } else if (storedEmail) {
            firstName = storedEmail.split('@')[0];
          }
          setUser({ token, name: firstName, email: storedEmail || null });
        }
      } catch (err) {
          // on error, fallback to stored name (extract from email if necessary)
          const storedNameRaw = localStorage.getItem('user_name');
          const storedEmail = localStorage.getItem('user_email');
          let firstName = 'User';
          if (storedNameRaw) {
            firstName = storedNameRaw.includes('@') ? storedNameRaw.split('@')[0] : storedNameRaw.split(' ')[0];
          } else if (storedEmail) {
            firstName = storedEmail.split('@')[0];
          }
          setUser({ token, name: firstName, email: storedEmail || null });
      } finally {
        if (!cancelled) setIsAuthReady(true);
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const login = useCallback((authToken, name) => {
    localStorage.setItem('auth_token', authToken);
    if (name) {
      // Accept either a string name or an object { name, email }
      if (typeof name === 'string') {
        const firstName = name.includes('@') ? name.split('@')[0] : name.split(' ')[0];
        localStorage.setItem('user_name', firstName);
        setUser({ token: authToken, name: firstName, email: localStorage.getItem('user_email') || null });
      } else if (typeof name === 'object' && name !== null) {
        const nRaw = name.name || name.first_name || ''
        const e = name.email || null
        const firstName = nRaw ? (nRaw.includes('@') ? nRaw.split('@')[0] : nRaw.split(' ')[0]) : (e ? e.split('@')[0] : null)
        if (firstName) localStorage.setItem('user_name', firstName)
        if (e) localStorage.setItem('user_email', e)
        setUser({ token: authToken, name: firstName || null, email: e })
      }
    } else {
      setUser({ token: authToken, name: localStorage.getItem('user_name') || null, email: localStorage.getItem('user_email') || null });
    }
    setToken(authToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    isAuthReady,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Helpful error if hook used outside provider
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
