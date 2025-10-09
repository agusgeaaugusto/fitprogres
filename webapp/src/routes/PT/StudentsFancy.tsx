import React, { useEffect, useMemo, useState } from 'react'
import '../ui/theme.css'
import { BottomNav, Badge } from '../ui/components'
import { supabase } from '../lib/supabaseClient'

export default function StudentsFancy(){
  const [q,setQ]=useState('')
  const [data,setData]=useState<any[]>([])
  useEffect(()=>{(async()=>{
    const { data } = await supabase.from('student').select('id,nombre,email,estado,ultimo_acceso_at').order('nombre')
    setData(data||[])
  })()},[])
  const list = useMemo(()=> (data||[]).filter(a => (a.nombre||'').toLowerCase().includes(q.toLowerCase())), [data,q])
  return <div className="container">
    <div className="heading">Gestión de Alumnos</div>
    <div className="row" style={{marginBottom:8}}>
      <input placeholder="Buscar alumno por nombre" value={q} onChange={e=>setQ(e.target.value)} style={{flex:1}} />
      <a className="badge orange" href="#/pt/alumnos/nuevo">Crear</a>
    </div>
    <div className="list">
      {list.map(x => (
        <div key={x.id} className="list-item">
          <div><div style={{fontWeight:700}}>{x.nombre||'—'}</div>
            <div style={{fontSize:12,opacity:.7}}>Últ. acceso: {x.ultimo_acceso_at ? new Date(x.ultimo_acceso_at).toLocaleDateString() : '—'}</div>
          </div>
          <div className="row">
            <Badge color={x.estado==='activo'?'blue':'orange'}>{(x.estado||'').toUpperCase()}</Badge>
            <a className="badge" href={`#/pt/alumnos/${x.id}/perfil`}>Editar</a>
            <a className="badge" href={`#/pt/generador/${x.id}`}>Rutina</a>
          </div>
        </div>
      ))}
    </div>
    <BottomNav active="alumnos"/>
  </div>
}
