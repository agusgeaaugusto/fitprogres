export function Icon({name}:{name:'home'|'users'|'chart'|'gear'|'filter'|'plus'|'search'|'arrow'|'edit'|'trash'}){
  const m:Record<string,string>={
    home:'M3 12l9-9 9 9M5 10v10h14V10', users:'M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0v1H5v-1z',
    chart:'M4 19h4V8H4v11zm6 0h4V4h-4v15zm6 0h4V12h-4v7z',
    gear:'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a7.97 7.97 0 00.1-2l2-1.6-2-3.4-2.4.6a8.11 8.11 0 00-1.7-1L13 3h-4l-.4 2.6a8.11 8.11 0 00-1.7 1L4.5 6l-2 3.4L4.5 11a7.97 7.97 0 00.1 2l-2 1.6 2 3.4 2.4-.6a8.11 8.11 0 001.7 1L9 21h4l.4-2.6a8.11 8.11 0 001.7-1l2.4.6 2-3.4-2.1-1.6z',
    filter:'M3 5h18l-7 8v6l-4-2v-4L3 5z', plus:'M12 5v14M5 12h14', search:'M10 18a8 8 0 100-16 8 8 0 000 16zm11 3l-6-6',
    arrow:'M8 5l8 7-8 7', edit:'M4 13l7-7 6 6-7 7H4v-6z', trash:'M5 7h14M9 7v12m6-12v12'
  }
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={m[name]}/></svg>
}
export function Badge({children, color}:{children:React.ReactNode, color?:'blue'|'orange'|'green'|'red'}){
  return <span className={\`badge \${color||''}\`}>{children}</span>
}
export function Card({children}:{children:React.ReactNode}){ return <div className="card">{children}</div> }
export function BottomNav({active}:{active:'dashboard'|'alumnos'|'progreso'|'generador'}){
  const baseHash = '#/'
  const Btn = ({to,icon,label,act}:{to:string,icon:any,label:string,act:boolean}) =>
    <a className={\`bn-btn \${act?'active':''}\`} href={baseHash+to}><Icon name={icon}/><span>{label}</span></a>
  return <nav className="bottom-nav">
    <Btn to={'pt'} icon="home" label="Dashboard" act={active==='dashboard'} />
    <Btn to={'pt/alumnos'} icon="users" label="Alumnos" act={active==='alumnos'} />
    <Btn to={'pt/generador/'} icon="edit" label="Generador" act={active==='generador'} />
    <Btn to={'pt/progreso/overview'} icon="chart" label="Progreso" act={active==='progreso'} />
  </nav>
}
