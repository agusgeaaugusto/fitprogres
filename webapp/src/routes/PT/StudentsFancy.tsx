
import '../ui/theme.css'
import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { BottomNav, Badge } from '../ui/components'
import { SearchBar } from '../ui/searchbar'
import { FilterSheet, Filtros } from '../ui/filtersheet'

export default function GestionAlumnos(){
  const [q,setQ]=useState(''); const [showFilters,setShowFilters]=useState(false)
  const [data,setData]=useState<any[]>([])
  const [filters,setFilters]=useState<Filtros>({})

  useEffect(()=>{(async()=>{
    const { data } = await supabase.from('student').select('id,nombre,email,estado,ultimo_acceso_at')
    setData(data||[])
  })()},[])

  const list = useMemo(()=>{
    return (data||[]).filter(a=> (a.nombre||'').toLowerCase().includes(q.toLowerCase()))
      .filter(a=> !filters.estado || a.estado===filters.estado)
  },[data,q,filters])

  return <div className="container">
    <div className="heading">Gestión de Alumnos</div>
    <div className="toolbar">
      <SearchBar value={q} onChange={setQ} onFilter={()=>setShowFilters(v=>!v)}/>
      <a className="badge orange" href={import.meta.env.BASE_URL+'pt/alumnos/nuevo'}>Crear Nuevo</a>
    </div>
    {showFilters && <FilterSheet init={filters} onApply={(f)=>{setFilters(f); setShowFilters(false)}}/>}

    <div className="section-title">Estado Activa</div>
    <div className="list">
      {list.map(x=> (
        <div key={x.id} className="list-item">
          <div>
            <div style={{fontWeight:700}}>{x.nombre||'—'}</div>
            <div style={{fontSize:12,opacity:.7}}>Últ. acceso: {x.ultimo_acceso_at? new Date(x.ultimo_acceso_at).toLocaleDateString() : '—'}</div>
          </div>
          <div className="row">
            <Badge color={x.estado==='activo'?'blue':'orange'}>{x.estado?.toUpperCase()||'—'}</Badge>
            <a className="badge" href={import.meta.env.BASE_URL+'pt/alumnos/'+x.id}>Editar</a>
            <a className="badge" href={import.meta.env.BASE_URL+'pt/generador/'+x.id}>Rutina</a>
          </div>
        </div>
      ))}
    </div>

    <BottomNav active="alumnos"/>
  </div>
}
