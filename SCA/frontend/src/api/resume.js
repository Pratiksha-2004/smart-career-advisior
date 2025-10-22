const API_BASE = '' // same origin for backend during dev proxy or full URL if needed

export async function fetchResume(token) {
  if (!token) throw new Error('No auth token')
  const res = await fetch(`${API_BASE}/auth/users/me/resume/`, {
    method: 'GET',
    headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Failed to fetch resume')
  return res.json()
}

export async function saveResume(token, data) {
  if (!token) throw new Error('No auth token')
  const res = await fetch(`${API_BASE}/auth/users/me/resume/`, {
    method: 'PUT',
    headers: { 'Authorization': `Token ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ data })
  })
  if (!res.ok) throw new Error('Failed to save resume')
  return res.json()
}
