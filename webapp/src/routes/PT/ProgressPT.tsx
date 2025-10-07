
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useParams } from 'react-router-dom'
import { RequirePT } from '../../lib/auth'

export default function ProgressPT(){
  const { studentId } = useParams()
  const [rows,setRows]=useState<any[]>([])
  useEffect(()=>{(async()=>{
    const { data } = await supabase.from('progress_metric').select('*').eq('student_id', studentId).order('fecha')
    setRows(data||[])
  })()},[studentId])
  return <RequirePT><div style={{padding:24}}>
    <h2>Progreso (Peso)</h2>
    <table><thead><tr><th>Fecha</th><th>Peso</th></tr></thead><tbody>
      {rows.map(r=> <tr key={r.id}><td>{r.fecha}</td><td>{r.peso_kg||'-'}</td></tr>)}
    </tbody></table>
  </div></RequirePT>
}
