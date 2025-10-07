import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import FormRow from '../../components/FormRow'
import { useParams } from 'react-router-dom'
export default function StudentFormPT(){
  const { id } = useParams()
  const [f,setF]=useState<any>({ nombre:'', email:'', objetivo:'hipertrofia', nivel:1, frecuencia:3 })
  const [msg,setMsg]=useState('')
  useEffect(()=>{(async()=>{
    if(!id) return
    const { data } = await supabase.from('student').select('*').eq('id', id).maybeSingle()
    setF((v:any)=>({ ...v, ...data }))
    const { data: prof } = await supabase.from('student_profile').select('*').eq('student_id', id).maybeSingle()
    if(prof) setF((v:any)=>({ ...v, ...prof }))
  })()},[id])
  const save = async()=>{
    const uid = (await supabase.auth.getUser()).data.user?.id
    if(!id){
      const { data: created } = await supabase.from('student').insert({ trainer_id: uid, nombre: f.nombre, email: f.email }).select('*').single()
      await supabase.from('student_profile').upsert({ student_id: created.id, objetivo: f.objetivo, nivel: f.nivel, frecuencia: f.frecuencia })
      setMsg('Alumno creado.')
    } else {
      await supabase.from('student').update({ nombre: f.nombre, email: f.email }).eq('id', id)
      await supabase.from('student_profile').upsert({ student_id: id, objetivo: f.objetivo, nivel: f.nivel, frecuencia: f.frecuencia })
      setMsg('Guardado.')
    }
  }
  return (<div className="max-w-xl mx-auto p-6 card rounded-xl2">
    <h2 className="text-xl font-bold mb-4">Perfil Alumno</h2>
    <FormRow label="Nombre"><input className="input" value={f.nombre} onChange={e=>setF({...f,nombre:e.target.value})}/></FormRow>
    <FormRow label="Email"><input className="input" value={f.email} onChange={e=>setF({...f,email:e.target.value})}/></FormRow>
    <div className="grid grid-cols-3 gap-3">
      <FormRow label="Objetivo"><select className="input" value={f.objetivo} onChange={e=>setF({...f,objetivo:e.target.value})}><option value="hipertrofia">Hipertrofia</option><option value="perdida">Pérdida de peso</option><option value="resistencia">Resistencia</option></select></FormRow>
      <FormRow label="Nivel"><select className="input" value={f.nivel} onChange={e=>setF({...f,nivel:Number(e.target.value)})}><option value={1}>Principiante</option><option value={2}>Intermedio</option><option value={3}>Avanzado</option></select></FormRow>
      <FormRow label="Frecuencia (días/sem)"><input className="input" type="number" min={2} max={6} value={f.frecuencia} onChange={e=>setF({...f,frecuencia:Number(e.target.value)})}/></FormRow>
    </div>
    <button className="btn btn-accent mt-2" onClick={save}>Guardar</button>
    {!!msg && <p className="mt-3 text-emerald-300 text-sm">{msg}</p>}
  </div>)
}
