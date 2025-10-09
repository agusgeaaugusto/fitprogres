import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './ui/theme.css'
import LoginFancy from './routes/PT/LoginFancy'
import RegisterFancy from './routes/PT/RegisterFancy'
import DashboardFancy from './routes/PT/DashboardFancy'
import StudentsFancy from './routes/PT/StudentsFancy'
import StudentProfileFancy from './routes/PT/StudentProfileFancy'
import GeneratorFancy from './routes/PT/GeneratorFancy'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pt" replace />} />
        <Route path="/pt" element={<DashboardFancy />} />
        <Route path="/pt/login-fancy" element={<LoginFancy />} />
        <Route path="/pt/registro" element={<RegisterFancy />} />
        <Route path="/pt/alumnos" element={<StudentsFancy />} />
        <Route path="/pt/alumnos/:id/perfil" element={<StudentProfileFancy />} />
        <Route path="/pt/generador/:studentId" element={<GeneratorFancy />} />
        <Route path="*" element={<div style={{padding:24}}>404</div>} />
      </Routes>
    </HashRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
