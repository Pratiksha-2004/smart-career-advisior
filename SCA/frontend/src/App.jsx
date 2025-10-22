import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import FloatingChatButton from './components/FloatingChatButton'
import ErrorBoundary from './components/ErrorBoundary'
import { LoadingState } from './components/LoadingStates'
import { ToastProvider } from './components/Toast'
import { AuthProvider } from './hooks/useAuth'
import Home from './pages/Home'
import Assessment from './pages/Assessment'
import Careers from './pages/Careers'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import CareerComparison from './pages/CareerComparison'
import SkillsAssessment from './pages/SkillsAssessment'
import CareerChat from './pages/CareerChat'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ResumeBuilder from './pages/ResumeBuilder'

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <Router>
          <div className="App">
            <Header />
            <main>
              <Suspense fallback={<LoadingState message="Loading page..." />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/assessment" element={<Assessment />} />
                  <Route path="/skills" element={<SkillsAssessment />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/compare" element={<CareerComparison />} />
                  <Route path="/chat" element={<CareerChat />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/resume-builder" element={<ResumeBuilder />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </Suspense>
            </main>
            <FloatingChatButton />
          </div>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App
