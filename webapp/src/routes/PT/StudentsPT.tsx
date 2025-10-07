
import { useEffect, useState } from 'react'
import { RequirePT } from '../../lib/auth'
import { supabase } from '../../lib/supabaseClient'
import { Link } from 'react-router-dom'

export default function StudentsPT(){
  const [list,setList]=useState<any[]>([]); const [q,setQ]=useState('')
  useEffect(()=>{(async()=>{
    const uid = (await supabase.auth.getUser()).data.user?.id
    const { data } = await supabase.from('student').select('*').eq('trainer_id', uid).order('created_at', {ascending:false})
    setList(data||[])
  })()},[])
  const filtered = list.filter(s => (s.nombre||'').toLowerCase().includes(q.toLowerCase()))
  return <RequirePT><div style={{padding:24}}>
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <h2>Alumnos</h2>
      <Link to={import.meta.env.BASE_URL + 'pt/alumnos/nuevo'}>Nuevo</Link>
    </div>
    <input placeholder="Buscar..." value={q} onChange={e=>setQ(e.target.value)} style={{margin:'12px 0', width:'100%'}}/>
    <div>
      {filtered.map(s => <div key={s.id} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid #233'}}>
        <div><div>{s.nombre}</div><div style={{opacity:.7, fontSize:12}}>{s.email}</div></div>
        <div style={{display:'flex', gap:8}}>
          <Link to={import.meta.env.BASE_URL + 'pt/alumnos/' + s.id}>Editar</Link>
          <Link to={import.meta.env.BASE_URL + 'pt/generador/' + s.id}>Generar</Link>
        </div>
      </div>)}
    </div>
  </div></RequirePT>
}
