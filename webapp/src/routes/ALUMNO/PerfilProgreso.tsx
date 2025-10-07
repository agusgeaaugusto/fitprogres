
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function PerfilProgreso(){
  const [rows,setRows]=useState<any[]>([])
  const [peso,setPeso]=useState('')

  useEffect(()=>{(async()=>{
    const uid = (await supabase.auth.getUser()).data.user?.id
    if(!uid){ window.location.href = import.meta.env.BASE_URL + 'alumno/login'; return }
    const { data } = await supabase.from('progress_metric').select('*').eq('student_id', uid).order('fecha')
    setRows(data||[])
  })()},[])

  const agregar = async()=>{
    const uid = (await supabase.auth.getUser()).data.user?.id
    await supabase.from('progress_metric').insert({ student_id: uid, peso_kg: Number(peso) })
    const { data } = await supabase.from('progress_metric').select('*').eq('student_id', uid).order('fecha')
    setRows(data||[]); setPeso('')
  }

  return (<div style={{padding:24}}>
    <h2>Mi progreso</h2>
    <div style={{display:'flex', gap:8, margin:'8px 0'}}>
      <input placeholder="Peso (kg)" value={peso} onChange={e=>setPeso(e.target.value)} />
      <button onClick={agregar}>Agregar</button>
    </div>
    <table><thead><tr><th>Fecha</th><th>Peso</th></tr></thead><tbody>
      {rows.map(r=> <tr key={r.id}><td>{r.fecha}</td><td>{r.peso_kg||'-'}</td></tr>)}
    </tbody></table>
  </div>)
}
