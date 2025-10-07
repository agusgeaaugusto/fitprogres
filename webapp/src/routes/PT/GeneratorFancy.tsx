import '../ui/theme.css'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useParams } from 'react-router-dom'
import { BottomNav, Badge } from '../ui/components'

type Plan = { dia:number, ejercicios:{ id:number, nombre:string, series:number, reps:number }[] }

export default function GeneradorFancy(){
  const { studentId } = useParams()
  const [plan,setPlan]=useState<Plan[]>([]); const [msg,setMsg]=useState('')
  const generar = async()=>{
    const { data: ex } = await supabase.from('exercise').select('id,nombre').limit(60)
    const base = (ex||[]); const tmp:Plan[]=[]
    for(let d=1; d<=4; d++){ const slice = base.slice((d-1)*5,(d-1)*5+5); tmp.push({ dia:d, ejercicios: slice.map(e=>({ id:e.id, nombre:e.nombre, series:4, reps:10 })) }) }
    setPlan(tmp); setMsg('Rutina generada.')
  }
  const publicar = async()=>{
    const { data: p } = await supabase.from('program').insert({ student_id: studentId, nombre:'Auto', estado:'publicado', publicado_at:new Date().toISOString() }).select('id').single()
    for(const d of plan){ const { data: day } = await supabase.from('program_day').insert({ program_id:p.id, dia_index:d.dia }).select('id').single()
      for(const e of d.ejercicios){ await supabase.from('program_exercise').insert({ program_day_id:day.id, exercise_id:e.id, series:e.series, reps:e.reps, descanso_seg:90 }) } }
    setMsg('Asignado y publicado ✓')
  }
  return <div className="container">
    <div className="heading">Generador de Entrenamiento</div>
    <div className="row" style={{justifyContent:'space-between'}}>
      <button onClick={generar}>Generar Rutina Auto</button>
      <button className="secondary" onClick={publicar} disabled={!plan.length}>Guardar y Asignar</button>
    </div>
    {!!msg && <div className="badge green" style={{marginTop:8}}>{msg}</div>}
    <div style={{height:8}}/>
    {plan.map(d=>(
      <div key={d.dia} className="card">
        <div className="row" style={{justifyContent:'space-between'}}>
          <div><Badge color="blue">Día {d.dia}: FULL BODY</Badge></div>
          <a className="badge">Editar</a>
        </div>
        <ul>{d.ejercicios.map((e,i)=><li key={i} style={{padding:'6px 0'}}>{e.nombre} <span className="badge">{e.series}x{e.reps}</span></li>)}</ul>
      </div>
    ))}
    <BottomNav active="generador"/>
  </div>
}
