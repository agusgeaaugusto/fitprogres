
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function LoginPT(){
  const [email,setEmail]=useState(''); const [pass,setPass]=useState(''); const [msg,setMsg]=useState('')

  const login = async()=>{
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
    if(error){ setMsg(error.message); return }
    // verificar licencia
    const uid = (await supabase.auth.getUser()).data.user?.id
    const { data: tr } = await supabase.from('trainer').select('licencia_estado').eq('id', uid).maybeSingle()
    if(tr?.licencia_estado !== 'activo'){
      window.location.href = import.meta.env.BASE_URL + 'pt/licencia'
    } else {
      window.location.href = import.meta.env.BASE_URL + 'pt'
    }
  }

  return (<div style={{maxWidth:420, margin:'64px auto', padding:16, background:'#0F1724', borderRadius:12}}>
    <h2 style={{marginBottom:12}}>Entrenador – Ingreso</h2>
    <div>Email</div><input value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',marginBottom:8}}/>
    <div>Contraseña</div><input type="password" value={pass} onChange={e=>setPass(e.target.value)} style={{width:'100%',marginBottom:12}}/>
    <button onClick={login}>Entrar</button>
    {!!msg && <p style={{marginTop:10,color:'#ffd27a'}}>{msg}</p>}
  </div>)
}
