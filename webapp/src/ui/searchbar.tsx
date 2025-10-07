
import { Icon } from './components'
export function SearchBar({value,onChange,onFilter}:{value:string,onChange:(v:string)=>void,onFilter:()=>void}){
  return <div className="search">
    <div style={{position:'relative', flex:1}}>
      <input placeholder="Buscar alumno por nombre" value={value} onChange={e=>onChange(e.target.value)} style={{width:'100%',paddingLeft:34}} />
      <div style={{position:'absolute',left:10,top:9,opacity:.7}}><Icon name="search"/></div>
    </div>
    <button className="ghost" onClick={onFilter}><Icon name="filter"/></button>
  </div>
}
