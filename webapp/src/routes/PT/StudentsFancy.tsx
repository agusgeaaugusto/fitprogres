import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { Card, Badge, BottomNav } from '../../ui/components'

type Row = { id:string, full_name:string|null, status:string|null, last_access: string|null }

export default function StudentsFancy(){
  const [rows, setRows] = useState<Row[]>([])

  useEffect(()=>{
    (async()=>{
      const { data } = await supabase
        .from('student')
        .select('id, full_name:display_name, status, last_access')
        .order('last_access', { ascending: false })
        .limit(20)
      setRows((data as any) ?? [])
    })()
  },[])

  return (
    <div className="container page">
      <h1>Gestión de Alumnos</h1>
      <div className="card" style={{marginTop:12}}>
        <input className="input" placeholder="Buscar alumno por nombre"/>
      </div>
      <div className="grid" style={{marginTop:12}}>
        {rows.map(r=>(
          <Card key={r.id} title={r.full_name || 'Sin nombre'} right={<Badge><span className={`status ${r.status==='inactivo'?'bad':''}`}></span>{r.status||'activo'}</Badge>}>
            <div className="row" style={{justifyContent:'flex-end'}}>
              <Link to={`/pt/alumnos/${r.id}/perfil`} className="btn">Abrir</Link>
            </div>
          </Card>
        ))}
      </div>
      <BottomNav />
    </div>
  )
}
