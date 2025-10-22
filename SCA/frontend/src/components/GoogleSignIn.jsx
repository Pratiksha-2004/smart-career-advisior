import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = '685262148501-h55a5e9duhcik89glf3hch1ijkkgg052.apps.googleusercontent.com';

export default function GoogleSignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load Google Identity Services script
    const existing = document.getElementById('google-identity');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'google-identity';
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        // Helpful message for origin/config issues — browser will still show the detailed GSI error.
        console.error('Failed to load Google Identity Services script. Check network and https://accounts.google.com availability.');
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    // response.credential is the ID token
    if (!response?.credential) return;

    try {
      const res = await fetch('http://localhost:8000/auth/google/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: response.credential }),
      });

      // Try to parse JSON, but if the server returned HTML (e.g. a 404 page), log the text to help debugging
        // If the response isn't OK, log the body as text to make debugging easier.
        if (!res.ok) {
          const text = await res.text();
          console.error(`Auth endpoint returned ${res.status} for /auth/google/. Response body:`, text.slice(0, 2000));
          return;
        }

        let data = null;
        try {
          data = await res.json();
        } catch (parseErr) {
          const text = await res.text();
          console.error('Auth endpoint returned non-JSON successful response for /auth/google/:', text.slice(0, 2000));
          return;
        }

      if (data && data.auth_token) {
        // Pass an object so useAuth can persist both name and email
        login(data.auth_token, { name: data.name || data.email, email: data.email || null });
        navigate('/');
      } else {
        console.error('Google auth failed, unexpected payload', data);
      }
    } catch (err) {
      console.error('Google sign-in error', err);
    }
  };

  const renderButton = () => {
    try {
      if (!window.google || !window.google.accounts || !window.google.accounts.id) return;
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
      });
      // render a button container
      window.google.accounts.id.renderButton(
        document.getElementById('gsi-button'),
        { theme: 'outline', size: 'large' }
      );
    } catch (e) {
      console.error('Error initializing Google Identity Services:', e);
    }
    // Optionally prompt
    // window.google.accounts.id.prompt();
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        renderButton();
        clearInterval(id);
      }
    }, 300);
    return () => clearInterval(id);
  }, []);

  return <div id="gsi-button" style={{ display: 'inline-block' }} />;
}
