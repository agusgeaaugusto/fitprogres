
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function MiEntrenamiento(){
  const [dias,setDias]=useState<any[]>([]); const [msg,setMsg]=useState('')
  useEffect(()=>{(async()=>{
    const uid = (await supabase.auth.getUser()).data.user?.id
    if(!uid){ window.location.href = import.meta.env.BASE_URL + 'alumno/login'; return }
    // buscamos el último programa publicado del alumno (asumiendo 1:1 auth.user = student.id si luego agregas ese flujo)
    const { data: prog } = await supabase.from('program')
      .select('id').eq('estado','publicado').order('publicado_at', {ascending:false}).limit(1).maybeSingle()
    if(!prog){ setMsg('No tienes un programa publicado aún.'); return }
    const { data: d } = await supabase.from('program_day')
      .select('id,dia_index, program_exercise(id,exercise_id,series,reps,descanso_seg, exercise:exercise_id(nombre))')
      .eq('program_id', prog.id).order('dia_index')
    setDias(d||[])
  })()},[])

  const registrar = async (peId: string)=>{
    const peso = Number(prompt('Peso usado (kg)?')||'0')
    const reps = Number(prompt('Reps logradas?')||'0')
    const uid = (await supabase.auth.getUser()).data.user?.id
    if(!uid) return
    await supabase.from('workout_log').insert({ student_id: uid, program_exercise_id: peId, peso, reps_hechas: reps })
    alert('Guardado')
  }

  return (<div style={{padding:24}}>
    <h2>Mi entrenamiento</h2>
    {!!msg && <p>{msg}</p>}
    {dias.map(d => <div key={d.id} style={{padding:8, border:'1px solid #234', borderRadius:8, margin:'8px 0'}}>
      <div><b>Día {d.dia_index}</b></div>
      <ul style={{marginLeft:18}}>
        {d.program_exercise?.map((e:any)=>
          <li key={e.id}>{e.exercise?.nombre || ('Ex #' + e.exercise_id)} – {e.series}×{e.reps}
            <button style={{marginLeft:8}} onClick={()=>registrar(e.id)}>Registrar</button>
          </li>
        )}
      </ul>
    </div>)}
  </div>)
}
