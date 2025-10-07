import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'

// Rutas mínimas; agrega las tuyas aquí
const routes = [
  { path: '/', element: <App/> },
  { path: '/pt/login', element: <div style={{padding:24}}>Login PT</div> },
  { path: '/alumno/login', element: <div style={{padding:24}}>Login Alumno</div> }
]

// GitHub Pages sirve en /fitprogres/, Vite expone esa base como BASE_URL
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')
const router = createBrowserRouter(routes, { basename })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
)
