import React from 'react'

export function Badge({children, color}:{children:React.ReactNode, color?:'blue'|'orange'|'green'}){
  return <span className={'badge ' + (color||'')}>{children}</span>
}
export function Card({children}:{children:React.ReactNode}){ return <div className="card">{children}</div> }
export function BottomNav({active}:{active:'dashboard'|'alumnos'|'generador'|'progreso'}){
  const Btn = (p:{to:string,label:string,act:boolean}) => <a className={'bn ' + (p.act?'active':'')} href={`#/${p.to}`}>{p.label}</a>
  return <nav className="bottom">
    <Btn to="pt" label="Dashboard" act={active==='dashboard'}/>
    <Btn to="pt/alumnos" label="Alumnos" act={active==='alumnos'}/>
    <Btn to="pt/generador/0" label="Generador" act={active==='generador'}/>
    <Btn to="pt/progreso" label="Progreso" act={active==='progreso'}/>
  </nav>
}
