
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function LicenciaPT(){
  const [codigo,setCodigo]=useState('')
  const [estado,setEstado]=useState<'pendiente'|'activo'|'desconocido'>('desconocido')
  const [msg,setMsg]=useState('')

  useEffect(()=>{(async()=>{
    const uid = (await supabase.auth.getUser()).data.user?.id
    if(!uid){ window.location.href = import.meta.env.BASE_URL + 'pt/login'; return }
    const { data } = await supabase.from('trainer').select('licencia_estado').eq('id', uid).maybeSingle()
    setEstado((data?.licencia_estado as any)||'pendiente')
  })()},[])

  const activar = async()=>{
    const uid = (await supabase.auth.getUser()).data.user?.id
    if(!uid){ setMsg('Sin sesión'); return }
    await supabase.from('license').insert({ trainer_id: uid, codigo, estado:'activo', origen_pago:'manual'})
    await supabase.from('trainer').update({ licencia_estado:'activo', licencia_codigo:codigo, licencia_pagada_en:new Date().toISOString() }).eq('id', uid)
    setMsg('Licencia activada.'); setEstado('activo')
    setTimeout(()=> window.location.href = import.meta.env.BASE_URL + 'pt', 600)
  }

  return (<div style={{maxWidth:520, margin:'64px auto', padding:16, background:'#0F1724', borderRadius:12}}>
    <h2>Licencia</h2>
    <p>Estado actual: <b>{estado}</b></p>
    {estado!=='activo' && <div>
      <input value={codigo} onChange={e=>setCodigo(e.target.value)} placeholder="CODIGO-XXXX" style={{width:'100%',margin:'8px 0'}}/>
      <button onClick={activar}>Activar</button>
    </div>}
    {!!msg && <p style={{marginTop:10,color:'#7cfaa2'}}>{msg}</p>}
  </div>)
}
