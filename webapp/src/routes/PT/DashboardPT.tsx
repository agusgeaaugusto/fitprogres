import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Stat from '../../components/Stat'
export default function DashboardPT(){
  const [stats,setStats]=useState({ activos:0, nuevos:0, pendientes:0 })
  useEffect(()=>{(async()=>{
    const uid = (await supabase.auth.getUser()).data.user?.id
    const { data: alumnos } = await supabase.from('student').select('*').eq('trainer_id', uid)
    const activos = alumnos?.filter(a=>a.estado==='activo').length||0
    const nuevos = alumnos?.filter(a=>new Date(a.ultimo_acceso_at||0) > new Date(Date.now()-7*864e5)).length||0
    const pendientes = 0
    setStats({activos, nuevos, pendientes})
  })()},[])
  return (<div className="p-6 max-w-6xl mx-auto">
    <h2 className="text-2xl font-bold mb-6">Panel</h2>
    <div className="grid md:grid-cols-3 gap-4">
      <Stat label="Alumnos activos" value={stats.activos} />
      <Stat label="Nuevos (7d)" value={stats.nuevos} />
      <Stat label="Pendientes revisión" value={stats.pendientes} />
    </div>
  </div>)
}
