
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './lib/theme.css'
import '../index.css'
import App from './App'
const routes = [{ path: '/', element: <App/> }]
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')
const router = createBrowserRouter(routes, { basename })
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><RouterProvider router={router} /></React.StrictMode>)
