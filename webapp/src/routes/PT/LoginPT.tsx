import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
export default function LoginPT(){
  const [email,setEmail]=useState(''); const [pass,setPass]=useState(''); const [lic,setLic]=useState(''); const [msg,setMsg]=useState('')
  const login = async()=>{
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass })
    if(error){ setMsg(error.message); return }
    const uid = data.user?.id
    const { data: trainer, error: err } = await supabase.from('trainer').select('licencia_estado').eq('id', uid).maybeSingle()
    if(err){ setMsg(err.message); return }
    if(trainer?.licencia_estado !== 'activo') setMsg('Licencia inactiva. Completa el pago o ingresa el código.')
    else window.location.href='/fitprogres/pt'
  }
  const activarCodigo = async()=>{
    const user = (await supabase.auth.getUser()).data.user
    if(!user){ setMsg('Inicia sesión primero'); return }
    await supabase.from('license').insert({ trainer_id: user.id, codigo: lic, estado: 'activo', origen_pago: 'manual' })
    await supabase.from('trainer').update({ licencia_estado:'activo', licencia_codigo: lic, licencia_pagada_en: new Date().toISOString() }).eq('id', user.id)
    setMsg('Licencia activada. ¡Listo!')
  }
  return (<div className="max-w-md mx-auto p-6 card rounded-xl2 mt-16">
    <h2 className="text-2xl mb-4 font-bold">Entrenador – Ingreso</h2>
    <div className="label">Email</div><input className="input mb-3" value={email} onChange={e=>setEmail(e.target.value)} />
    <div className="label">Contraseña</div><input className="input mb-4" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
    <button className="btn btn-primary w-full" onClick={login}>Entrar</button>
    <div className="h-[1px] bg-slate-700 my-6" />
    <div className="label">Código de licencia</div>
    <div className="flex gap-2"><input className="input" value={lic} onChange={e=>setLic(e.target.value)} placeholder="XXXX-XXXX" /><button className="btn btn-accent" onClick={activarCodigo}>Activar</button></div>
    {!!msg && <p className="mt-4 text-sm text-amber-300">{msg}</p>}
  </div>)
}
