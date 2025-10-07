
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './lib/auth'

// PT
import LoginPT from './routes/PT/LoginPT'
import LicenciaPT from './routes/PT/LicenciaPT'
import DashboardPT from './routes/PT/DashboardPT'
import StudentsPT from './routes/PT/StudentsPT'
import StudentFormPT from './routes/PT/StudentFormPT'
import GeneratorPT from './routes/PT/GeneratorPT'
import ProgressPT from './routes/PT/ProgressPT'

// Alumno
import LoginAlumno from './routes/ALUMNO/LoginAlumno'
import MiEntrenamiento from './routes/ALUMNO/MiEntrenamiento'
import PerfilProgreso from './routes/ALUMNO/PerfilProgreso'
import Mensajes from './routes/ALUMNO/Mensajes'

const routes = [
  { path: '/', element: <App/> },
  { path: '/pt/login', element: <LoginPT/> },
  { path: '/pt/licencia', element: <LicenciaPT/> },
  { path: '/pt', element: <DashboardPT/> },
  { path: '/pt/alumnos', element: <StudentsPT/> },
  { path: '/pt/alumnos/nuevo', element: <StudentFormPT/> },
  { path: '/pt/alumnos/:id', element: <StudentFormPT/> },
  { path: '/pt/generador/:studentId', element: <GeneratorPT/> },
  { path: '/pt/progreso/:studentId', element: <ProgressPT/> },

  { path: '/alumno/login', element: <LoginAlumno/> },
  { path: '/alumno/entrenamiento', element: <MiEntrenamiento/> },
  { path: '/alumno/perfil', element: <PerfilProgreso/> },
  { path: '/alumno/mensajes', element: <Mensajes/> }
]

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')
const router = createBrowserRouter(routes, { basename })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>
)
