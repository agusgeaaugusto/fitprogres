import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { Card, Badge, BottomNav } from '../../ui/components'

export default function StudentProfileFancy(){
  const { id } = useParams()
  const [name, setName] = useState('')
  const [status, setStatus] = useState('activo')

  useEffect(()=>{
    (async()=>{
      if(!id) return
      const { data } = await supabase.from('student').select('display_name,status').eq('id', id).maybeSingle()
      if(data){ setName((data as any).display_name || ''); setStatus((data as any).status || 'activo') }
    })()
  },[id])

  return (
    <div className="container page">
      <h1>Perfil: {name}</h1>
      <Card title="Estado" right={<Badge><span className={`status ${status==='inactivo'?'bad':''}`}></span>{status}</Badge>}>
        <div className="row">
          <button className="btn" onClick={async()=>{
            const ns = status==='activo' ? 'inactivo' : 'activo'
            await supabase.from('student').update({ status: ns }).eq('id', id)
            setStatus(ns)
          }}>Alternar estado</button>
        </div>
      </Card>
      <BottomNav />
    </div>
  )
}
