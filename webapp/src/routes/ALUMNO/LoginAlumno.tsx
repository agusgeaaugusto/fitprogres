
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function LoginAlumno(){
  const [email,setEmail]=useState(''); const [pass,setPass]=useState(''); const [msg,setMsg]=useState('')
  const login = async()=>{
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
    if(error){ setMsg(error.message); return }
    window.location.href = import.meta.env.BASE_URL + 'alumno/entrenamiento'
  }
  return (<div style={{maxWidth:420, margin:'64px auto', padding:16, background:'#0F1724', borderRadius:12}}>
    <h2>Alumno – Ingreso</h2>
    <div>Email</div><input value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%'}}/>
    <div>Contraseña</div><input type="password" value={pass} onChange={e=>setPass(e.target.value)} style={{width:'100%',marginBottom:12}}/>
    <button onClick={login}>Entrar</button>
    {!!msg && <p style={{marginTop:10,color:'#ffd27a'}}>{msg}</p>}
  </div>)
}
