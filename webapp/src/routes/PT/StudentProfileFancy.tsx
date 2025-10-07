
import '../ui/theme.css'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useParams } from 'react-router-dom'

export default function PerfilAlumnoFancy(){
  const { id } = useParams()
  const [f,setF]=useState<any>({})
  const [msg,setMsg]=useState('')

  useEffect(()=>{(async()=>{
    const { data: s } = await supabase.from('student').select('*').eq('id', id).maybeSingle()
    const { data: p } = await supabase.from('student_profile').select('*').eq('student_id', id).maybeSingle()
    setF({ ...s, ...p })
  })()},[id])

  const save = async()=>{
    await supabase.from('student').update({ nombre: f.nombre, email: f.email, estado: f.estado||'activo' }).eq('id', id)
    await supabase.from('student_profile').upsert({ student_id: id, objetivo:f.objetivo, nivel:f.nivel, frecuencia:f.frecuencia, restricciones:f.restricciones })
    setMsg('Guardado ✓')
  }

  return <div className="container" style={{maxWidth:720}}>
    <div className="heading">Ver Perfil</div>
    <div className="card">
      <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:12}}>
        <div>Correo Electrónico</div><input value={f.email||''} onChange={e=>setF({...f,email:e.target.value})}/>
        <div>Objetivo</div>
        <select value={f.objetivo||'hipertrofia'} onChange={e=>setF({...f,objetivo:e.target.value})}>
          <option value="hipertrofia">Aumento Muscular</option><option value="resistencia">Resistencia</option><option value="pérdida">Pérdida de Peso</option>
        </select>
        <div>Nivel</div>
        <select value={String(f.nivel||1)} onChange={e=>setF({...f,nivel:Number(e.target.value)})}>
          <option value="1">Principiante</option><option value="2">Intermedio</option><option value="3">Avanzado</option>
        </select>
        <div>Restricciones</div><input value={f.restricciones||''} onChange={e=>setF({...f,restricciones:e.target.value})}/>
        <div>Frecuencia</div><input type="number" value={f.frecuencia||3} onChange={e=>setF({...f,frecuencia:Number(e.target.value)})}/>
      </div>
      <div className="row" style={{marginTop:12, justifyContent:'flex-end'}}>
        <button onClick={save}>Guardar Cambios</button>
      </div>
      {!!msg && <div className="badge green" style={{marginTop:8}}>{msg}</div>}
    </div>
  </div>
}
