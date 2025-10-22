// src/api/auth.js
export async function registerUser({ username, password, email, re_password }) {
  const response = await fetch('http://localhost:8000/auth/users/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email, re_password, first_name: arguments[0].first_name, last_name: arguments[0].last_name }),
  });
  return response.json();
}

export async function loginUser({ username, password }) {
  const response = await fetch('http://localhost:8000/auth/token/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response.json(); // returns {auth_token: "..."}
}

export async function fetchUserProfile(token) {
  const response = await fetch('http://localhost:8000/auth/users/me/', {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.ok ? response.json() : null;
}
