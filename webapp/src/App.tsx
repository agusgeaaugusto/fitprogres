import { Link } from 'react-router-dom'
export default function App(){
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold"><span className="text-brand-blue">Fit</span><span className="text-brand-orange">Progres</span></h1>
          <nav className="flex gap-3">
            <Link className="btn btn-primary" to="/pt/login">Entrenador</Link>
            <Link className="btn btn-accent" to="/alumno/login">Alumno</Link>
          </nav>
        </header>
        <section className="grid md:grid-cols-2 gap-6">
          <div className="card p-6 rounded-xl2 shadow-soft">
            <h2 className="text-xl mb-2">Licencia Vitalicia</h2>
            <p className="text-sm opacity-80">Compra única para PT. Alumnos ilimitados, acceso incluido.</p>
          </div>
          <div className="card p-6 rounded-xl2 shadow-soft">
            <h2 className="text-xl mb-2">Generador Automático</h2>
            <p className="text-sm opacity-80">Rutinas según objetivo, nivel, restricciones y frecuencia.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
