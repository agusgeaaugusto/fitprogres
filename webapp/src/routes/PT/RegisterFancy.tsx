
import '../ui/theme.css'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function RegisterScreen(){
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [pass,setPass]=useState('')
  const [msg,setMsg]=useState('')
  const go = async()=>{
    const { data, error } = await supabase.auth.signUp({ email, password: pass, options: { data: { full_name: name } } })
    if(error){ setMsg(error.message); return }
    // crea el trainer (trigger o upsert por si acaso)
    const uid = data.user?.id
    if(uid){ await supabase.from('trainer').upsert({ id: uid, nombre: name, licencia_estado:'pendiente' }) }
    window.location.href = import.meta.env.BASE_URL + 'pt/licencia'
  }
  return <div className="container" style={{maxWidth:480}}>
    <div className="heading">Bienvenido, Personal Trainer</div>
    <div className="grid">
      <div>Nombre Completo</div>
      <input value={name} onChange={e=>setName(e.target.value)} />
      <div>Correo Electrónico</div>
      <input value={email} onChange={e=>setEmail(e.target.value)} />
      <div>Confirmar Contraseña</div>
      <input type="password" value={pass} onChange={e=>setPass(e.target.value)} />
      <button className="secondary" onClick={go} style={{marginTop:8}}>Crear Cuenta</button>
    </div>
  </div>
}
