import React, { useEffect, useState } from 'react'
import '../ui/theme.css'
import { BottomNav, Card } from '../ui/components'
import { supabase } from '../lib/supabaseClient'

export default function DashboardFancy(){
  const [activos,setActivos]=useState(0)
  const [recientes,setRecientes]=useState<any[]>([])
  useEffect(()=>{(async()=>{
    try{
      const { data: sAct } = await supabase.rpc('count_students_activos')
      setActivos(sAct||0)
    }catch{}
    const { data: rec } = await supabase.from('student').select('id,nombre,ultimo_acceso_at').order('created_at',{ascending:false}).limit(5)
    setRecientes(rec||[])
  })()},[])
  return <div className="container">
    <div className="heading">Dashboard</div>
    <div className="kpi">
      <div className="box"><h3>Total Alumnos Activos</h3><div className="n">{activos}</div></div>
      <div className="box"><h3>Nuevos esta semana</h3><div className="n">3</div></div>
      <div className="box"><h3>Entrenamientos Pendientes</h3><div className="n">2</div></div>
    </div>
    <div style={{height:10}}/>
    <Card>
      <div className="row" style={{justifyContent:'space-between'}}>
        <b>Alumnos Recientes</b> <a href="#/pt/alumnos">Ver todos →</a>
      </div>
      <div className="list" style={{marginTop:8}}>
        {recientes.map(r => (
          <div className="list-item" key={r.id}>
            <div><b>{r.nombre||'Sin nombre'}</b><div style={{fontSize:12,opacity:.7}}>Últ. acceso: {r.ultimo_acceso_at ? new Date(r.ultimo_acceso_at).toLocaleDateString() : '—'}</div></div>
            <a className="badge blue" href={`#/pt/alumnos/${r.id}/perfil`}>Abrir</a>
          </div>
        ))}
      </div>
    </Card>
    <BottomNav active="dashboard"/>
  </div>
}
