import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './ui/theme.css'
import DashboardFancy from './routes/PT/DashboardFancy'
import StudentsFancy from './routes/PT/StudentsFancy'
import GeneratorFancy from './routes/PT/GeneratorFancy'
import StudentProfileFancy from './routes/PT/StudentProfileFancy'
import LoginFancy from './routes/PT/LoginFancy'
import RegisterFancy from './routes/PT/RegisterFancy'

function App(){
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pt" replace />} />
        <Route path="/pt" element={<DashboardFancy/>} />
        <Route path="/pt/alumnos" element={<StudentsFancy/>} />
        <Route path="/pt/generador/:studentId" element={<GeneratorFancy/>} />
        <Route path="/pt/alumnos/:id/perfil" element={<StudentProfileFancy/>} />
        <Route path="/pt/login-fancy" element={<LoginFancy/>} />
        <Route path="/pt/registro" element={<RegisterFancy/>} />
        <Route path="*" element={<Navigate to="/pt" replace />} />
      </Routes>
    </HashRouter>
  )
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>)
