
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useParams } from 'react-router-dom'
import { RequirePT } from '../../lib/auth'

export default function StudentFormPT(){
  const { id } = useParams()
  const [f,setF]=useState<any>({ nombre:'', email:'', objetivo:'hipertrofia', nivel:1, frecuencia:3 })
  const [msg,setMsg]=useState('')

  useEffect(()=>{(async()=>{
    if(!id) return
    const { data } = await supabase.from('student').select('*').eq('id', id).maybeSingle()
    if(data) setF((v:any)=>({ ...v, ...data }))
    const { data: prof } = await supabase.from('student_profile').select('*').eq('student_id', id).maybeSingle()
    if(prof) setF((v:any)=>({ ...v, ...prof }))
  })()},[id])

  const save = async()=>{
    const uid = (await supabase.auth.getUser()).data.user?.id
    if(!id){
      const { data: created } = await supabase.from('student').insert({ trainer_id: uid, nombre: f.nombre, email: f.email }).select('*').single()
      await supabase.from('student_profile').upsert({ student_id: created.id, objetivo: f.objetivo, nivel: f.nivel, frecuencia: f.frecuencia })
      setMsg('Alumno creado.')
    }else{
      await supabase.from('student').update({ nombre: f.nombre, email: f.email }).eq('id', id)
      await supabase.from('student_profile').upsert({ student_id: id, objetivo: f.objetivo, nivel: f.nivel, frecuencia: f.frecuencia })
      setMsg('Guardado.')
    }
  }

  return <RequirePT><div style={{padding:24, maxWidth:600, margin:'0 auto'}}>
    <h2>Alumno</h2>
    <label>Nombre<input style={{width:'100%'}} value={f.nombre} onChange={e=>setF({...f,nombre:e.target.value})}/></label>
    <label>Email<input style={{width:'100%'}} value={f.email} onChange={e=>setF({...f,email:e.target.value})}/></label>
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
      <label>Objetivo<select style={{width:'100%'}} value={f.objetivo} onChange={e=>setF({...f,objetivo:e.target.value})}>
        <option value="hipertrofia">Hipertrofia</option><option value="resistencia">Resistencia</option><option value="fuerza">Fuerza</option>
      </select></label>
      <label>Nivel<select style={{width:'100%'}} value={f.nivel} onChange={e=>setF({...f,nivel:Number(e.target.value)})}>
        <option value={1}>Principiante</option><option value={2}>Intermedio</option><option value={3}>Avanzado</option>
      </select></label>
      <label>Frecuencia<input type="number" min={2} max={6} style={{width:'100%'}} value={f.frecuencia} onChange={e=>setF({...f,frecuencia:Number(e.target.value)})}/></label>
    </div>
    <button onClick={save} style={{marginTop:12}}>Guardar</button>
    {!!msg && <p style={{color:'#7cfaa2'}}>{msg}</p>}
  </div></RequirePT>
}
