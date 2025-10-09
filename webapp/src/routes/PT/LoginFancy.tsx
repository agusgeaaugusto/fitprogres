import React from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function LoginFancy(){
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = String(data.get('email')||'').trim()
    const pass = String(data.get('password')||'').trim()
    if(!email || !pass) return alert('Complete email y contraseña')
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
    if(error) alert(error.message); else alert('Login ok')
  }
  return (
    <div className="container page">
      <h1>Iniciar Sesión</h1>
      <form className="card" onSubmit={onSubmit}>
        <input className="input" name="email" placeholder="Correo" />
        <div style={{height:8}}/>
        <input className="input" name="password" type="password" placeholder="Contraseña" />
        <div style={{height:12}}/>
        <button className="btn">Entrar</button>
      </form>
    </div>
  )
}
