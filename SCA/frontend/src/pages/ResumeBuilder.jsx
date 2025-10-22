import React, { useState, useRef } from 'react'
import './ResumeBuilder.css'
import { useAuth } from '../hooks/useAuth'
import { fetchResume, saveResume } from '../api/resume'

function ResumeBuilder() {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    github: '',
    projects: [],
    summary: '',
    experience: '',
    education: ''
  })

  const previewRef = useRef(null)
  const { user, token, isAuthenticated } = useAuth()

  function handleChange(e) {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  function handleProjectChange(index, field, value) {
    setProfile(prev => {
      const next = { ...prev }
      next.projects = Array.isArray(next.projects) ? [...next.projects] : []
      next.projects[index] = { ...next.projects[index], [field]: value }
      return next
    })
  }

  function addProject() {
    setProfile(prev => ({ ...prev, projects: [...(prev.projects || []), { title: '', description: '', link: '' }] }))
  }

  function removeProject(index) {
    setProfile(prev => {
      const next = { ...prev }
      next.projects = (next.projects || []).filter((_, i) => i !== index)
      return next
    })
  }

  function handleSave() {
    if (isAuthenticated && token) {
      saveResume(token, profile)
        .then(() => alert('Resume saved to your account.'))
        .catch((err) => {
          console.error(err)
          alert('Failed to save to server; saved locally instead.')
          localStorage.setItem('sca_resume', JSON.stringify(profile))
        })
      return
    }
    // fallback local save
    localStorage.setItem('sca_resume', JSON.stringify(profile))
    alert('Resume saved locally in your browser.')
  }

  function handleLoad() {
    if (isAuthenticated && token) {
      fetchResume(token)
        .then(res => {
          if (res && res.data) setProfile(res.data)
          else alert('No resume found on your account.')
        })
        .catch(err => {
          console.error(err)
          alert('Failed to load from server; trying local copy.')
          const saved = localStorage.getItem('sca_resume')
          if (saved) setProfile(JSON.parse(saved))
        })
      return
    }
    const saved = localStorage.getItem('sca_resume')
    if (saved) {
      setProfile(JSON.parse(saved))
    } else {
      alert('No saved resume found.')
    }
  }

  function handlePrint() {
    // print the preview area
    if (!previewRef.current) return
    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (!printWindow) return
    printWindow.document.write('<html><head><title>Resume</title>')
    printWindow.document.write('<link rel="stylesheet" href="/assets/index-DJIjx7_C.css">')
    printWindow.document.write('</head><body>')
    printWindow.document.write(previewRef.current.innerHTML)
    printWindow.document.write('</body></html>')
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => printWindow.print(), 300)
  }

  function handleDownloadJSON() {
    const dataStr = JSON.stringify(profile, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = (profile.name || 'resume').replace(/\s+/g, '_') + '.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="resume-builder-page container">
      <div className="builder-header">
        <h1>Resume Builder</h1>
        <p>Create and update your resume based on assessment results.</p>
      </div>

      <div className="builder-grid">
        <div className="builder-form">
          <label>
            Full Name
            <input name="name" value={profile.name} onChange={handleChange} />
          </label>

          <label>
            Professional Title
            <input name="title" value={profile.title} onChange={handleChange} />
          </label>

          <label>
            Email
            <input name="email" value={profile.email} onChange={handleChange} />
          </label>

          <label>
            Address
            <input name="address" value={profile.address} onChange={handleChange} />
          </label>

          <label>
            GitHub Link
            <input name="github" value={profile.github || ''} onChange={handleChange} placeholder="https://github.com/username" />
          </label>

          <label>
            Phone
            <input name="phone" value={profile.phone} onChange={handleChange} />
          </label>

          <label>
            Summary
            <textarea name="summary" value={profile.summary} onChange={handleChange} rows={4} />
          </label>

          <label>
            Experience
            <textarea name="experience" value={profile.experience} onChange={handleChange} rows={6} />
          </label>

          <div className="projects-section">
            <label>Projects</label>
            {(profile.projects || []).map((p, i) => (
              <div key={i} className="project-item">
                <input placeholder="Project title" value={p.title || ''} onChange={e => handleProjectChange(i, 'title', e.target.value)} />
                <input placeholder="Project link (optional)" value={p.link || ''} onChange={e => handleProjectChange(i, 'link', e.target.value)} />
                <textarea placeholder="Short description" value={p.description || ''} onChange={e => handleProjectChange(i, 'description', e.target.value)} rows={2} />
                <button type="button" className="btn-outline" onClick={() => removeProject(i)}>Remove</button>
              </div>
            ))}
            <button type="button" className="btn-secondary" onClick={addProject}>Add Project</button>
          </div>

          <label>
            Education
            <textarea name="education" value={profile.education} onChange={handleChange} rows={4} />
          </label>

          <div className="builder-actions">
            <button onClick={handleSave} className="btn-primary">Save</button>
            <button onClick={handleLoad} className="btn-secondary">Load</button>
            <button onClick={handlePrint} className="btn-outline">Print / Export</button>
            <button onClick={handleDownloadJSON} className="btn-secondary">Download JSON</button>
          </div>
        </div>

        <div className="builder-preview" ref={previewRef} aria-label="Resume preview">
          <div className="resume-card">
            <h2 className="resume-name">{profile.name || 'Your Name'}</h2>
            <p className="resume-title">{profile.title || 'Professional Title'}</p>
            <div className="contact">
              <span>{profile.email}</span>
              <span>{profile.phone}</span>
              <span>{profile.address}</span>
            </div>
              {profile.github && (
                <div className="github-link">GitHub: <a href={profile.github} target="_blank" rel="noreferrer">{profile.github}</a></div>
              )}
              {profile.projects && profile.projects.length > 0 && (
                <section>
                  <h3>Projects</h3>
                  <div className="projects-list">
                    {profile.projects.map((p, idx) => (
                      <div key={idx} className="project-preview">
                        <h4>{p.title}</h4>
                        {p.link && <div><a href={p.link} target="_blank" rel="noreferrer">{p.link}</a></div>}
                        <div>{p.description}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            <section>
              <h3>Summary</h3>
              <p>{profile.summary || 'A concise summary about your experience and strengths.'}</p>
            </section>
            <section>
              <h3>Experience</h3>
              <div>{profile.experience || 'List your work experience, achievements, and responsibilities.'}</div>
            </section>
            <section>
              <h3>Education</h3>
              <div>{profile.education || 'Your academic qualifications and certifications.'}</div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
