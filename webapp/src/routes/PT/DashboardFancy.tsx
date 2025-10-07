
import '../ui/theme.css'
import { BottomNav, Card } from '../ui/components'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function DashboardPT(){
  const [kpi,setKpi]=useState({activos:0,nuevosSemana:0,pendientes:0, recientes:[] as any[]})
  useEffect(()=>{(async()=>{
    const { data: sAct } = await supabase.rpc('count_students_activos')
    const { data: rec } = await supabase.from('student').select('id,nombre,email,ultimo_acceso_at').order('created_at',{ascending:false}).limit(5)
    setKpi({ activos: sAct||0, nuevosSemana: 3, pendientes: 2, recientes: rec||[] })
  })()},[])

  return <div className="container">
    <div className="heading">Dashboard</div>
    <div className="kpi">
      <div className="box"><h3>Total Alumnos Activos</h3><div className="n">{kpi.activos}</div></div>
      <div className="box"><h3>Nuevos esta semana</h3><div className="n">{kpi.nuevosSemana}</div></div>
      <div className="box"><h3>Entrenamientos Pendientes</h3><div className="n">{kpi.pendientes}</div></div>
    </div>

    <div style={{height:12}}/>
    <Card>
      <div className="row" style={{justifyContent:'space-between'}}>
        <div style={{fontWeight:700}}>Alumnos Recientes</div>
        <a href={import.meta.env.BASE_URL+'pt/alumnos'}>Ver todos →</a>
      </div>
      <hr className="sep"/>
      <div className="list">
        {kpi.recientes.map(r=>(
          <div key={r.id} className="list-item">
            <div>
              <div style={{fontWeight:700}}>{r.nombre||'Sin nombre'}</div>
              <div style={{fontSize:12,opacity:.7}}>Últ. acceso: {r.ultimo_acceso_at ? new Date(r.ultimo_acceso_at).toLocaleDateString() : '—'}</div>
            </div>
            <a className="badge blue" href={import.meta.env.BASE_URL+'pt/alumnos/'+r.id}>Abrir</a>
          </div>
        ))}
      </div>
    </Card>

    <BottomNav active="dashboard"/>
  </div>
}
