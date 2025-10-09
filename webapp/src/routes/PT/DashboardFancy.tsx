import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Card, Badge, BottomNav } from '../../ui/components'
import { Link } from 'react-router-dom'

export default function DashboardFancy(){
  const [activos, setActivos] = useState<number>(0)
  const [nuevos, setNuevos] = useState<number>(0)

  useEffect(()=>{
    (async ()=>{
      try{
        const { data:countActivos } = await supabase.rpc('count_students_activos')
        setActivos(countActivos ?? 0)
      }catch{ setActivos(0) }
      try{
        const { data } = await supabase.from('student').select('id,created_at').gte('created_at', new Date(Date.now()-7*864e5).toISOString())
        setNuevos(data?.length ?? 0)
      }catch{ setNuevos(0) }
    })()
  },[])

  return (
    <div className="container page">
      <h1>Dashboard</h1>
      <div className="grid" style={{marginTop:12}}>
        <Card title="Total Alumnos Activos">
          <div style={{fontSize:48, fontWeight:800}}>{activos}</div>
        </Card>
        <Card title="Nuevos esta semana">
          <div style={{fontSize:48, fontWeight:800, color:'var(--orange)'}}>+{nuevos}</div>
        </Card>
      </div>
      <div style={{marginTop:16}} className="card">
        <div className="row" style={{justifyContent:'space-between', alignItems:'center'}}>
          <h3>Alumnos Recientes</h3>
          <Link to="/pt/alumnos" className="btn">Ver todos</Link>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
