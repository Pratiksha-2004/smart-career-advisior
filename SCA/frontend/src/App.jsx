import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import FloatingChatButton from './components/FloatingChatButton'
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

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/skills" element={<SkillsAssessment />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/compare" element={<CareerComparison />} />
            <Route path="/chat" element={<CareerChat />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <FloatingChatButton />
      </div>
    </Router>
  )
}

export default App
