import React, { useState } from 'react'
import '../ui/theme.css'
import { supabase } from '../lib/supabaseClient'

export default function LoginFancy(){
  const [email,setEmail]=useState(''); const [pass,setPass]=useState(''); const [msg,setMsg]=useState('')
  const go = async()=>{
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
    if(error){ setMsg(error.message); return }
    window.location.hash = '#/pt'
  }
  return <div className="container" style={{maxWidth:460}}>
    <div className="heading">Iniciar Sesión</div>
    <div className="grid">
      <div>Correo</div><input value={email} onChange={e=>setEmail(e.target.value)} />
      <div>Contraseña</div><input type="password" value={pass} onChange={e=>setPass(e.target.value)} />
      <button onClick={go} style={{marginTop:8}}>Iniciar Sesión</button>
      {msg ? <div className="badge" style={{marginTop:8, background:'rgba(255,91,99,.15)', borderColor:'#ff5b63', color:'#ffb7bb'}}>{msg}</div> : null}
    </div>
  </div>
}
