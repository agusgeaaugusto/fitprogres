import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './lib/theme.css'
import '../index.css'
import App from './App'
import LoginPT from './routes/PT/LoginPT'
import DashboardPT from './routes/PT/DashboardPT'
import StudentsPT from './routes/PT/StudentsPT'
import StudentFormPT from './routes/PT/StudentFormPT'
import GeneratorPT from './routes/PT/GeneratorPT'
import ProgressPT from './routes/PT/ProgressPT'
import LoginAlumno from './routes/ALUMNO/LoginAlumno'
import MiEntrenamiento from './routes/ALUMNO/MiEntrenamiento'
import EjercicioDetalle from './routes/ALUMNO/EjercicioDetalle'
import PerfilProgreso from './routes/ALUMNO/PerfilProgreso'
import Mensajes from './routes/ALUMNO/Mensajes'

const router = createBrowserRouter([
  { path: '/', element: <App/> },
  { path: '/pt/login', element: <LoginPT/> },
  { path: '/pt', element: <DashboardPT/> },
  { path: '/pt/alumnos', element: <StudentsPT/> },
  { path: '/pt/alumno/:id?', element: <StudentFormPT/> },
  { path: '/pt/generador/:studentId', element: <GeneratorPT/> },
  { path: '/pt/progreso/:studentId', element: <ProgressPT/> },
  { path: '/alumno/login', element: <LoginAlumno/> },
  { path: '/alumno', element: <MiEntrenamiento/> },
  { path: '/alumno/ejercicio/:id', element: <EjercicioDetalle/> },
  { path: '/alumno/perfil', element: <PerfilProgreso/> },
  { path: '/alumno/mensajes', element: <Mensajes/> }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
)
