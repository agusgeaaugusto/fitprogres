
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useParams } from 'react-router-dom'
import { RequirePT } from '../../lib/auth'

type Perfil = { objetivo:string; nivel:number; frecuencia:number }
type PlanDia = { dia:number; ejercicios: { id:number; series:number; reps:number; descanso_seg:number }[] }

export default function GeneratorPT(){
  const { studentId } = useParams()
  const [perfil,setPerfil] = useState<Perfil|null>(null)
  const [plan,setPlan] = useState<PlanDia[]>([])
  const [msg,setMsg]=useState('')

  useEffect(()=>{(async()=>{
    const { data: prof } = await supabase.from('student_profile').select('*').eq('student_id', studentId).maybeSingle()
    setPerfil(prof as any)
  })()},[studentId])

  const generar = async()=>{
    if(!perfil){ setMsg('Falta perfil'); return }
    const grupos = ['pecho','espalda','pierna','hombro','core']
    const dias = Math.max(3, Math.min(6, perfil.frecuencia||3))
    const res: PlanDia[] = []
    const { data: all } = await supabase.from('exercise').select('*')
    for(let i=0;i<dias;i++){
      const g = grupos[i % grupos.length]
      const cand = (all||[]).filter(e=>e.musculo===g && e.dificultad <= (perfil.nivel||1))
      const picks = cand.slice(0,3)
      res.push({ dia: i+1, ejercicios: picks.map(p => ({
        id: p.id, series: perfil.objetivo==='resistencia'?3:4,
        reps: perfil.objetivo==='resistencia'?18:10, descanso_seg: perfil.objetivo==='fuerza'?120:90
      })) })
    }
    setPlan(res); setMsg('Plan generado. Revisá y publica.')
  }

  const publicar = async()=>{
    const { data: prog } = await supabase.from('program').insert({ student_id: studentId, nombre:'Plan Auto', estado:'publicado', publicado_at: new Date().toISOString() }).select('id').single()
    for(const d of plan){
      const { data: day } = await supabase.from('program_day').insert({ program_id: prog.id, dia_index: d.dia }).select('id').single()
      for(const ex of d.ejercicios){
        await supabase.from('program_exercise').insert({ program_day_id: day.id, exercise_id: ex.id, series: ex.series, reps: ex.reps, descanso_seg: ex.descanso_seg })
      }
    }
    setMsg('Asignado y publicado ✅')
  }

  return <RequirePT><div style={{padding:24}}>
    <h2>Generador</h2>
    <button onClick={generar}>Generar</button>
    <button onClick={publicar} disabled={!plan.length} style={{marginLeft:8}}>Asignar y Publicar</button>
    {!!msg && <p style={{color:'#7cfaa2'}}>{msg}</p>}
    <div style={{marginTop:12}}>
      {plan.map(d => <div key={d.dia} style={{padding:8,border:'1px solid #234',borderRadius:8, marginBottom:8}}>
        <div><b>Día {d.dia}</b></div>
        <ul style={{marginLeft:18}}>
          {d.ejercicios.map((e,i)=><li key={i}>Ex #{e.id} – {e.series}×{e.reps} (desc {e.descanso_seg}s)</li>)}
        </ul>
      </div>)}
    </div>
  </div></RequirePT>
}
