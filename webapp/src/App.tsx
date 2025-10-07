import { Link } from 'react-router-dom'

export default function App(){
  return (
    <div style={{padding: 24, fontFamily: 'system-ui, sans-serif'}}>
      <h1><span style={{color:'#0B63B6'}}>Fit</span><span style={{color:'#FF7A00'}}>Progres</span></h1>
      <p>Deploy mínimo funcionando.</p>
      <nav style={{display:'flex', gap:12, marginTop:16}}>
        <Link to="/pt/login">Entrenador</Link>
        <Link to="/alumno/login">Alumno</Link>
      </nav>
    </div>
  )
}
