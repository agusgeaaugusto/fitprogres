import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { Card, BottomNav } from '../../ui/components'

type Ex = { id:string, name:string, target:string }
export default function GeneratorFancy(){
  const { studentId } = useParams()
  const [exercises, setExercises] = useState<Ex[]>([])

  useEffect(()=>{
    (async()=>{
      const { data } = await supabase.from('exercise').select('id,name,target').limit(8)
      setExercises((data as any) ?? [])
    })()
  },[])

  return (
    <div className="container page">
      <h1>Generador de Entrenamiento</h1>
      <Card title="Rutina sugerida">
        <ul>
          {exercises.map(e=>(<li key={e.id}>{e.name} — {e.target}</li>))}
        </ul>
      </Card>
      <BottomNav />
    </div>
  )
}
