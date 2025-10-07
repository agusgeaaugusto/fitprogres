
import { useState } from 'react'
export type Filtros = { objetivo?:string, nivel?:number, estado?:string }
export function FilterSheet({init, onApply}:{init:Filtros, onApply:(f:Filtros)=>void}){
  const [f,setF]=useState<Filtros>(init)
  return <div className="card" style={{position:'fixed', right:16, bottom:86, width:320, zIndex:50}}>
    <h3 className="heading" style={{fontSize:18, marginTop:0}}>Filtros</h3>
    <div className="section-title">Objetivo</div>
    <select value={f.objetivo||''} onChange={e=>setF({...f, objetivo:e.target.value||undefined})}>
      <option value="">Todos</option>
      <option value="pérdida">Pérdida de peso</option>
      <option value="hipertrofia">Aumento muscular</option>
      <option value="resistencia">Resistencia</option>
    </select>
    <div className="section-title">Nivel de Fitness</div>
    <select value={String(f.nivel||'')} onChange={e=>setF({...f, nivel:e.target.value?Number(e.target.value):undefined})}>
      <option value="">Todos</option>
      <option value="1">Principiante</option>
      <option value="2">Intermedio</option>
      <option value="3">Avanzado</option>
    </select>
    <div className="section-title">Estado</div>
    <select value={f.estado||''} onChange={e=>setF({...f, estado:e.target.value||undefined})}>
      <option value="">Todos</option>
      <option value="activo">Activo</option>
      <option value="inactivo">Inactivo</option>
    </select>
    <div className="row" style={{marginTop:12, justifyContent:'flex-end'}}>
      <button className="ghost" onClick={()=>onApply(init)}>Limpiar</button>
      <button onClick={()=>onApply(f)}>Aplicar filtros</button>
    </div>
  </div>
}
