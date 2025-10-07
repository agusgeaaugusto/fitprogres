import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useParams } from 'react-router-dom'
type Ex = { id:number; nombre:string; musculo:string; tipo:string; dificultad:number; tags:string[] }
export default function GeneratorPT(){
  const { studentId } = useParams()
  const [perfil,setPerfil]=useState<any>(); const [ejercicios,setEjercicios]=useState<Ex[]>([]); const [plan,setPlan]=useState<any[]>([]); const [msg,setMsg]=useState('')
  useEffect(()=>{(async()=>{
    const { data: prof } = await supabase.from('student_profile').select('*').eq('student_id', studentId).maybeSingle()
    setPerfil(prof)
    const { data: exs } = await supabase.from('exercise').select('*')
    setEjercicios(exs||[])
  })()},[studentId])
  const generar = ()=>{
    if(!perfil) return
    const dias = Math.max(3, Math.min(6, perfil.frecuencia||3))
    const grupos = ['pecho','espalda','pierna','hombro','core']
    const planGen:any[] = []
    for(let d=0; d<dias; d++){
      const g = grupos[d % grupos.length]
      const cand = ejercicios.filter(e=> e.musculo===g && e.dificultad <= (perfil.nivel||1))
      const picks = cand.slice(0,3)
      planGen.push({ dia:d+1, ejercicios: picks.map(p=>({ id:p.id, series: perfil.objetivo==='resistencia'?3:4, reps: perfil.objetivo==='resistencia'?18:10, descanso_seg: perfil.objetivo==='resistencia'?45:90 })) })
    }
    setPlan(planGen)
  }
  const publicar = async()=>{
    const { data: prog } = await supabase.from('program').insert({ student_id: studentId, nombre: 'Plan Auto', estado:'publicado', publicado_at: new Date().toISOString() }).select('*').single()
    for(const d of plan){
      const { data: day } = await supabase.from('program_day').insert({ program_id: prog.id, dia_index: d.dia }).select('*').single()
      for(const ex of d.ejercicios){
        await supabase.from('program_exercise').insert({ program_day_id: day.id, exercise_id: ex.id, series: ex.series, reps: ex.reps, descanso_seg: ex.descanso_seg })
      }
    }
    setMsg('Asignado y publicado ✅')
  }
  return (<div className="p-6 max-w-4xl mx-auto">
    <h2 className="text-xl font-bold mb-4">Generador Automático</h2>
    <button className="btn btn-primary" onClick={generar}>Generar</button>
    <button className="btn btn-accent ml-2" onClick={publicar} disabled={!plan.length}>Asignar y Publicar</button>
    {!!msg && <p className="mt-3 text-emerald-300 text-sm">{msg}</p>}
    <div className="mt-6 grid gap-3">
      {plan.map(d=> (<div key={d.dia} className="card p-3 rounded-xl2"><div className="font-semibold">Día {d.dia}</div><ul className="text-sm opacity-90 list-disc ml-5 mt-2">{d.ejercicios.map((e:any,i:number)=> <li key={i}>Ex #{e.id} – {e.series}×{e.reps} (desc {e.descanso_seg}s)</li>)}</ul></div>))}
    </div>
  </div>)
}
