import React from 'react'
import { NavLink } from 'react-router-dom'

export function Card(props: React.PropsWithChildren<{title?:string, right?:React.ReactNode}>) {
  return (
    <div className="card">
      {props.title && <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
        <h3>{props.title}</h3>
        <div>{props.right}</div>
      </div>}
      <div>{props.children}</div>
    </div>
  )
}

export function Badge({children}:{children:React.ReactNode}){
  return <span className="badge">{children}</span>
}

export function BottomNav(){
  return (
    <nav className="bottom-nav">
      <NavLink to="/pt" className={({isActive})=>isActive?'active':''}>Dashboard</NavLink>
      <NavLink to="/pt/alumnos" className={({isActive})=>isActive?'active':''}>Alumnos</NavLink>
    </nav>
  )
}
