import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Link } from 'react-router-dom'
export default function StudentsPT(){
  const [q,setQ]=useState(''); const [rows,setRows]=useState<any[]>([])
  useEffect(()=>{(async()=>{
    const uid = (await supabase.auth.getUser()).data.user?.id
    const { data } = await supabase.from('student').select('*').eq('trainer_id', uid)
    setRows(data||[])
  })()},[])
  const filtered = rows.filter(r => (r.nombre||'').toLowerCase().includes(q.toLowerCase()))
  return (<div className="p-6 max-w-5xl mx-auto">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold">Alumnos</h2>
      <Link to="/fitprogres/pt/alumno" className="btn btn-accent">Nuevo Alumno</Link>
    </div>
    <input className="input mb-4" placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} />
    <div className="grid gap-2">
      {filtered.map(s=> (<div key={s.id} className="card p-3 rounded-xl2 flex items-center justify-between">
        <div><div className="font-medium">{s.nombre}</div><div className="text-xs opacity-70">{s.email}</div></div>
        <div className="flex gap-2">
          <Link className="btn btn-primary" to={`/fitprogres/pt/alumno/${s.id}`}>Editar</Link>
          <Link className="btn btn-accent" to={`/fitprogres/pt/generador/${s.id}`}>Generar Rutina</Link>
        </div>
      </div>))}
    </div>
  </div>)
}
