
import '../ui/theme.css'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function LoginScreen(){
  const [email,setEmail]=useState(''); const [pass,setPass]=useState('')
  const [msg,setMsg]=useState('')
  const go = async()=>{
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
    if(error){ setMsg(error.message); return }
    window.location.href = import.meta.env.BASE_URL + 'pt'
  }
  return <div className="container" style={{maxWidth:460}}>
    <div className="heading">Iniciar Sesión</div>
    <div className="grid">
      <div>Correo Electrónico</div>
      <input value={email} onChange={e=>setEmail(e.target.value)} />
      <div>Contraseña</div>
      <input type="password" value={pass} onChange={e=>setPass(e.target.value)} />
      <button onClick={go} style={{marginTop:8}}>Iniciar Sesión</button>
      {!!msg && <div className="badge red" style={{marginTop:8}}>{msg}</div>}
    </div>
    <hr className="sep"/>
    <a className="badge orange" href={import.meta.env.BASE_URL+'pt/registro'}>¿No tenés cuenta? Crear</a>
  </div>
}
